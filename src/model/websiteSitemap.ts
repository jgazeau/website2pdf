import {URL} from 'url';

export class WebsiteSitemap {
  private _rootUrl: URL;
  /* c8 ignore start */
  public get rootUrl(): URL {
    return this._rootUrl;
  }
  public set rootUrl(value: URL) {
    this._rootUrl = value;
  }
  /* c8 ignore stop */

  private _urls: Array<URL>;
  /* c8 ignore start */
  public get urls(): Array<URL> {
    return this._urls;
  }
  public set urls(value: Array<URL>) {
    this._urls = value;
  }
  /* c8 ignore stop */

  constructor(rootUrl: URL, urls: Array<URL>) {
    this.rootUrl = rootUrl;
    this.urls = urls;
  }
}
