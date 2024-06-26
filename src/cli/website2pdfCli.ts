import kleur = require('kleur');
import {hideBin} from 'yargs/helpers';
import {
  CHROMIUM_FLAGS_OPTION,
  CHROMIUM_HEADLESS_OPTION,
  CLI_USAGE,
  DEFAULT_CHROMIUM_HEADLESS,
  DEFAULT_FORMAT,
  DEFAULT_HEADER_FOOTER,
  DEFAULT_MARGIN_MAX,
  DEFAULT_MARGIN_MIN,
  DEFAULT_MERGED_PDF,
  DEFAULT_OUTPUT_DIR,
  DEFAULT_OUTPUT_URL_TO_FILENAME_MAP,
  DEFAULT_PROCESS_POOL,
  DEFAULT_SAFE_TITLE,
  DEFAULT_SITEMAP_URL,
  DEFAULT_TEMPLATE_DIR,
  DEFAULT_URL_TITLE,
  DEFAULT_WAIT_UNTIL,
  DISPLAY_HEADER_FOOTER_OPTION,
  EXCLUDE_URLS_OPTION,
  FORMAT_OPTION,
  MARGIN_BOTTOM_OPTION,
  MARGIN_LEFT_OPTION,
  MARGIN_RIGHT_OPTION,
  MARGIN_TOP_OPTION,
  MERGE_ALL_OPTION,
  OUTPUT_DIR_OPTION,
  OUTPUT_FILE_NAME_URL_MAP_OPTION,
  PROCESS_POOL_OPTION,
  SAFE_TITLE_OPTION,
  SERVE_SITEMAP_OPTION,
  SITEMAP_URL_OPTION,
  TEMPLATE_DIR_OPTION,
  URL_TITLE_OPTION,
  WAIT_UNTIL_OPTION,
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
          `$0 --${CHROMIUM_FLAGS_OPTION}="--no-sandbox --disable-dev-shm-usage"`,
          'Use specific chromium options at Puppeteer launch',
        ],
        [
          `$0 --${CHROMIUM_HEADLESS_OPTION}="true"`,
          'Use specific chromium headless option at Puppeteer launch',
        ],
        [
          `$0 --${DISPLAY_HEADER_FOOTER_OPTION}`,
          'Print PDFs with header and footer',
        ],
        [
          `$0 --${DISPLAY_HEADER_FOOTER_OPTION} --${MARGIN_LEFT_OPTION}="50px" --${MARGIN_RIGHT_OPTION}="50px"`,
          'Use header and footer and set specific margins',
        ],
        [
          `$0 --${EXCLUDE_URLS_OPTION}="\\/fr\\/"`,
          'Exclude urls of french language',
        ],
        [`$0 --${FORMAT_OPTION}="a3"`, 'Set PaperFormat type'],
        [
          `$0 --${MERGE_ALL_OPTION}`,
          `Merge all PDF generated into a single one (${DEFAULT_MERGED_PDF})`,
        ],
        [
          `$0 --${OUTPUT_DIR_OPTION}="./output"`,
          'Use specific output directory',
        ],
        [
          `$0 --${OUTPUT_FILE_NAME_URL_MAP_OPTION}`,
          `Output file name to URL map in JSON format (${DEFAULT_OUTPUT_URL_TO_FILENAME_MAP})`,
        ],
        [
          `$0 --${PROCESS_POOL_OPTION}=20`,
          'Use specific count of parallelized process',
        ],
        [
          `$0 --${SAFE_TITLE_OPTION}`,
          'Safely generate file title by replacing special chars',
        ],
        [`$0 --${SERVE_SITEMAP_OPTION}="sitemap.xml"`, 'Serve a local sitemap'],
        [
          `$0 --${SITEMAP_URL_OPTION}="http://localhost:80/sitemap.xml"`,
          'Use specific sitemap URL',
        ],
        [
          `$0 --${TEMPLATE_DIR_OPTION}="./templates"`,
          'Use specific template directory',
        ],
        [
          `$0 --${URL_TITLE_OPTION}`,
          'Generate file title using last URL fragment',
        ],
        [
          `$0 --${WAIT_UNTIL_OPTION}='domcontentloaded,networkidle0'`,
          'Wait until both domcontentloaded and networkidle0 events are fired on page',
        ],
      ])
      .options({
        chromiumFlags: {
          alias: [`${CHROMIUM_FLAGS_OPTION}`],
          type: 'string',
          description: 'Chromium flags set at Puppeteer launch',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        chromiumHeadless: {
          alias: [`${CHROMIUM_HEADLESS_OPTION}`],
          type: 'string',
          default: DEFAULT_CHROMIUM_HEADLESS,
          description: 'Chromium headless option set at Puppeteer launch',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        debug: {
          type: 'boolean',
          default: false,
          description: 'Turn on debug logging',
        },
        displayHeaderFooter: {
          alias: [`${DISPLAY_HEADER_FOOTER_OPTION}`],
          type: 'boolean',
          default: DEFAULT_HEADER_FOOTER,
          description: 'Turn on header and footer printing',
          group: this.GROUPS.COMMONS,
        },
        excludeUrls: {
          alias: [`${EXCLUDE_URLS_OPTION}`],
          type: 'string',
          description: 'Exclude urls matching a regex from printing process',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        format: {
          alias: [`${FORMAT_OPTION}`],
          type: 'string',
          default: DEFAULT_FORMAT,
          description: 'Set PaperFormat of generated PDF',
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
        marginTop: {
          alias: [`${MARGIN_TOP_OPTION}`],
          type: 'string',
          description: 'Margin top (50px or 0px)',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        mergeAll: {
          alias: [`${MERGE_ALL_OPTION}`],
          type: 'boolean',
          description: `Merge all PDF generated into a single one (${DEFAULT_MERGED_PDF})`,
          group: this.GROUPS.COMMONS,
        },
        outputDir: {
          alias: ['o', `${OUTPUT_DIR_OPTION}`],
          type: 'PathLike',
          default: DEFAULT_OUTPUT_DIR,
          description: 'Relative path of the output directory',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        outputFileNameUrlMap: {
          alias: [`${OUTPUT_FILE_NAME_URL_MAP_OPTION}`],
          type: 'boolean',
          description: `Output file name to URL map in JSON format (${DEFAULT_OUTPUT_URL_TO_FILENAME_MAP})`,
          group: this.GROUPS.COMMONS,
        },
        processPool: {
          alias: [`${PROCESS_POOL_OPTION}`],
          type: 'number',
          default: DEFAULT_PROCESS_POOL,
          description: 'Pool of parallelized process',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        safeTitle: {
          alias: [`${SAFE_TITLE_OPTION}`],
          type: 'boolean',
          default: DEFAULT_SAFE_TITLE,
          description: 'Safely generate file title by replacing special chars',
          group: this.GROUPS.COMMONS,
        },
        serveSitemap: {
          alias: [`${SERVE_SITEMAP_OPTION}`],
          type: 'string',
          description: 'Serve local sitemap',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        sitemapUrl: {
          alias: ['s', `${SITEMAP_URL_OPTION}`],
          type: 'string',
          default: DEFAULT_SITEMAP_URL,
          description: 'Sitemap URL',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        templateDir: {
          alias: ['t', `${TEMPLATE_DIR_OPTION}`],
          type: 'PathLike',
          default: DEFAULT_TEMPLATE_DIR,
          description: 'Relative path of the templates directory',
          group: this.GROUPS.COMMONS,
          nargs: 1,
        },
        urlTitle: {
          alias: [`${URL_TITLE_OPTION}`],
          type: 'boolean',
          default: DEFAULT_URL_TITLE,
          description: 'Generate file title using last URL fragment',
          group: this.GROUPS.COMMONS,
        },
        waitUntil: {
          alias: [`${WAIT_UNTIL_OPTION}`],
          type: 'string',
          default: DEFAULT_WAIT_UNTIL,
          description:
            'Comma-separated list of PuppeteerLifeCycleEvent used to wait until specific event is fired on page',
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
