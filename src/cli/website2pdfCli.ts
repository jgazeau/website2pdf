import kleur = require('kleur');
import {hideBin} from 'yargs/helpers';
import {IArgumentsParser, ICliArguments} from './iArgumentsParser';
import {
  CLI_USAGE,
  DEFAULT_OUTPUT_DIR,
  DEFAULT_TEMPLATE_DIR,
  DEFAULT_SITEMAP_URL,
  TEMPLATE_DIR_OPTION,
  OUTPUT_DIR_OPTION,
} from '../utils/const';
const yargs = require('yargs');

export class Website2PdfCli {
  private GROUPS = {
    COMMONS: 'Common options:',
  };
  private static _cliArgs: ICliArguments;
  /* c8 ignore start */
  public static get cliArgs(): ICliArguments {
    return Website2PdfCli._cliArgs;
  }
  public static set cliArgs(value: ICliArguments) {
    Website2PdfCli._cliArgs = value;
  }
  /* c8 ignore stop */

  private parser: IArgumentsParser;
  /* c8 ignore start */
  public get _parser(): IArgumentsParser {
    return this.parser;
  }
  public set _parser(value: IArgumentsParser) {
    this.parser = value;
  }
  /* c8 ignore stop */

  constructor() {
    this._parser = yargs(hideBin(process.argv))
      .scriptName('website2pdf')
      .check((argv: ICliArguments) => {
        Website2PdfCli.cliArgs = argv;
        return true;
      })
      .updateStrings({
        'Options:': 'Other Options:',
        'Commands:': 'Commands:',
      })
      .usage(`${CLI_USAGE}`)
      .alias('v', 'version')
      .alias('h', 'help')
      .example([
        [
          '$0 --sitemapUrl "http://localhost:80/sitemap.xml"',
          'Use specific sitemap URL',
        ],
        ['$0 --displayHeaderFooter', 'Print PDFs with header and footer'],
        [
          `$0 --${TEMPLATE_DIR_OPTION} "./templates"`,
          'Use specific template directory',
        ],
        [
          `$0 --${OUTPUT_DIR_OPTION} "./output"`,
          'Use specific output directory',
        ],
      ])
      .options({
        debug: {
          type: 'boolean',
          default: false,
          description: 'Turn on debug logging',
        },
        sitemapUrl: {
          alias: 's',
          type: 'string',
          default: DEFAULT_SITEMAP_URL,
          description: 'Sitemap URL',
          group: this.GROUPS.COMMONS,
        },
        displayHeaderFooter: {
          type: 'boolean',
          default: false,
          description: 'Turn on header and footer printing',
          group: this.GROUPS.COMMONS,
        },
        templateDir: {
          alias: 't',
          type: 'PathLike',
          default: DEFAULT_TEMPLATE_DIR,
          description: 'Relative path of the templates directory',
          group: this.GROUPS.COMMONS,
        },
        outputDir: {
          alias: 'o',
          type: 'PathLike',
          default: DEFAULT_OUTPUT_DIR,
          description: 'Relative path of the output directory',
          group: this.GROUPS.COMMONS,
        },
      })
      .wrap(null)
      .epilog(
        `Additional information:
  GitHub: ${kleur.green('https://github.com/jgazeau/website2pdf.git')}
  Documentation: ${kleur.blue('https://github.com/jgazeau/website2pdf#readme')}
  Issues: ${kleur.red('https://github.com/jgazeau/website2pdf/issues')}
      `
      );
  }

  parse(): Promise<ICliArguments> {
    this._parser.argv;
    return Promise.resolve(Website2PdfCli.cliArgs);
  }
}
