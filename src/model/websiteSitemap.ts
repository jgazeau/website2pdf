import {URL} from 'url';

export class WebsiteSitemap {
  private _lang: string;
  /* c8 ignore start */
  public get lang(): string {
    return this._lang;
  }
  public set lang(value: string) {
    this._lang = value;
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

  constructor(lang: string, urls: Array<URL>) {
    this.lang = lang;
    this.urls = urls;
  }
}
