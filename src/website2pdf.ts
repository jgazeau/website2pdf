#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any*/
import {PromisePool} from '@supercharge/promise-pool';
import * as fs from 'fs-extra';
import {red} from 'kleur';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import 'reflect-metadata';
import {URL} from 'url';
import {ICliArguments} from './cli/iArgumentsParser';
import {Website2PdfCli} from './cli/website2pdfCli';
import {PdfTemplate} from './model/pdfTemplate';
import {Website} from './model/website';
import {WebsiteSitemap} from './model/websiteSitemap';
import {
  DEFAULT_MERGED_PDF,
  DEFAULT_OUTPUT_URL_TO_FILENAME_MAP,
} from './utils/const';
import {
  headerFactory,
  interpolate,
  puppeteerBrowserLaunchArgs,
  toFilePath,
  toFilename,
} from './utils/helpers';
import {logger} from './utils/logger';
import {PrintResults, STATUS_ERROR, STATUS_PRINTED} from './utils/stats';
import PDFMerger = require('pdf-merger-js');

export class Website2Pdf {
  private static _urlToFileNameMap: {[key: string]: string} = {};
  /* c8 ignore start */
  public static get urlToFileNameMap(): {[key: string]: string} {
    return Website2Pdf._urlToFileNameMap;
  }
  public static set urlToFileNameMap(value: {[key: string]: string}) {
    Website2Pdf._urlToFileNameMap = value;
  }
  /* c8 ignore stop */

  static async main(): Promise<void> {
    Website2Pdf.urlToFileNameMap = {};
    return new Website2PdfCli().parse().then(async cliArgs => {
      headerFactory();
      const website = new Website(cliArgs);
      await website
        .preActions()
        .then(() => {
          return website.build().then(async (website: Website) => {
            if (website.sitemaps.length !== 0) {
              await processSitemaps(cliArgs, website);
              await postActions(cliArgs);
            } else {
              logger().warn(
                `No sitemap found. Please check ${website.websiteURL.sitemapURL.toString()}`
              );
            }
          });
        })
        .finally(() => {
          return website.postActions();
        });
    });
  }

  public static addToUrlToFileNameMap(url: string, fileName: string): void {
    logger().debug(
      `Adding url ${url.toString()} to ${DEFAULT_OUTPUT_URL_TO_FILENAME_MAP}`
    );
    this._urlToFileNameMap[url] = fileName;
  }
}

Website2Pdf.main().catch((error: Error) => {
  logger().error(red(`${error.message}`));
  logger().debug(error);
});

async function processSitemaps(
  cliArgs: ICliArguments,
  website: Website
): Promise<void> {
  await puppeteer
    .launch(
      puppeteerBrowserLaunchArgs(
        cliArgs.chromiumFlags,
        cliArgs.chromiumHeadless
      )
    )
    .then(async browser => {
      await browser
        .version()
        .then(version => {
          logger().debug(`Starting browser instance: ${version}`);
        })
        .then(async () => {
          await browser
            .createIncognitoBrowserContext()
            .then(async browserContext => {
              logger().debug(
                `Creating incognito browser context: ${browserContext.isIncognito()}`
              );
              await PromisePool.for(website.sitemaps)
                .withConcurrency(1)
                .process(async (sitemap, index) => {
                  logger().debug(
                    `Processing pool for sitemap ${sitemap.rootUrl.href} (${index}/${website.sitemaps.length}))`
                  );
                  await processSitemap(
                    cliArgs,
                    website,
                    sitemap,
                    browserContext
                  );
                });
            });
        })
        .finally(async () => {
          PrintResults.printResults();
          await browser.close();
        });
    });
}

async function processSitemap(
  cliArgs: ICliArguments,
  website: Website,
  sitemap: WebsiteSitemap,
  browserContext: puppeteer.BrowserContext
) {
  if (sitemap.urls.length !== 0) {
    const outputDir = path.normalize(cliArgs.outputDir.toString());
    await sitemapToPDF(
      browserContext,
      cliArgs,
      outputDir,
      sitemap,
      website.pdfTemplate
    );
  } else {
    logger().warn(
      `No URLs found for sitemap ${sitemap.rootUrl.toString()}. Please check ${website.websiteURL.sitemapURL.toString()}`
    );
  }
}

