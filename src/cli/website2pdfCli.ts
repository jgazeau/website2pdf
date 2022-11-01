import kleur = require('kleur');
import {hideBin} from 'yargs/helpers';
import {
  CHROMIUM_FLAGS_OPTION,
  CLI_USAGE,
  DEFAULT_MARGIN_MAX,
  DEFAULT_MARGIN_MIN,
  DEFAULT_OUTPUT_DIR,
  DEFAULT_SITEMAP_URL,
  DEFAULT_TEMPLATE_DIR,
  DISPLAY_HEADER_FOOTER_OPTION,
  EXCLUDE_URLS_OPTION,
  MARGIN_BOTTOM_OPTION,
  MARGIN_LEFT_OPTION,
  MARGIN_RIGHT_OPTION,
  MARGIN_TOP_OPTION,
  OUTPUT_DIR_OPTION,
  PROCESS_POOL_OPTION,
  SAFE_TITLE_OPTION,
  SITEMAP_URL_OPTION,
  TEMPLATE_DIR_OPTION,
} from '../utils/const';
import {getOutputWidth} from '../utils/helpers';
import {IArgumentsParser, ICliArguments} from './iArgumentsParser';
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
          `$0 --${SITEMAP_URL_OPTION} "http://localhost:80/sitemap.xml"`,
          'Use specific sitemap URL',
        ],
        [
          `$0 --${DISPLAY_HEADER_FOOTER_OPTION}`,
          'Print PDFs with header and footer',
        ],
        [
          `$0 --${TEMPLATE_DIR_OPTION} "./templates"`,
          'Use specific template directory',
        ],
        [
          `$0 --${OUTPUT_DIR_OPTION} "./output"`,
          'Use specific output directory',
        ],
        [
          `$0 --${DISPLAY_HEADER_FOOTER_OPTION} --${MARGIN_LEFT_OPTION} "50px" --${MARGIN_RIGHT_OPTION} "50px"`,
          'Use header and footer and set specific margins',
        ],
        [
          `$0 --${CHROMIUM_FLAGS_OPTION}="--no-sandbox --disable-dev-shm-usage"`,
          'Use specific chromium options at Puppeteer launch',
        ],
        [
          `$0 --${EXCLUDE_URLS_OPTION}="\\/fr\\/"`,
          'Exclude urls of french language',
        ],
        [
          `$0 --${SAFE_TITLE_OPTION}`,
          'Safely generate file title by replacing special chars',
        ],
        [
          `$0 --${PROCESS_POOL_OPTION}`,
          'Use specific count of parallelized process',
        ],
      ])
      .options({
        debug: {
          type: 'boolean',
          default: false,
          description: 'Turn on debug logging',
        },
        sitemapUrl: {
          alias: ['s', `${SITEMAP_URL_OPTION}`],
          type: 'string',
          default: DEFAULT_SITEMAP_URL,
          description: 'Sitemap URL',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        displayHeaderFooter: {
          alias: [`${DISPLAY_HEADER_FOOTER_OPTION}`],
          type: 'boolean',
          default: false,
          description: 'Turn on header and footer printing',
          group: this.GROUPS.COMMONS,
        },
        templateDir: {
          alias: ['t', `${TEMPLATE_DIR_OPTION}`],
          type: 'PathLike',
          default: DEFAULT_TEMPLATE_DIR,
          description: 'Relative path of the templates directory',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        outputDir: {
          alias: ['o', `${OUTPUT_DIR_OPTION}`],
          type: 'PathLike',
          default: DEFAULT_OUTPUT_DIR,
          description: 'Relative path of the output directory',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        marginTop: {
          alias: [`${MARGIN_TOP_OPTION}`],
          type: 'string',
          description: 'Margin top (50px or 0px)',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        marginBottom: {
          alias: [`${MARGIN_BOTTOM_OPTION}`],
          type: 'string',
          description: 'Margin bottom (50px or 0px)',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        marginLeft: {
          alias: [`${MARGIN_LEFT_OPTION}`],
          type: 'string',
          default: DEFAULT_MARGIN_MIN,
          description: 'Margin left',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        marginRight: {
          alias: [`${MARGIN_RIGHT_OPTION}`],
          type: 'string',
          default: DEFAULT_MARGIN_MIN,
          description: 'Margin right',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        chromiumFlags: {
          alias: [`${CHROMIUM_FLAGS_OPTION}`],
          type: 'string',
          description: 'Chromium flags set at Puppeteer launch',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        excludeUrls: {
          alias: [`${EXCLUDE_URLS_OPTION}`],
          type: 'string',
          description: 'Exclude urls matching a regex from printing process',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        safeTitle: {
          alias: [`${SAFE_TITLE_OPTION}`],
          type: 'boolean',
          default: false,
          description: 'Safely generate file title by replacing special chars',
          group: this.GROUPS.COMMONS,
        },
        processPool: {
          alias: [`${PROCESS_POOL_OPTION}`],
          type: 'number',
          default: 10,
          description: 'Pool of parallelized process',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
      })
      .wrap(getOutputWidth())
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
    this.defaultValues(Website2PdfCli.cliArgs);
    return Promise.resolve(Website2PdfCli.cliArgs);
  }

  private defaultValues(args: ICliArguments): void {
    if (args.displayHeaderFooter) {
      args.marginTop = args.marginTop ? args.marginTop : DEFAULT_MARGIN_MAX;
      args.marginBottom = args.marginBottom
        ? args.marginBottom
        : DEFAULT_MARGIN_MAX;
    } else {
      args.marginTop = args.marginTop ? args.marginTop : DEFAULT_MARGIN_MIN;
      args.marginBottom = args.marginBottom
        ? args.marginBottom
        : DEFAULT_MARGIN_MIN;
    }
  }
}
