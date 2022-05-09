import * as path from 'path';
import * as fs from 'fs-extra';
import {expect} from 'chai';
import {Website2Pdf} from '../src/website2pdf';
import {PrintResults} from '../src/utils/stats';
import {SinonStubs} from './testUtils/sinonStubs';
import {TestRequest, TestServer} from './testUtils/httpTestServer';
import {
  cleanTestTempDirectory,
  mockArgs,
  setChaiAsPromised,
} from './testUtils/helpers';
import {
  DEFAULT_SITEMAP_HOST,
  DEFAULT_SITEMAP_NAME,
  DEFAULT_TEMPLATE_DIR,
} from '../src/utils/const';
import {
  ABSOLUTE_URL,
  EN_ABSOLUTE_PAGE,
  EN_ABSOLUTE_URL,
  EN_HOMEPAGE_PAGE,
  EN_HOMEPAGE_URL,
  EN_RELATIVE_PAGE,
  EN_RELATIVE_URL,
  FR_ABSOLUTE_PAGE,
  FR_ABSOLUTE_URL,
  FR_HOMEPAGE_PAGE,
  FR_HOMEPAGE_URL,
  FR_RELATIVE_PAGE,
  FR_RELATIVE_URL,
  RELATIVE_URL,
  rootPath,
  SITEMAPINDEX_EMPTY_URL_PAGE,
  SITEMAPINDEX_EMPTY_URL_RELURL,
  SITEMAPINDEX_EMPTY_PAGE,
  SITEMAPINDEX_EMPTY_RELURL,
  SITEMAP_EMPTY_PAGE,
  SITEMAP_EMPTY_RELURL,
  SITEMAP_EN_PAGE,
  SITEMAP_EN_RELURL,
  SITEMAP_EXTENDED_PAGE,
  SITEMAP_EXTENDED_RELURL,
  SITEMAP_FR_PAGE,
  SITEMAP_FR_RELURL,
  SITEMAP_STANDARD_PAGE,
  testTemplatesPath,
  testTempPath,
  testTemplatesMetaPath,
  testTemplatesImagePath,
  testOutputDir,
  EN_HOMEPAGE_FILENAME,
  EN_RELATIVE_FILENAME,
  EN_ABSOLUTE_FILENAME,
  FR_ABSOLUTE_FILENAME,
  FR_HOMEPAGE_FILENAME,
  FR_RELATIVE_FILENAME,
} from './testUtils/const';

const testRequests: TestRequest[] = [
  new TestRequest(
    `/${DEFAULT_SITEMAP_NAME}`,
    SITEMAP_STANDARD_PAGE,
    'application/xml'
  ),
  new TestRequest('/', EN_HOMEPAGE_PAGE),
  new TestRequest(`/${ABSOLUTE_URL}/`, EN_ABSOLUTE_PAGE),
  new TestRequest(`/${RELATIVE_URL}/`, EN_RELATIVE_PAGE),
  new TestRequest(
    `/${SITEMAP_EXTENDED_RELURL}`,
    SITEMAP_EXTENDED_PAGE,
    'application/xml'
  ),
  new TestRequest(`/${SITEMAP_EN_RELURL}`, SITEMAP_EN_PAGE, 'application/xml'),
  new TestRequest(`/${SITEMAP_FR_RELURL}`, SITEMAP_FR_PAGE, 'application/xml'),
  new TestRequest(
    `/${SITEMAP_EMPTY_RELURL}`,
    SITEMAP_EMPTY_PAGE,
    'application/xml'
  ),
  new TestRequest(
    `/${SITEMAPINDEX_EMPTY_RELURL}`,
    SITEMAPINDEX_EMPTY_PAGE,
    'application/xml'
  ),
  new TestRequest(
    `/${SITEMAPINDEX_EMPTY_URL_RELURL}`,
    SITEMAPINDEX_EMPTY_URL_PAGE,
    'application/xml'
  ),
  new TestRequest(`/${EN_HOMEPAGE_URL}/`, EN_HOMEPAGE_PAGE),
  new TestRequest(`/${EN_ABSOLUTE_URL}/`, EN_ABSOLUTE_PAGE),
  new TestRequest(`/${EN_RELATIVE_URL}/`, EN_RELATIVE_PAGE),
  new TestRequest(`/${FR_HOMEPAGE_URL}/`, FR_HOMEPAGE_PAGE),
  new TestRequest(`/${FR_ABSOLUTE_URL}/`, FR_ABSOLUTE_PAGE),
  new TestRequest(`/${FR_RELATIVE_URL}/`, FR_RELATIVE_PAGE),
];
const testServer = new TestServer(testRequests);

