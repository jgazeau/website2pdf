import 'reflect-metadata';
import {expect} from 'chai';
import {Website} from '../../src/model/website';
import {setChaiAsPromised} from '../testUtils/helpers';
import {Website2PdfError} from '../../src/model/website2pdfError';
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
  DEFAULT_SITEMAP_URL_EN,
  DEFAULT_SITEMAP_URL_FR,
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
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, 'sitemapindex.xml'),
      new AxiosMethodStub(DEFAULT_SITEMAP_URL_EN, 'sitemap_en.xml'),
      new AxiosMethodStub(DEFAULT_SITEMAP_URL_FR, 'sitemap_fr.xml'),
    ]);
    const website: Website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(2);
      website.sitemaps.forEach(sitemap => {
        expect(sitemap.lang).to.be.oneOf(['en', 'fr']);
        expect(sitemap.urls).to.have.length(3);
        sitemap.urls.forEach(url => {
          expect(url.toString()).to.be.oneOf([
            `${DEFAULT_SITEMAP_HOST}/`,
            `${DEFAULT_SITEMAP_HOST}/${sitemap.lang}/absolute/url/`,
            `${DEFAULT_SITEMAP_HOST}/${sitemap.lang}/relative/url/`,
          ]);
        });
      });
    });
  });
  it('Website model should build and populate sitemap when standard sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, 'sitemap.xml'),
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
            `${DEFAULT_SITEMAP_HOST}/absolute/url/`,
            `${DEFAULT_SITEMAP_HOST}/relative/url/`,
          ]);
        });
      });
    });
  });
  it('Website model should throw a Website2PdfError when unknown sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, 'sitemap_unknown.xml'),
    ]);
    const website: Website = new Website();
    return expect(website.build()).to.eventually.be.rejectedWith(
      Website2PdfError
    );
  });
  it('Website model should build and populate sitemap when empty sitemapindex', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, 'sitemapindex_empty.xml'),
    ]);
    const website: Website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(0);
    });
  });
  it('Website model should build and populate sitemap when empty sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(DEFAULT_SITEMAP_URL, 'sitemap_empty.xml'),
    ]);
    const website: Website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(0);
    });
  });
});
