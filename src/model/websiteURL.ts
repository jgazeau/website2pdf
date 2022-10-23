import {URL} from 'url';
import {Website2PdfCli} from '../cli/website2pdfCli';
import {DEFAULT_SITEMAP_URL} from '../utils/const';

export class WebsiteURL {
  private _sitemapURL: URL = new URL(
    Website2PdfCli.cliArgs !== undefined
      ? Website2PdfCli.cliArgs.sitemapUrl || DEFAULT_SITEMAP_URL
      : DEFAULT_SITEMAP_URL
  );
  /* c8 ignore start */
  public get sitemapURL(): URL {
    return this._sitemapURL;
  }
  public set sitemapURL(value: URL) {
    this._sitemapURL = value;
  }
  /* c8 ignore stop */

  private _baseURL: string = this.sitemapURL.origin;
  /* c8 ignore start */
  public get baseURL(): string {
    return this._baseURL;
  }
  public set baseURL(value: string) {
    this._baseURL = value;
  }
  /* c8 ignore stop */
}
