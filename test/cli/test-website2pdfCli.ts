import {expect} from 'chai';
import 'reflect-metadata';
import {Website2PdfCli} from '../../src/cli/website2pdfCli';
import {Website} from '../../src/model/website';
import {
  CHROMIUM_FLAGS_OPTION,
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
  SITEMAP_URL_OPTION,
  TEMPLATE_DIR_OPTION,
} from '../../src/utils/const';
import {
  SPECIFIC_CHROMIUM_FLAGS,
  SPECIFIC_DIR,
  SPECIFIC_EXCLUDE_REGEX,
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
      expect(argv.sitemapUrl).to.be.equal(DEFAULT_SITEMAP_URL);
      expect(argv.templateDir).to.be.equal(DEFAULT_TEMPLATE_DIR);
      expect(argv.outputDir).to.be.equal(DEFAULT_OUTPUT_DIR);
      expect(argv.marginTop).to.be.equal(DEFAULT_MARGIN_MIN);
      expect(argv.marginBottom).to.be.equal(DEFAULT_MARGIN_MIN);
      expect(argv.marginLeft).to.be.equal(DEFAULT_MARGIN_MIN);
      expect(argv.marginRight).to.be.equal(DEFAULT_MARGIN_MIN);
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
});
