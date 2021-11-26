import yargs = require('yargs');
import {PathLike} from 'fs-extra';

export interface IArgumentsParser extends yargs.Argv {
  argv: ICliArguments;
}

export interface ICliArguments extends yargs.Arguments {
  debug: boolean;
  displayHeaderFooter: boolean;
  sitemapUrl: string;
  templateDir: PathLike;
  outputDir: PathLike;
}
