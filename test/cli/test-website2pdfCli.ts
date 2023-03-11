import {expect} from 'chai';
import 'reflect-metadata';
import {Website2PdfCli} from '../../src/cli/website2pdfCli';
import {Website} from '../../src/model/website';
import {
  CHROMIUM_FLAGS_OPTION,
  DEFAULT_FORMAT,
  DEFAULT_MARGIN_MAX,
  DEFAULT_MARGIN_MIN,
  DEFAULT_OUTPUT_DIR,
  DEFAULT_PROCESS_POOL,
  DEFAULT_SAFE_TITLE,
  DEFAULT_SITEMAP_URL,
  DEFAULT_TEMPLATE_DIR,
  DEFAULT_URL_TITLE,
  DISPLAY_HEADER_FOOTER_OPTION,
  EXCLUDE_URLS_OPTION,
  FORMAT_OPTION,
  MARGIN_BOTTOM_OPTION,
  MARGIN_LEFT_OPTION,
  MARGIN_RIGHT_OPTION,
  MARGIN_TOP_OPTION,
  OUTPUT_DIR_OPTION,
  PROCESS_POOL_OPTION,
  SAFE_TITLE_OPTION,
  SERVE_SITEMAP_OPTION,
  SITEMAP_URL_OPTION,
  TEMPLATE_DIR_OPTION,
  URL_TITLE_OPTION,
} from '../../src/utils/const';
import {
  SPECIFIC_CHROMIUM_FLAGS,
  SPECIFIC_DIR,
  SPECIFIC_EXCLUDE_REGEX,
  SPECIFIC_FORMAT,
  SPECIFIC_PROCESS_POOL,
  SPECIFIC_SERVED_SITEMAP,
  SPECIFIC_URL,
} from '../testUtils/const';
import {mockArgs, setChaiAsPromised} from '../testUtils/helpers';
import {SinonStubs} from '../testUtils/sinonStubs';

