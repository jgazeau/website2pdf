/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {expect} from 'chai';
import * as fs from 'fs-extra';
import * as path from 'path';
import 'reflect-metadata';
import {Website} from '../../src/model/website';
import {
  ERROR_UNKNOWN_XML_SCHEMA,
  Website2PdfError,
} from '../../src/model/website2pdfError';
import {
  DEFAULT_SITEMAP_HOST,
  DEFAULT_SITEMAP_NAME,
  DEFAULT_SITEMAP_URL,
  SERVE_SITEMAP_OPTION,
  SITEMAP_URL_OPTION,
} from '../../src/utils/const';
import {
  ABSOLUTE_URL,
  DUMMY_CLIARGS,
  EN_HOMEPAGE_URL,
  FR_HOMEPAGE_URL,
  RELATIVE_URL,
  SITEMAPINDEX_EMPTY_FILE,
  SITEMAPINDEX_SINGLE_ENTRY_FILE,
  SITEMAP_EMPTY_FILE,
  SITEMAP_EN_ABSURL,
  SITEMAP_EN_FILE,
  SITEMAP_EXTENDED_FILE,
  SITEMAP_FR_ABSURL,
  SITEMAP_FR_FILE,
  SITEMAP_INVALID_FILE,
  SITEMAP_SINGLE_ENTRY_FILE,
  SITEMAP_STANDARD,
  SITEMAP_UNKNOWN_FILE,
  testResourcesPath,
} from '../testUtils/const';
import {setChaiAsPromised} from '../testUtils/helpers';
import {
  AxiosMethodStub,
  createSandbox,
  restoreSandbox,
  setAxiosStub,
} from '../testUtils/sinonStubs';