describe('Website2pdf tests', () => {
  const sinonMock = new SinonStubs({});
  before(() => {
    return testServer.start();
  });
  after(() => {
    return testServer.close();
  });
  beforeEach(() => {
    PrintResults.results = [];
    cleanTestTempDirectory();
    process.chdir(rootPath);
    sinonMock.logger = true;
    sinonMock.consoleLog = true;
    sinonMock.sinonSetStubs();
  });
  afterEach(() => {
    sinonMock.sinonRestoreStubs();
  });
  it('website2pdf should not create any file when empty standard sitemap', () => {
    setChaiAsPromised();
    mockArgs([
      '--sitemapUrl',
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EMPTY_RELURL}`,
    ]);
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return fs.pathExists(testOutputDir).then(isDirExists => {
        expect(isDirExists).to.be.false;
      });
    });
  });
  it('website2pdf should not create any file when empty extended sitemap', () => {
    setChaiAsPromised();
    mockArgs([
      '--sitemapUrl',
      `${DEFAULT_SITEMAP_HOST}/${SITEMAPINDEX_EMPTY_RELURL}`,
    ]);
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return fs.pathExists(testOutputDir).then(isDirExists => {
        expect(isDirExists).to.be.false;
      });
    });
  });
  it('website2pdf should not create any file when extended sitemap with empty standard sitemap', () => {
    setChaiAsPromised();
    mockArgs([
      '--sitemapUrl',
      `${DEFAULT_SITEMAP_HOST}/${SITEMAPINDEX_EMPTY_URL_RELURL}`,
    ]);
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return fs.pathExists(testOutputDir).then(isDirExists => {
        expect(isDirExists).to.be.false;
      });
    });
  });
  it('website2pdf should work', () => {
    setChaiAsPromised();
    mockArgs([]);
    const expectedFiles = [
      EN_HOMEPAGE_FILENAME,
      path.join(ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(RELATIVE_URL, EN_RELATIVE_FILENAME),
    ];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      assertExpectedFilesExists(expectedFiles);
    });
  });
  it('website2pdf should work when standard sitemap and displayHeaderFooter', () => {
    setChaiAsPromised();
    mockArgs(['--displayHeaderFooter']);
    const expectedFiles = [
      EN_HOMEPAGE_FILENAME,
      path.join(ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(RELATIVE_URL, EN_RELATIVE_FILENAME),
    ];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      assertExpectedFilesExists(expectedFiles);
    });
  });
  it('website2pdf should work when extended sitemap and displayHeaderFooter', () => {
    setChaiAsPromised();
    mockArgs([
      '--displayHeaderFooter',
      '--sitemapUrl',
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_RELURL}`,
    ]);
    const expectedFiles = [
      path.join(EN_HOMEPAGE_URL, EN_HOMEPAGE_FILENAME),
      path.join(EN_ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(EN_RELATIVE_URL, EN_RELATIVE_FILENAME),
      path.join(FR_HOMEPAGE_URL, FR_HOMEPAGE_FILENAME),
      path.join(FR_ABSOLUTE_URL, FR_ABSOLUTE_FILENAME),
      path.join(FR_RELATIVE_URL, FR_RELATIVE_FILENAME),
    ];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      assertExpectedFilesExists(expectedFiles);
    });
  });
  it('website2pdf should work when standard sitemap, displayHeaderFooter and header/footer from default templateDir', () => {
    setChaiAsPromised();
    mockArgs(['--displayHeaderFooter']);
    fs.copySync(
      testTemplatesPath,
      path.join(testTempPath, DEFAULT_TEMPLATE_DIR)
    );
    const expectedFiles = [
      EN_HOMEPAGE_FILENAME,
      path.join(ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(RELATIVE_URL, EN_RELATIVE_FILENAME),
    ];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      assertExpectedFilesExists(expectedFiles);
    });
  });
  it('website2pdf should work when extended sitemap, displayHeaderFooter, header/footer from specific templateDir and specific outputDir', () => {
    setChaiAsPromised();
    mockArgs([
      '--displayHeaderFooter',
      '--sitemapUrl',
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_RELURL}`,
      '--templateDir',
      `${testTemplatesPath}`,
      '--outputDir',
      `${testTempPath}`,
    ]);
    const expectedFiles = [
      path.join(EN_HOMEPAGE_URL, EN_HOMEPAGE_FILENAME),
      path.join(EN_ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(EN_RELATIVE_URL, EN_RELATIVE_FILENAME),
      path.join(FR_HOMEPAGE_URL, FR_HOMEPAGE_FILENAME),
      path.join(FR_ABSOLUTE_URL, FR_ABSOLUTE_FILENAME),
      path.join(FR_RELATIVE_URL, FR_RELATIVE_FILENAME),
    ];
    return Website2Pdf.main().then(() => {
      assertExpectedFilesExists(expectedFiles);
    });
  });
  it('website2pdf should work when extended sitemap, displayHeaderFooter, header/footer with metadatas from specific templateDir', () => {
    setChaiAsPromised();
    mockArgs([
      '--displayHeaderFooter',
      '--sitemapUrl',
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_RELURL}`,
      '--templateDir',
      `${testTemplatesMetaPath}`,
      '--outputDir',
      `${testTempPath}`,
    ]);
    const expectedFiles = [
      path.join(EN_HOMEPAGE_URL, EN_HOMEPAGE_FILENAME),
      path.join(EN_ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(EN_RELATIVE_URL, EN_RELATIVE_FILENAME),
      path.join(FR_HOMEPAGE_URL, FR_HOMEPAGE_FILENAME),
      path.join(FR_ABSOLUTE_URL, FR_ABSOLUTE_FILENAME),
      path.join(FR_RELATIVE_URL, FR_RELATIVE_FILENAME),
    ];
    return Website2Pdf.main().then(() => {
      assertExpectedFilesExists(expectedFiles);
    });
  });
  it('website2pdf should work when extended sitemap, displayHeaderFooter, header/footer with image from specific templateDir', () => {
    setChaiAsPromised();
    mockArgs([
      '--displayHeaderFooter',
      '--sitemapUrl',
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_RELURL}`,
      '--templateDir',
      `${testTemplatesImagePath}`,
      '--outputDir',
      `${testTempPath}`,
    ]);
    const expectedFiles = [
      path.join(EN_HOMEPAGE_URL, EN_HOMEPAGE_FILENAME),
      path.join(EN_ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(EN_RELATIVE_URL, EN_RELATIVE_FILENAME),
      path.join(FR_HOMEPAGE_URL, FR_HOMEPAGE_FILENAME),
      path.join(FR_ABSOLUTE_URL, FR_ABSOLUTE_FILENAME),
      path.join(FR_RELATIVE_URL, FR_RELATIVE_FILENAME),
    ];
    return Website2Pdf.main().then(() => {
      assertExpectedFilesExists(expectedFiles);
    });
  });
  it('website2pdf should work when standard sitemap and chromiumFlags', () => {
    setChaiAsPromised();
    mockArgs(['--chromiumFlags="--disable-dev-shm-usage"']);
    const expectedFiles = [
      EN_HOMEPAGE_FILENAME,
      path.join(ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(RELATIVE_URL, EN_RELATIVE_FILENAME),
    ];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      assertExpectedFilesExists(expectedFiles);
    });
  });
});

function assertExpectedFilesExists(files: string[]) {
  return fs.pathExists(testOutputDir).then(isDirExists => {
    expect(isDirExists).to.be.true;
    return Promise.all(
      files.map(file => {
        return fs
          .pathExists(path.join(testOutputDir, file))
          .then(isFileExists => {
            expect(isFileExists).to.be.true;
          });
      })
    );
  });
}