describe('Website2Pdf CLI tests', () => {
  const sinonMock = new SinonStubs({});
  const testMargin = '100px';
  afterEach(() => {
    sinonMock.sinonRestoreStubs();
  });
  it('parse should display help and exit when help option', () => {
    setChaiAsPromised();
    sinonMock.consoleLog = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs(['--help']);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.log).to.be.calledOnce;
      expect(process.exit).to.be.calledOnce;
    });
  });
  it('parse should display version and exit when version option', () => {
    setChaiAsPromised();
    sinonMock.consoleLog = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs(['--version']);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.log).to.be.calledOnce;
      expect(process.exit).to.be.calledOnce;
    });
  });
  it('parse should set logger in debug mode when debug option', () => {
    setChaiAsPromised();
    mockArgs(['--debug']);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.debug).to.be.true;
    });
  });
  it('parse should have default arguments when no option', () => {
    setChaiAsPromised();
    mockArgs([]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.displayHeaderFooter).to.be.equal(false);
      expect(argv.format).to.be.equal(DEFAULT_FORMAT);
      expect(argv.marginTop).to.be.equal(DEFAULT_MARGIN_MIN);
      expect(argv.marginBottom).to.be.equal(DEFAULT_MARGIN_MIN);
      expect(argv.marginLeft).to.be.equal(DEFAULT_MARGIN_MIN);
      expect(argv.marginRight).to.be.equal(DEFAULT_MARGIN_MIN);
      expect(argv.outputDir).to.be.equal(DEFAULT_OUTPUT_DIR);
      expect(argv.processPool).to.be.equal(DEFAULT_PROCESS_POOL);
      expect(argv.safeTitle).to.be.equal(DEFAULT_SAFE_TITLE);
      expect(argv.serveSitemap).to.be.undefined;
      expect(argv.sitemapUrl).to.be.equal(DEFAULT_SITEMAP_URL);
      expect(argv.templateDir).to.be.equal(DEFAULT_TEMPLATE_DIR);
      expect(argv.urlTitle).to.be.equal(DEFAULT_URL_TITLE);
      const website: Website = new Website();
      expect(website.websiteURL.sitemapURL.toString()).to.equal(
        DEFAULT_SITEMAP_URL
      );
    });
  });
  it(`parse should have specific sitemap URL argument when ${SITEMAP_URL_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${SITEMAP_URL_OPTION}`, `${SPECIFIC_URL}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.sitemapUrl).to.be.equal(SPECIFIC_URL);
      const website: Website = new Website();
      expect(website.websiteURL.sitemapURL.toString()).to.equal(SPECIFIC_URL);
    });
  });
  it(`parse should display error and exit when ${SITEMAP_URL_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${SITEMAP_URL_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have specific served sitemap argument when ${SERVE_SITEMAP_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${SERVE_SITEMAP_OPTION}`, `${SPECIFIC_SERVED_SITEMAP}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.serveSitemap).to.be.equal(SPECIFIC_SERVED_SITEMAP);
    });
  });
  it(`parse should display error and exit when ${SERVE_SITEMAP_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${SERVE_SITEMAP_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have display header and footer argument and default margin arguments when ${DISPLAY_HEADER_FOOTER_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${DISPLAY_HEADER_FOOTER_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.displayHeaderFooter).to.be.equal(true);
      expect(argv.marginTop).to.be.equal(DEFAULT_MARGIN_MAX);
      expect(argv.marginBottom).to.be.equal(DEFAULT_MARGIN_MAX);
      expect(argv.marginLeft).to.be.equal(DEFAULT_MARGIN_MIN);
      expect(argv.marginRight).to.be.equal(DEFAULT_MARGIN_MIN);
    });
  });
  it(`parse should have display header and footer argument and specific margin arguments when ${DISPLAY_HEADER_FOOTER_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([
      `--${DISPLAY_HEADER_FOOTER_OPTION}`,
      `--${MARGIN_TOP_OPTION}`,
      `${testMargin}`,
      `--${MARGIN_BOTTOM_OPTION}`,
      `${testMargin}`,
      `--${MARGIN_LEFT_OPTION}`,
      `${testMargin}`,
      `--${MARGIN_RIGHT_OPTION}`,
      `${testMargin}`,
    ]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.displayHeaderFooter).to.be.equal(true);
      expect(argv.marginTop).to.be.equal(testMargin);
      expect(argv.marginBottom).to.be.equal(testMargin);
      expect(argv.marginLeft).to.be.equal(testMargin);
      expect(argv.marginRight).to.be.equal(testMargin);
    });
  });
  it(`parse should have specific template directory argument when ${TEMPLATE_DIR_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${TEMPLATE_DIR_OPTION}`, `${SPECIFIC_DIR}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.templateDir).to.be.equal(SPECIFIC_DIR);
    });
  });
  it(`parse should display error and exit when ${TEMPLATE_DIR_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${TEMPLATE_DIR_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have specific output directory argument when ${OUTPUT_DIR_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${OUTPUT_DIR_OPTION}`, `${SPECIFIC_DIR}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.outputDir).to.be.equal(SPECIFIC_DIR);
    });
  });
  it(`parse should display error and exit when ${OUTPUT_DIR_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${OUTPUT_DIR_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have specific ${MARGIN_TOP_OPTION} argument when ${MARGIN_TOP_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${MARGIN_TOP_OPTION}`, `${testMargin}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.marginTop).to.be.equal(testMargin);
    });
  });
  it(`parse should display error and exit when ${MARGIN_TOP_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${MARGIN_TOP_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have specific ${MARGIN_BOTTOM_OPTION} argument when ${MARGIN_BOTTOM_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${MARGIN_BOTTOM_OPTION}`, `${testMargin}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.marginBottom).to.be.equal(testMargin);
    });
  });
  it(`parse should display error and exit when ${MARGIN_BOTTOM_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${MARGIN_BOTTOM_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have specific ${MARGIN_LEFT_OPTION} argument when ${MARGIN_LEFT_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${MARGIN_LEFT_OPTION}`, `${testMargin}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.marginLeft).to.be.equal(testMargin);
    });
  });
  it(`parse should display error and exit when ${MARGIN_LEFT_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${MARGIN_LEFT_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have specific ${MARGIN_RIGHT_OPTION} argument when ${MARGIN_RIGHT_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${MARGIN_RIGHT_OPTION}`, `${testMargin}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.marginRight).to.be.equal(testMargin);
    });
  });
  it(`parse should display error and exit when ${MARGIN_RIGHT_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${MARGIN_RIGHT_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have specific ${CHROMIUM_FLAGS_OPTION} argument when ${CHROMIUM_FLAGS_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${CHROMIUM_FLAGS_OPTION}=${SPECIFIC_CHROMIUM_FLAGS}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.chromiumFlags).to.be.equal(SPECIFIC_CHROMIUM_FLAGS);
    });
  });
  it(`parse should display error and exit when ${CHROMIUM_FLAGS_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${CHROMIUM_FLAGS_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have specific ${EXCLUDE_URLS_OPTION} argument when ${EXCLUDE_URLS_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${EXCLUDE_URLS_OPTION}=${SPECIFIC_EXCLUDE_REGEX}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.excludeUrls).to.be.equal(SPECIFIC_EXCLUDE_REGEX);
    });
  });
  it(`parse should display error and exit when ${EXCLUDE_URLS_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${EXCLUDE_URLS_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have specific ${SAFE_TITLE_OPTION} argument when ${SAFE_TITLE_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${SAFE_TITLE_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.safeTitle).to.be.equal(true);
    });
  });
  it(`parse should have specific ${URL_TITLE_OPTION} argument when ${URL_TITLE_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${URL_TITLE_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.urlTitle).to.be.equal(true);
    });
  });
  it(`parse should have specific ${PROCESS_POOL_OPTION} argument when ${PROCESS_POOL_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${PROCESS_POOL_OPTION}=${SPECIFIC_PROCESS_POOL}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.processPool).to.be.equal(SPECIFIC_PROCESS_POOL);
    });
  });
  it(`parse should display error and exit when ${PROCESS_POOL_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${PROCESS_POOL_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
  it(`parse should have specific ${FORMAT_OPTION} argument when ${FORMAT_OPTION} option`, () => {
    setChaiAsPromised();
    mockArgs([`--${FORMAT_OPTION}=${SPECIFIC_FORMAT}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.format).to.be.equal(SPECIFIC_FORMAT);
    });
  });
  it(`parse should display error and exit when ${FORMAT_OPTION} option is empty`, () => {
    setChaiAsPromised();
    sinonMock.consoleError = true;
    sinonMock.processExit = true;
    sinonMock.sinonSetStubs();
    mockArgs([`--${FORMAT_OPTION}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(() => {
      expect(console.error).to.be.called;
      expect(process.exit).to.be.called;
    });
  });
});
