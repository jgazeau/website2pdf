import 'reflect-metadata';
import {expect} from 'chai';
import {Website} from '../../src/model/website';
import {SinonStubs} from '../testUtils/sinonStubs';
import {Website2PdfCli} from '../../src/cli/website2pdfCli';
import {
  SPECIFIC_CHROMIUM_FLAGS,
  SPECIFIC_DIR,
  SPECIFIC_URL,
} from '../testUtils/const';
import {mockArgs, setChaiAsPromised} from '../testUtils/helpers';
import {
  CHROMIUM_FLAGS_OPTION,
  DEFAULT_MARGIN_MAX,
  DEFAULT_MARGIN_MIN,
  DEFAULT_OUTPUT_DIR,
  DEFAULT_SITEMAP_URL,
  DEFAULT_TEMPLATE_DIR,
  DISPLAY_HEADER_FOOTER_OPTION,
  MARGIN_BOTTOM_OPTION,
  MARGIN_LEFT_OPTION,
  MARGIN_RIGHT_OPTION,
  MARGIN_TOP_OPTION,
  OUTPUT_DIR_OPTION,
  TEMPLATE_DIR_OPTION,
} from '../../src/utils/const';

describe('Website2Pdf CLI tests', () => {
  const sinonMock = new SinonStubs({});
  const testMargin = '100px';
  afterEach(() => {
    sinonMock.sinonRestoreStubs();
  });
  it('parse with help option should display help and exit', () => {
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
  it('parse with version option should display version and exit', () => {
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
  it('parse with debug option should set logger in debug mode', () => {
    setChaiAsPromised();
    mockArgs(['--debug']);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.debug).to.be.true;
    });
  });
  it('parse without option should have default arguments', () => {
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
  it('parse with sitemapUrl option should have specific sitemap URL argument', () => {
    setChaiAsPromised();
    mockArgs(['--sitemapUrl', `${SPECIFIC_URL}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.sitemapUrl).to.be.equal(SPECIFIC_URL);
      const website: Website = new Website();
      expect(website.websiteURL.sitemapURL.toString()).to.equal(SPECIFIC_URL);
    });
  });
  it(`parse with ${DISPLAY_HEADER_FOOTER_OPTION} option should have display header and footer argument and default margin arguments`, () => {
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
  it(`parse with ${TEMPLATE_DIR_OPTION} option should have specific template directory argument`, () => {
    setChaiAsPromised();
    mockArgs([`--${TEMPLATE_DIR_OPTION}`, `${SPECIFIC_DIR}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.templateDir).to.be.equal(SPECIFIC_DIR);
    });
  });
  it(`parse with ${OUTPUT_DIR_OPTION} option should have specific output directory argument`, () => {
    setChaiAsPromised();
    mockArgs([`--${OUTPUT_DIR_OPTION}`, `${SPECIFIC_DIR}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.outputDir).to.be.equal(SPECIFIC_DIR);
    });
  });
  it(`parse with ${MARGIN_TOP_OPTION} option should have specific ${MARGIN_TOP_OPTION} argument`, () => {
    setChaiAsPromised();
    mockArgs([`--${MARGIN_TOP_OPTION}`, `${testMargin}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.marginTop).to.be.equal(testMargin);
    });
  });
  it(`parse with ${MARGIN_BOTTOM_OPTION} option should have specific ${MARGIN_BOTTOM_OPTION} argument`, () => {
    setChaiAsPromised();
    mockArgs([`--${MARGIN_BOTTOM_OPTION}`, `${testMargin}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.marginBottom).to.be.equal(testMargin);
    });
  });
  it(`parse with ${MARGIN_LEFT_OPTION} option should have specific ${MARGIN_LEFT_OPTION} argument`, () => {
    setChaiAsPromised();
    mockArgs([`--${MARGIN_LEFT_OPTION}`, `${testMargin}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.marginLeft).to.be.equal(testMargin);
    });
  });
  it(`parse with ${MARGIN_RIGHT_OPTION} option should have specific ${MARGIN_RIGHT_OPTION} argument`, () => {
    setChaiAsPromised();
    mockArgs([`--${MARGIN_RIGHT_OPTION}`, `${testMargin}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.marginRight).to.be.equal(testMargin);
    });
  });
  it(`parse with ${CHROMIUM_FLAGS_OPTION} option should have specific ${CHROMIUM_FLAGS_OPTION} argument`, () => {
    setChaiAsPromised();
    mockArgs([`--${CHROMIUM_FLAGS_OPTION}=${SPECIFIC_CHROMIUM_FLAGS}`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.chromiumFlags).to.be.equal(SPECIFIC_CHROMIUM_FLAGS);
    });
  });
});
