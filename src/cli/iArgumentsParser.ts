import {PathLike} from 'fs-extra';
import {PaperFormat} from 'puppeteer';
import {Arguments, Argv} from 'yargs';

export interface IArgumentsParser extends Argv {
  argv: ICliArguments;
}

export interface ICliArguments extends Arguments {
  chromiumFlags: string;
  chromiumHeadless: unknown;
  debug: boolean;
  displayHeaderFooter: boolean;
  excludeUrls: string;
  format: PaperFormat;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
  outputDir: PathLike;
  processPool: number;
  safeTitle: boolean;
  serveSitemap: string;
  sitemapUrl: string;
  templateDir: PathLike;
  urlTitle: boolean;
}
