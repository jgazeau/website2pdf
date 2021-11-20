import 'reflect-metadata';
import * as path from 'path';
import * as fs from 'fs-extra';
import {URL} from 'url';
import {red} from 'kleur';
import {logger} from './utils/logger';
import {Website} from './model/website';
import {headerFactory} from './utils/helpers';
import {Website2PdfCli} from './cli/website2pdfCli';
const puppeteer = require('puppeteer');

export class Website2Pdf {
  static main(): Promise<void> {
    return new Website2PdfCli().parse().then(cliArgs => {
      headerFactory();
      const website = new Website();
      return website.build().then((website: Website) => {
        if (website.sitemaps.length !== 0) {
          return Promise.all(
            website.sitemaps.map(sitemap => {
              if (sitemap.urls.length !== 0) {
                const outputDir = path.normalize(
                  path.join(cliArgs.outputDir.toString(), sitemap.lang)
                );
                return fs
                  .ensureDir(outputDir)
                  .then((result: any) => {
                    result
                      ? logger().debug(`Directory ${result} created`)
                      : logger().debug(`Directory ${outputDir} already exists`);
                  })
                  .then(() => {
                    return Promise.all(
                      sitemap.urls.map(url => {
                        return printToPDF(url);
                      })
                    ).then(() => {
                      return Promise.resolve();
                    });
                  });
              } else {
                logger().warn(
                  `No URLs found for sitemap ${sitemap.lang}. Please check ${website.websiteURL}`
                );
                return Promise.resolve();
              }
            })
          ).then(() => {
            return Promise.resolve();
          });
        } else {
          logger().warn(
            `No sitemap found. Please check ${website.websiteURL.sitemapURL}`
          );
          return Promise.resolve();
        }
      });
    });
  }
}

Website2Pdf.main().catch((error: Error) => {
  logger().error(red(`${error.message}`));
  logger().debug(error);
});

function printToPDF(url: URL): Promise<void> {
  logger().info(`Checking url: ${url}`);
  return Promise.resolve();
}

/* (async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://shadocs.netlify.app/markdown/code/', {
    waitUntil: 'networkidle2',
  });
  await page.pdf({
    timeout: 0,
    path: 'hn.pdf',
    format: 'A4',
    displayHeaderFooter: true,
    headerTemplate: `
    <style>
      .test {
        width: 100%;
        height: 28px;
        font-size: 16px;
      }
    </style>
    <div class="test"> header: <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
    footerTemplate:
      'footer: <span class="pageNumber"></span> of <span class="totalPages"></span>',
    margin: {top: 40, bottom: 40, left: 40, right: 40},
    printBackground: true,
  });

  await browser.close();
})(); */
