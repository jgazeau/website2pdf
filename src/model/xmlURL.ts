import {URL} from 'url';
import {WebsiteURL} from './websiteURL';
import {IsDefined} from 'class-validator';
import {Transform, Type} from 'class-transformer';

export class XmlURL {
  @IsDefined()
  @Type(() => URL)
  @Transform(({value}) => new URL(value, new WebsiteURL().baseURL), {
    toClassOnly: true,
  })
  private loc: URL;
  /* c8 ignore start */
  public get _loc(): URL {
    return this.loc;
  }
  public set _loc(value: URL) {
    this.loc = value;
  }
  /* c8 ignore stop */
}
