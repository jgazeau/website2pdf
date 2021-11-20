import {XmlURL} from './xmlURL';
import {Transform, Type} from 'class-transformer';
import {IsArray, IsDefined, IsOptional, ValidateNested} from 'class-validator';

export class SitemapIndex {
  @IsOptional()
  @ValidateNested()
  @Type(() => XmlURL)
  @IsArray()
  private sitemap: Array<XmlURL> = [];
  /* c8 ignore start */
  public get _sitemap(): Array<XmlURL> {
    return this.sitemap;
  }
  public set _sitemap(value: Array<XmlURL>) {
    this.sitemap = value;
  }
  /* c8 ignore stop */
}

export class XmlSitemapIndex {
  @IsDefined()
  @ValidateNested()
  @Type(() => SitemapIndex)
  @Transform(({value}) => value || new SitemapIndex(), {toClassOnly: true})
  private sitemapindex: SitemapIndex;
  /* c8 ignore start */
  public get _sitemapindex(): SitemapIndex {
    return this.sitemapindex;
  }
  public set _sitemapindex(value: SitemapIndex) {
    this.sitemapindex = value;
  }
  /* c8 ignore stop */
}
