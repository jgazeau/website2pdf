/* eslint-disable @typescript-eslint/no-explicit-any*/
import axios from 'axios';
import {XmlURL} from './xmlURL';
import {XmlSitemap} from './xmlSitemap';
import {WebsiteURL} from './websiteURL';
import {XMLParser} from 'fast-xml-parser';
import {fxpOptions} from '../utils/const';
import {PdfTemplate} from './pdfTemplate';
import {plainToClass} from 'class-transformer';
import {WebsiteSitemap} from './websiteSitemap';
import {XmlSitemapIndex} from './xmlSitemapIndex';
import {ICliArguments} from '../cli/iArgumentsParser';
import {validateClassObjectSync} from '../utils/helpers';
import {
  ERROR_PARSING_XML_SCHEMA,
  ERROR_UNKNOWN_XML_SCHEMA,
  Website2PdfError,
} from './website2pdfError';

export class Website {
  private _websiteURL: WebsiteURL = new WebsiteURL();
  /* c8 ignore start */
  public get websiteURL(): WebsiteURL {
    return this._websiteURL;
  }
  public set websiteURL(value: WebsiteURL) {
    this._websiteURL = value;
  }
  /* c8 ignore stop */

  private _pdfTemplate: PdfTemplate;
  /* c8 ignore start */
  public get pdfTemplate(): PdfTemplate {
    return this._pdfTemplate;
  }
  public set pdfTemplate(value: PdfTemplate) {
    this._pdfTemplate = value;
  }
  /* c8 ignore stop */

  private _sitemaps: Array<WebsiteSitemap> = [];
  /* c8 ignore start */
  public get sitemaps(): Array<WebsiteSitemap> {
    return this._sitemaps;
  }
  public set sitemaps(value: Array<WebsiteSitemap>) {
    this._sitemaps = value;
  }
  /* c8 ignore stop */

  private _cliArgs: ICliArguments | undefined;
  /* c8 ignore start */
  public get cliArgs(): ICliArguments | undefined {
    return this._cliArgs;
  }
  public set cliArgs(value: ICliArguments | undefined) {
    this._cliArgs = value;
  }
  /* c8 ignore stop */

  constructor(cliArgs?: ICliArguments) {
    this.cliArgs = cliArgs;
    this.pdfTemplate = new PdfTemplate(
      cliArgs?.displayHeaderFooter,
      cliArgs?.templateDir
    );
  }

  build(): Promise<Website> {
    return this.populateSiteMap(this.websiteURL.sitemapURL).then(() => {
      return this;
    });
  }

  private populateSiteMap(url: URL): Promise<void> {
    return axios.get(url.toString()).then((response: any) => {
      return this.parseToXml(response.data)
        .then((xml: any) => {
          return this.map(xml);
        })
        .then((jsonObject: XmlSitemapIndex | XmlSitemap) => {
          return this.populate(url, jsonObject);
        });
    });
  }

  private parseToXml(body: any): Promise<any> {
    try {
      const parser = new XMLParser(fxpOptions);
      return Promise.resolve(parser.parse(body));
    } catch (error: any) {
      return Promise.reject(
        new Website2PdfError(`${ERROR_PARSING_XML_SCHEMA}: ${error.message}`)
      );
    }
  }

  private map(xml: any): Promise<XmlSitemapIndex | XmlSitemap> {
    try {
      const mappedXml: XmlSitemapIndex = plainToClass(XmlSitemapIndex, xml);
      validateClassObjectSync(mappedXml);
      return Promise.resolve(mappedXml);
    } catch (error: any) {
      return this.mapToSitemap(xml);
    }
  }

  private mapToSitemap(xml: any): Promise<XmlSitemap> {
    try {
      const mappedXml: XmlSitemap = plainToClass(XmlSitemap, xml);
      validateClassObjectSync(mappedXml);
      return Promise.resolve(mappedXml);
    } catch (error: any) {
      return Promise.reject(new Website2PdfError(ERROR_UNKNOWN_XML_SCHEMA));
    }
  }

  private populate(
    rootUrl: URL,
    json: XmlSitemapIndex | XmlSitemap
  ): Promise<void> {
    if (json instanceof XmlSitemap) {
      json._urlset._url.length
        ? this._sitemaps.push(
            new WebsiteSitemap(
              rootUrl,
              json._urlset._url
                .flatMap((xmlURL: XmlURL) => xmlURL._loc)
                .filter(
                  url =>
                    this.cliArgs?.excludeUrls === undefined ||
                    new RegExp(this.cliArgs?.excludeUrls).exec(url.href) ===
                      null
                )
            )
          )
        : this._sitemaps.push(new WebsiteSitemap(rootUrl, []));
      return Promise.resolve();
    } else {
      return Promise.all(
        json._sitemapindex._sitemap.map(xmlURL => {
          return this.populateSiteMap(xmlURL._loc);
        })
      ).then(() => {
        return Promise.resolve();
      });
    }
  }
}
