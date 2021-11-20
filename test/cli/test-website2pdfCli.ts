import 'reflect-metadata';
import {expect} from 'chai';
import {Website} from '../../src/model/website';
import {SinonStubs} from '../testUtils/sinonStubs';
import {Website2PdfCli} from '../../src/cli/website2pdfCli';
import {SPECIFIC_DIR, SPECIFIC_URL} from '../testUtils/const';
import {mockArgs, setChaiAsPromised} from '../testUtils/helpers';
import {
  DEFAULT_OUTPUT_DIR,
  DEFAULT_SITEMAP_URL,
  DEFAULT_TEMPLATE_DIR,
} from '../../src/utils/const';

describe('Website2Pdf CLI tests', () => {
  const sinonMock = new SinonStubs({});
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
      expect(argv.sitemapUrl).to.be.equal(DEFAULT_SITEMAP_URL);
      expect(argv.templateDir).to.be.equal(DEFAULT_TEMPLATE_DIR);
      expect(argv.outputDir).to.be.equal(DEFAULT_OUTPUT_DIR);
    });
  });
  it('parse with sitemapUrl option should have specific sitemap URL argument and other default arguments', () => {
    setChaiAsPromised();
    mockArgs(['--sitemapUrl', `"${SPECIFIC_URL}"`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.sitemapUrl).to.be.equal(SPECIFIC_URL);
      expect(argv.templateDir).to.be.equal(DEFAULT_TEMPLATE_DIR);
      expect(argv.outputDir).to.be.equal(DEFAULT_OUTPUT_DIR);
      const website: Website = new Website();
      expect(website.websiteURL.sitemapURL.toString()).to.equal(SPECIFIC_URL);
    });
  });
  it('parse with templateDir option should have specific template directory argument and other default arguments', () => {
    setChaiAsPromised();
    mockArgs(['--templateDir', `"${SPECIFIC_DIR}"`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.sitemapUrl).to.be.equal(DEFAULT_SITEMAP_URL);
      expect(argv.templateDir).to.be.equal(SPECIFIC_DIR);
      expect(argv.outputDir).to.be.equal(DEFAULT_OUTPUT_DIR);
    });
  });
  it('parse with outputDir option should have specific output directory argument and other default arguments', () => {
    setChaiAsPromised();
    mockArgs(['--outputDir', `"${SPECIFIC_DIR}"`]);
    const cli = new Website2PdfCli();
    return cli.parse().then(argv => {
      expect(argv.sitemapUrl).to.be.equal(DEFAULT_SITEMAP_URL);
      expect(argv.templateDir).to.be.equal(DEFAULT_TEMPLATE_DIR);
      expect(argv.outputDir).to.be.equal(SPECIFIC_DIR);
    });
  });
});