describe('Website model tests', () => {
  let website: Website;
  beforeEach(() => {
    createSandbox();
  });
  afterEach(done => {
    restoreSandbox();
    website ? website.postActions().then(done) : done();
  });
  it(`Website model should use default ${SITEMAP_URL_OPTION}`, () => {
    website = new Website();
    expect(website.websiteURL.sitemapURL.toString()).to.equal(
      DEFAULT_SITEMAP_URL
    );
  });
  it('Website model should build and populate sitemaps when extended sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(
        DEFAULT_SITEMAP_URL,
        fs.readFileSync(SITEMAP_EXTENDED_FILE, 'utf8')
      ),
      new AxiosMethodStub(
        SITEMAP_EN_ABSURL,
        fs.readFileSync(SITEMAP_EN_FILE, 'utf8')
      ),
      new AxiosMethodStub(
        SITEMAP_FR_ABSURL,
        fs.readFileSync(SITEMAP_FR_FILE, 'utf8')
      ),
    ]);
    website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(2);
      expect(website.sitemaps[0].rootUrl.toString()).to.be.equal(
        SITEMAP_EN_ABSURL
      );
      expect(website.sitemaps[0].urls).to.have.length(3);
      website.sitemaps[0].urls.forEach(url => {
        expect(url.toString()).to.be.oneOf([
          `${DEFAULT_SITEMAP_HOST}/${EN_HOMEPAGE_URL}/`,
          `${DEFAULT_SITEMAP_HOST}/${EN_HOMEPAGE_URL}/${ABSOLUTE_URL}/`,
          `${DEFAULT_SITEMAP_HOST}/${EN_HOMEPAGE_URL}/${RELATIVE_URL}/`,
        ]);
      });
      expect(website.sitemaps[1].rootUrl.toString()).to.be.equal(
        SITEMAP_FR_ABSURL
      );
      expect(website.sitemaps[1].urls).to.have.length(3);
      website.sitemaps[1].urls.forEach(url => {
        expect(url.toString()).to.be.oneOf([
          `${DEFAULT_SITEMAP_HOST}/${FR_HOMEPAGE_URL}/`,
          `${DEFAULT_SITEMAP_HOST}/${FR_HOMEPAGE_URL}/${ABSOLUTE_URL}/`,
          `${DEFAULT_SITEMAP_HOST}/${FR_HOMEPAGE_URL}/${RELATIVE_URL}/`,
        ]);
      });
    });
  });
  it('Website model should build and populate sitemap when standard sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(
        DEFAULT_SITEMAP_URL,
        fs.readFileSync(SITEMAP_STANDARD, 'utf8')
      ),
    ]);
    website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(1);
      expect(website.sitemaps[0].rootUrl.toString()).to.be.equal(
        DEFAULT_SITEMAP_URL
      );
      expect(website.sitemaps[0].urls).to.have.length(3);
      website.sitemaps[0].urls.forEach(url => {
        expect(url.toString()).to.be.oneOf([
          `${DEFAULT_SITEMAP_HOST}/`,
          `${DEFAULT_SITEMAP_HOST}/${ABSOLUTE_URL}/`,
          `${DEFAULT_SITEMAP_HOST}/${RELATIVE_URL}/`,
        ]);
      });
    });
  });
  it('Website model should build and populate sitemap when single entry sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(
        DEFAULT_SITEMAP_URL,
        fs.readFileSync(SITEMAP_SINGLE_ENTRY_FILE, 'utf8')
      ),
    ]);
    website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(1);
      expect(website.sitemaps[0].rootUrl.toString()).to.be.equal(
        DEFAULT_SITEMAP_URL
      );
      expect(website.sitemaps[0].urls).to.have.length(1);
      expect(website.sitemaps[0].urls[0].toString()).to.be.equal(
        `${DEFAULT_SITEMAP_HOST}/`
      );
    });
  });
  it('Website model should build and populate sitemaps when single entry sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(
        DEFAULT_SITEMAP_URL,
        fs.readFileSync(SITEMAPINDEX_SINGLE_ENTRY_FILE, 'utf8')
      ),
      new AxiosMethodStub(
        SITEMAP_EN_ABSURL,
        fs.readFileSync(SITEMAP_EN_FILE, 'utf8')
      ),
    ]);
    website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(1);
      expect(website.sitemaps[0].rootUrl.toString()).to.be.equal(
        SITEMAP_EN_ABSURL
      );
      expect(website.sitemaps[0].urls).to.have.length(3);
      website.sitemaps[0].urls.forEach(url => {
        expect(url.toString()).to.be.oneOf([
          `${DEFAULT_SITEMAP_HOST}/${EN_HOMEPAGE_URL}/`,
          `${DEFAULT_SITEMAP_HOST}/${EN_HOMEPAGE_URL}/${ABSOLUTE_URL}/`,
          `${DEFAULT_SITEMAP_HOST}/${EN_HOMEPAGE_URL}/${RELATIVE_URL}/`,
        ]);
      });
    });
  });
  it('Website model should throw a Website2PdfError when unknown sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(
        DEFAULT_SITEMAP_URL,
        fs.readFileSync(SITEMAP_UNKNOWN_FILE, 'utf8')
      ),
    ]);
    website = new Website();
    return expect(website.build()).to.eventually.be.rejectedWith(
      Website2PdfError,
      ERROR_UNKNOWN_XML_SCHEMA
    );
  });
  it('Website model should throw a Website2PdfError when invalid xml', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(
        DEFAULT_SITEMAP_URL,
        fs.readFileSync(SITEMAP_INVALID_FILE, 'utf8')
      ),
    ]);
    website = new Website();
    return expect(website.build()).to.eventually.be.rejectedWith(
      Website2PdfError,
      ERROR_UNKNOWN_XML_SCHEMA
    );
  });
  it('Website model should build and populate sitemap when empty sitemapindex', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(
        DEFAULT_SITEMAP_URL,
        fs.readFileSync(SITEMAPINDEX_EMPTY_FILE, 'utf8')
      ),
    ]);
    website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(0);
    });
  });
  it('Website model should build and populate sitemap when empty sitemap', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(
        DEFAULT_SITEMAP_URL,
        fs.readFileSync(SITEMAP_EMPTY_FILE, 'utf8')
      ),
    ]);
    website = new Website();
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(1);
    });
  });
  it('Website model should build and populate sitemaps when extended sitemap and excluded urls', () => {
    setChaiAsPromised();
    setAxiosStub('get', [
      new AxiosMethodStub(
        DEFAULT_SITEMAP_URL,
        fs.readFileSync(SITEMAP_EXTENDED_FILE, 'utf8')
      ),
      new AxiosMethodStub(
        SITEMAP_EN_ABSURL,
        fs.readFileSync(SITEMAP_EN_FILE, 'utf8')
      ),
      new AxiosMethodStub(
        SITEMAP_FR_ABSURL,
        fs.readFileSync(SITEMAP_FR_FILE, 'utf8')
      ),
    ]);
    website = new Website(DUMMY_CLIARGS);
    return website.build().then(() => {
      expect(website.sitemaps).to.have.length(2);
      expect(website.sitemaps[0].rootUrl.toString()).to.be.equal(
        SITEMAP_EN_ABSURL
      );
      expect(website.sitemaps[0].urls).to.have.length(3);
      website.sitemaps[0].urls.forEach(url => {
        expect(url.toString()).to.be.oneOf([
          `${DEFAULT_SITEMAP_HOST}/${EN_HOMEPAGE_URL}/`,
          `${DEFAULT_SITEMAP_HOST}/${EN_HOMEPAGE_URL}/${ABSOLUTE_URL}/`,
          `${DEFAULT_SITEMAP_HOST}/${EN_HOMEPAGE_URL}/${RELATIVE_URL}/`,
        ]);
      });
      expect(website.sitemaps[1].rootUrl.toString()).to.be.equal(
        SITEMAP_FR_ABSURL
      );
      expect(website.sitemaps[1].urls).to.have.length(0);
    });
  });
  it(`Website model should do nothing when preActions without ${SERVE_SITEMAP_OPTION} option`, () => {
    setChaiAsPromised();
    website = new Website();
    return website.preActions().then(output => {
      expect(output).to.be.undefined;
    });
  });
  it(`Website model should serve local sitemap when preActions with ${SERVE_SITEMAP_OPTION} option`, () => {
    setChaiAsPromised();
    const cliArgs = Object.assign({}, DUMMY_CLIARGS);
    cliArgs.serveSitemap = path.join(testResourcesPath, DEFAULT_SITEMAP_NAME);
    website = new Website(cliArgs);
    return website
      .preActions()
      .then(output => {
        expect(output).to.be.undefined;
      })
      .then(() => {
        return axios.get(DEFAULT_SITEMAP_URL).then((response: any) => {
          expect(response.status).to.equal(200);
          expect(response.data).to.not.be.empty;
        });
      });
  });
  it(`Website model should do nothing when postActions without ${SERVE_SITEMAP_OPTION} option`, () => {
    setChaiAsPromised();
    website = new Website();
    return website.postActions().then(output => {
      expect(output).to.be.undefined;
    });
  });
  it(`Website model should close local server when postActions with ${SERVE_SITEMAP_OPTION} option`, () => {
    setChaiAsPromised();
    const cliArgs = Object.assign({}, DUMMY_CLIARGS);
    cliArgs.serveSitemap = path.join(testResourcesPath, DEFAULT_SITEMAP_NAME);
    website = new Website(cliArgs);
    return website.preActions().then(() => {
      return website
        .postActions()
        .then(output => {
          expect(output).to.be.undefined;
        })
        .then(() => {
          return expect(
            axios.get(DEFAULT_SITEMAP_URL)
          ).to.eventually.be.rejectedWith(Error, 'ECONNREFUSED');
        });
    });
  });
});