async function sitemapToPDF(
  browserContext: puppeteer.BrowserContext,
  cliArgs: ICliArguments,
  outputDir: string,
  sitemap: WebsiteSitemap,
  pdfTemplate: PdfTemplate
): Promise<void> {
  await fs
    .ensureDir(outputDir)
    .then((result: any) => {
      result
        ? logger().debug(`Directory ${result} created`)
        : logger().debug(`Directory ${outputDir} already exists`);
    })
    .then(async () => {
      logger().info(`Printing ${sitemap.urls.length} PDF(s) to ${outputDir}`);

      await PromisePool.for(sitemap.urls)
        .withConcurrency(cliArgs.processPool)
        .process(async (url, index) => {
          logger().debug(
            `Processing pool for url ${url.href} (${index}/${sitemap.urls.length}))`
          );
          await pageToPDF(browserContext, cliArgs, outputDir, url, pdfTemplate);
        });
    });
}

async function pageToPDF(
  browserContext: puppeteer.BrowserContext,
  cliArgs: ICliArguments,
  outputDir: string,
  url: URL,
  pdfTemplate: PdfTemplate
): Promise<void> {
  await browserContext.newPage().then(async page => {
    page.setDefaultNavigationTimeout(0);
    const metadatas = new Map<string, string>();
    const fileDir = path.join(outputDir, toFilePath(url));
    let filename: string;
    let filePath: string;
    await fs
      .ensureDir(fileDir)
      .then((result: any) => {
        result
          ? logger().debug(`Directory ${result} created`)
          : logger().debug(`Directory ${outputDir} already exists`);
      })
      .then(async () => {
        await page
          .goto(url.toString(), {waitUntil: 'networkidle2'})
          .then(() => {
            page.title().then(title => {
              metadatas.set('title', title);
              filename = `${toFilename(
                metadatas.get('title')?.toString(),
                url,
                cliArgs
              )}.pdf`;
              filePath = path.join(fileDir, filename);
            });
          })
          .then(() => {
            return page
              .$$eval('meta', metas =>
                metas
                  .filter(meta => meta !== null)
                  .map(meta => {
                    const metaName = meta.getAttribute('name');
                    return metaName
                      ? [metaName, meta.getAttribute('content')]
                      : null;
                  })
              )
              .then(metas => {
                metas.forEach(meta => {
                  if (meta) metadatas.set(meta[0]!, meta[1]!);
                });
                return metadatas;
              });
          })
          .then(async metadatas => {
            logger().debug(`Printing page ${filePath} from url ${url}`);
            await page
              .pdf({
                timeout: 0,
                path: filePath,
                format: cliArgs.format,
                displayHeaderFooter: cliArgs.displayHeaderFooter,
                headerTemplate: interpolate(pdfTemplate.header, metadatas),
                footerTemplate: interpolate(pdfTemplate.footer, metadatas),
                margin: {
                  top: cliArgs.marginTop,
                  bottom: cliArgs.marginBottom,
                  left: cliArgs.marginLeft,
                  right: cliArgs.marginRight,
                },
                printBackground: true,
              })
              .then(() => {
                PrintResults.storeResult(url, filePath, STATUS_PRINTED);
              })
              .catch((error: Error) => {
                PrintResults.storeResult(url, filePath, STATUS_ERROR);
                throw error;
              });
          })
          .finally(async () => {
            Website2Pdf.addToUrlToFileNameMap(url.toString(), filePath);
            await page.close();
          });
      });
  });
}

async function postActions(cliArgs: ICliArguments) {
  if (cliArgs.outputFileNameUrlMap) {
    await saveUrlToFileNameMapFile(cliArgs);
  }
  if (cliArgs.mergeAll) {
    await mergeAllPdfToOne(cliArgs);
  }
}

async function saveUrlToFileNameMapFile(cliArgs: ICliArguments) {
  await fs.writeJson(
    path.join(
      path.normalize(cliArgs.outputDir.toString()),
      DEFAULT_OUTPUT_URL_TO_FILENAME_MAP
    ),
    Website2Pdf.urlToFileNameMap,
    {spaces: 2}
  );
}

async function mergeAllPdfToOne(cliArgs: ICliArguments) {
  const merger = new PDFMerger();
  for (const [, value] of Object.entries(Website2Pdf.urlToFileNameMap)) {
    logger().debug(`Merging ${path.resolve(value)} file`);
    console.log(`Merging ${path.resolve(value)} file`);
    await merger.add(path.resolve(value));
  }
  await merger.save(
    path.join(path.normalize(cliArgs.outputDir.toString()), DEFAULT_MERGED_PDF)
  );
}
