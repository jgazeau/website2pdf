import 'reflect-metadata';
import {expect} from 'chai';
import {Website} from '../../src/model/website';
import {setChaiAsPromised} from '../testUtils/helpers';
import {
  ERROR_UNKNOWN_XML_SCHEMA,
  Website2PdfError,
} from '../../src/model/website2pdfError';
import {
  SITEMAP_EN_ABSURL,
  SITEMAP_FR_ABSURL,
  SITEMAP_EXTENDED_PAGE,
  SITEMAP_EN_PAGE,
  SITEMAP_FR_PAGE,
  SITEMAP_UNKNOWN_PAGE,
  SITEMAP_INVALID_PAGE,
  SITEMAP_EMPTY_PAGE,
  SITEMAPINDEX_EMPTY_PAGE,
  SITEMAP_STANDARD_PAGE,
  ABSOLUTE_URL,
  RELATIVE_URL,
} from '../testUtils/const';
import {
  AxiosMethodStub,
  createSandbox,
  restoreSandbox,
  setAxiosStub,
} from '../testUtils/sinonStubs';
import {
  DEFAULT_SITEMAP_LANG,
  DEFAULT_SITEMAP_HOST,
  DEFAULT_SITEMAP_URL,
} from '../../src/utils/const';

describe('Website model tests', () => {
  beforeEach(() => {
    createSandbox();
  });
  afterEach(() => {
    restoreSandbox();
  });
  it('Website model should use default sitemapUrl', () => {
    const website: Website = new Website();
    expect(website.websiteURL.sitemapURL.toString()).to.equal(
      DEFAULT_SITEMAP_URL
    );
  });
  it('Website model should build and populate sitemaps when extended sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, SITEMAP_EXTENDED_PAGE),
      new AxiosMethodStub(SITEMAP_EN_ABSURL, SITEMAP_EN_PAGE),
      new AxiosMethodStub(SITEMAP_FR_ABSURL, SITEMAP_FR_PAGE),
    ]);
    const website: Website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(2);
      website.sitemaps.forEach(sitemap => {
        expect(sitemap.lang).to.be.oneOf(['en', 'fr']);
        expect(sitemap.urls).to.have.length(3);
        sitemap.urls.forEach(url => {
          expect(url.toString()).to.be.oneOf([
            `${DEFAULT_SITEMAP_HOST}/${sitemap.lang}/`,
            `${DEFAULT_SITEMAP_HOST}/${sitemap.lang}/${ABSOLUTE_URL}`,
            `${DEFAULT_SITEMAP_HOST}/${sitemap.lang}/${RELATIVE_URL}`,
          ]);
        });
      });
    });
  });
  it('Website model should build and populate sitemap when standard sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, SITEMAP_STANDARD_PAGE),
    ]);
    const website: Website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(1);
      website.sitemaps.forEach(sitemap => {
        expect(sitemap.lang).to.be.equal(DEFAULT_SITEMAP_LANG);
        expect(sitemap.urls).to.have.length(3);
        sitemap.urls.forEach(url => {
          expect(url.toString()).to.be.oneOf([
            `${DEFAULT_SITEMAP_HOST}/`,
            `${DEFAULT_SITEMAP_HOST}/${ABSOLUTE_URL}`,
            `${DEFAULT_SITEMAP_HOST}/${RELATIVE_URL}`,
          ]);
        });
      });
    });
  });
  it('Website model should throw a Website2PdfError when unknown sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, SITEMAP_UNKNOWN_PAGE),
    ]);
    const website: Website = new Website();
    return expect(website.build()).to.eventually.be.rejectedWith(
      Website2PdfError,
      ERROR_UNKNOWN_XML_SCHEMA
    );
  });
  it('Website model should throw a Website2PdfError when invalid xml', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, SITEMAP_INVALID_PAGE),
    ]);
    const website: Website = new Website();
    return expect(website.build()).to.eventually.be.rejectedWith(
      Website2PdfError,
      ERROR_UNKNOWN_XML_SCHEMA
    );
  });
  it('Website model should build and populate sitemap when empty sitemapindex', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, SITEMAPINDEX_EMPTY_PAGE),
    ]);
    const website: Website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(0);
    });
  });
  it('Website model should build and populate sitemap when empty sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, SITEMAP_EMPTY_PAGE),
    ]);
    const website: Website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(1);
    });
  });
});
