import {XmlURL} from './xmlURL';
import {Transform, Type} from 'class-transformer';
import {IsArray, IsDefined, IsOptional, ValidateNested} from 'class-validator';

export class XmlUrlset {
  @IsOptional()
  @ValidateNested()
  @Type(() => XmlURL)
  @IsArray()
  private url: Array<XmlURL> = [];
  /* c8 ignore start */
  public get _url(): Array<XmlURL> {
    return this.url;
  }
  public set _url(value: Array<XmlURL>) {
    this.url = value;
  }
  /* c8 ignore stop */
}

export class XmlSitemap {
  @IsDefined()
  @ValidateNested()
  @Type(() => XmlUrlset)
  @Transform(({value}) => value || new XmlUrlset(), {toClassOnly: true})
  private urlset: XmlUrlset;
  /* c8 ignore start */
  public get _urlset(): XmlUrlset {
    return this.urlset;
  }
  public set _urlset(value: XmlUrlset) {
    this.urlset = value;
  }
  /* c8 ignore stop */
}
