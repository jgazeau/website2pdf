import {PathLike} from 'fs-extra';
import {Arguments, Argv} from 'yargs';

export interface IArgumentsParser extends Argv {
  argv: ICliArguments;
}

export interface ICliArguments extends Arguments {
  debug: boolean;
  displayHeaderFooter: boolean;
  sitemapUrl: string;
  templateDir: PathLike;
  outputDir: PathLike;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  chromiumFlags: string;
  excludeUrls: string;
}
