import {expect} from 'chai';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  CHROMIUM_FLAGS_OPTION,
  DEFAULT_MERGED_PDF,
  DEFAULT_OUTPUT_URL_TO_FILENAME_MAP,
  DEFAULT_SITEMAP_HOST,
  DEFAULT_SITEMAP_NAME,
  DEFAULT_TEMPLATE_DIR,
  DISPLAY_HEADER_FOOTER_OPTION,
  EXCLUDE_URLS_OPTION,
  MERGE_ALL_OPTION,
  OUTPUT_DIR_OPTION,
  OUTPUT_FILE_NAME_URL_MAP_OPTION,
  SAFE_TITLE_OPTION,
  SITEMAP_URL_OPTION,
  TEMPLATE_DIR_OPTION,
  URL_TITLE_OPTION,
  WAIT_UNTIL_OPTION,
} from '../src/utils/const';
import {PrintResults} from '../src/utils/stats';
import {Website2Pdf} from '../src/website2pdf';
import {
  ABSOLUTE_URL,
  ABSOLUTE_URL_TITLE,
  ABSOLUTE_URL_TITLE_FILENAME,
  EN_ABSOLUTE_FILENAME,
  EN_ABSOLUTE_SAFE_FILENAME,
  EN_ABSOLUTE_URL,
  EN_HOMEPAGE_FILENAME,
  EN_HOMEPAGE_SAFE_FILENAME,
  EN_HOMEPAGE_URL,
  EN_RELATIVE_FILENAME,
  EN_RELATIVE_SAFE_FILENAME,
  EN_RELATIVE_URL,
  FR_ABSOLUTE_FILENAME,
  FR_ABSOLUTE_URL,
  FR_HOMEPAGE_FILENAME,
  FR_HOMEPAGE_URL,
  FR_RELATIVE_FILENAME,
  FR_RELATIVE_URL,
  HTML_DUMMY_FILE,
  HTML_EN_ABSOLUTE_FILE,
  HTML_EN_HOMEPAGE_FILE,
  HTML_EN_RELATIVE_FILE,
  HTML_FR_ABSOLUTE_FILE,
  HTML_FR_HOMEPAGE_FILE,
  HTML_FR_RELATIVE_FILE,
  HTML_WAIT_UNTIL_FILE,
  RELATIVE_URL,
  RELATIVE_URL_TITLE,
  RELATIVE_URL_TITLE_FILENAME,
  SITEMAPINDEX_EMPTY_FILE,
  SITEMAPINDEX_EMPTY_FILENAME,
  SITEMAPINDEX_EMPTY_URL_FILE,
  SITEMAPINDEX_EMPTY_URL_FILENAME,
  SITEMAP_EMPTY_FILE,
  SITEMAP_EMPTY_FILENAME,
  SITEMAP_EN_FILE,
  SITEMAP_EN_RELURL,
  SITEMAP_EXTENDED_FILE,
  SITEMAP_EXTENDED_FILENAME,
  SITEMAP_FR_FILE,
  SITEMAP_FR_RELURL,
  SITEMAP_STANDARD,
  SITEMAP_URL_TITLE_OPTION_FILE,
  SITEMAP_URL_TITLE_OPTION_FILENAME,
  SITEMAP_WAIT_UNTIL_FILE,
  SITEMAP_WAIT_UNTIL_FILENAME,
  SPECIFIC_CHROMIUM_DISABLE_DEV_SHM_USAGE,
  SPECIFIC_EXCLUDE_REGEX,
  SPECIFIC_WAIT_UNTIL,
  WAIT_UNTIL_FILENAME,
  WAIT_UNTIL_URL_TITLE,
  rootPath,
  testOutputDir,
  testTempPath,
  testTemplatesImagePath,
  testTemplatesMetaPath,
  testTemplatesPath,
} from './testUtils/const';
import {
  cleanTestTempDirectory,
  mockArgs,
  setChaiAsPromised,
} from './testUtils/helpers';
import {TestRequest, TestServer} from './testUtils/httpTestServer';
import {SinonStubs} from './testUtils/sinonStubs';

const testRequests: TestRequest[] = [
  new TestRequest(
    `/${DEFAULT_SITEMAP_NAME}`,
    SITEMAP_STANDARD,
    'application/xml'
  ),
  new TestRequest('/', HTML_EN_HOMEPAGE_FILE),
  new TestRequest(`/${ABSOLUTE_URL}/`, HTML_EN_ABSOLUTE_FILE),
  new TestRequest(`/${RELATIVE_URL}/`, HTML_EN_RELATIVE_FILE),
  new TestRequest(
    `/${SITEMAP_EXTENDED_FILENAME}`,
    SITEMAP_EXTENDED_FILE,
    'application/xml'
  ),
  new TestRequest(`/${SITEMAP_EN_RELURL}`, SITEMAP_EN_FILE, 'application/xml'),
  new TestRequest(`/${SITEMAP_FR_RELURL}`, SITEMAP_FR_FILE, 'application/xml'),
  new TestRequest(
    `/${SITEMAP_EMPTY_FILENAME}`,
    SITEMAP_EMPTY_FILE,
    'application/xml'
  ),
  new TestRequest(
    `/${SITEMAPINDEX_EMPTY_FILENAME}`,
    SITEMAPINDEX_EMPTY_FILE,
    'application/xml'
  ),
  new TestRequest(
    `/${SITEMAPINDEX_EMPTY_URL_FILENAME}`,
    SITEMAPINDEX_EMPTY_URL_FILE,
    'application/xml'
  ),
  new TestRequest(
    `/${SITEMAP_WAIT_UNTIL_FILENAME}`,
    SITEMAP_WAIT_UNTIL_FILE,
    'application/xml'
  ),
  new TestRequest(`/${EN_HOMEPAGE_URL}/`, HTML_EN_HOMEPAGE_FILE),
  new TestRequest(`/${EN_ABSOLUTE_URL}/`, HTML_EN_ABSOLUTE_FILE),
  new TestRequest(`/${EN_RELATIVE_URL}/`, HTML_EN_RELATIVE_FILE),
  new TestRequest(`/${FR_HOMEPAGE_URL}/`, HTML_FR_HOMEPAGE_FILE),
  new TestRequest(`/${FR_ABSOLUTE_URL}/`, HTML_FR_ABSOLUTE_FILE),
  new TestRequest(`/${FR_RELATIVE_URL}/`, HTML_FR_RELATIVE_FILE),
  new TestRequest(
    `/${SITEMAP_URL_TITLE_OPTION_FILENAME}`,
    SITEMAP_URL_TITLE_OPTION_FILE,
    'application/xml'
  ),
  new TestRequest(`/${ABSOLUTE_URL_TITLE}`, HTML_DUMMY_FILE),
  new TestRequest(`/${RELATIVE_URL_TITLE}`, HTML_DUMMY_FILE),
  new TestRequest(`/${WAIT_UNTIL_URL_TITLE}`, HTML_WAIT_UNTIL_FILE),
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
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EMPTY_FILENAME}`,
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
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAPINDEX_EMPTY_FILENAME}`,
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
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAPINDEX_EMPTY_URL_FILENAME}`,
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
      return assertExpectedFilesExists(expectedFiles);
    });
  });
  it(`website2pdf should work when standard sitemap and ${DISPLAY_HEADER_FOOTER_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([`--${DISPLAY_HEADER_FOOTER_OPTION}`]);
    const expectedFiles = [
      EN_HOMEPAGE_FILENAME,
      path.join(ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(RELATIVE_URL, EN_RELATIVE_FILENAME),
    ];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return assertExpectedFilesExists(expectedFiles);
    });
  });
  it(`website2pdf should work when extended sitemap and ${DISPLAY_HEADER_FOOTER_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([
      `--${DISPLAY_HEADER_FOOTER_OPTION}`,
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_FILENAME}`,
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
      return assertExpectedFilesExists(expectedFiles);
    });
  });
  it(`website2pdf should work when standard sitemap, ${DISPLAY_HEADER_FOOTER_OPTION} and header/footer from default ${TEMPLATE_DIR_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([`--${DISPLAY_HEADER_FOOTER_OPTION}`]);
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
      return assertExpectedFilesExists(expectedFiles);
    });
  });
  it(`website2pdf should work when extended sitemap, ${DISPLAY_HEADER_FOOTER_OPTION}, header/footer from specific ${TEMPLATE_DIR_OPTION} and specific ${OUTPUT_DIR_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([
      `--${DISPLAY_HEADER_FOOTER_OPTION}`,
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_FILENAME}`,
      `--${TEMPLATE_DIR_OPTION}`,
      `${testTemplatesPath}`,
      `--${OUTPUT_DIR_OPTION}`,
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
      return assertExpectedFilesExists(expectedFiles, testTempPath);
    });
  });
  it(`website2pdf should work when extended sitemap, ${DISPLAY_HEADER_FOOTER_OPTION}, header/footer with metadatas from specific ${TEMPLATE_DIR_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([
      `--${DISPLAY_HEADER_FOOTER_OPTION}`,
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_FILENAME}`,
      `--${TEMPLATE_DIR_OPTION}`,
      `${testTemplatesMetaPath}`,
      `--${OUTPUT_DIR_OPTION}`,
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
      return assertExpectedFilesExists(expectedFiles, testTempPath);
    });
  });
  it(`website2pdf should work when extended sitemap, ${DISPLAY_HEADER_FOOTER_OPTION}, header/footer with image from specific ${TEMPLATE_DIR_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([
      `--${DISPLAY_HEADER_FOOTER_OPTION}`,
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_FILENAME}`,
      `--${TEMPLATE_DIR_OPTION}`,
      `${testTemplatesImagePath}`,
      `--${OUTPUT_DIR_OPTION}`,
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
      return assertExpectedFilesExists(expectedFiles, testTempPath);
    });
  });
  it(`website2pdf should work when standard sitemap and ${CHROMIUM_FLAGS_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([
      `--${CHROMIUM_FLAGS_OPTION}=${SPECIFIC_CHROMIUM_DISABLE_DEV_SHM_USAGE}`,
    ]);
    const expectedFiles = [
      EN_HOMEPAGE_FILENAME,
      path.join(ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(RELATIVE_URL, EN_RELATIVE_FILENAME),
    ];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return assertExpectedFilesExists(expectedFiles);
    });
  });
  it(`website2pdf should work when extended sitemap and ${EXCLUDE_URLS_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_FILENAME}`,
      `--${EXCLUDE_URLS_OPTION}`,
      `${SPECIFIC_EXCLUDE_REGEX}`,
    ]);
    const expectedFiles = [
      path.join(EN_HOMEPAGE_URL, EN_HOMEPAGE_FILENAME),
      path.join(EN_ABSOLUTE_URL, EN_ABSOLUTE_FILENAME),
      path.join(EN_RELATIVE_URL, EN_RELATIVE_FILENAME),
    ];
    const nonExpectedFiles = [
      path.join(FR_HOMEPAGE_URL, FR_HOMEPAGE_FILENAME),
      path.join(FR_ABSOLUTE_URL, FR_ABSOLUTE_FILENAME),
      path.join(FR_RELATIVE_URL, FR_RELATIVE_FILENAME),
    ];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return assertExpectedFilesExists(expectedFiles).then(() => {
        return assertExpectedFilesDoesntExists(nonExpectedFiles);
      });
    });
  });
  it(`website2pdf should work when ${SAFE_TITLE_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([`--${SAFE_TITLE_OPTION}`]);
    const expectedFiles = [
      EN_HOMEPAGE_SAFE_FILENAME,
      path.join(ABSOLUTE_URL, EN_ABSOLUTE_SAFE_FILENAME),
      path.join(RELATIVE_URL, EN_RELATIVE_SAFE_FILENAME),
    ];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return assertExpectedFilesExists(expectedFiles);
    });
  });
  it(`website2pdf should work when ${URL_TITLE_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([
      `--${URL_TITLE_OPTION}`,
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_URL_TITLE_OPTION_FILENAME}`,
    ]);
    const expectedFiles = [
      ABSOLUTE_URL_TITLE_FILENAME,
      RELATIVE_URL_TITLE_FILENAME,
    ];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return assertExpectedFilesExists(expectedFiles);
    });
  });
  it(`website2pdf should create ${DEFAULT_OUTPUT_URL_TO_FILENAME_MAP} file when ${OUTPUT_FILE_NAME_URL_MAP_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([
      `--${OUTPUT_FILE_NAME_URL_MAP_OPTION}`,
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_FILENAME}`,
    ]);
    const expectedFiles = [DEFAULT_OUTPUT_URL_TO_FILENAME_MAP];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return assertExpectedFilesExists(expectedFiles);
    });
  });
  it(`website2pdf should create ${DEFAULT_MERGED_PDF} file when ${MERGE_ALL_OPTION}`, () => {
    setChaiAsPromised();
    mockArgs([
      `--${MERGE_ALL_OPTION}`,
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EXTENDED_FILENAME}`,
    ]);
    const expectedFiles = [DEFAULT_MERGED_PDF];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return assertExpectedFilesExists(expectedFiles);
    });
  });
  it('website2pdf should wait until', () => {
    setChaiAsPromised();
    mockArgs([
      `--${WAIT_UNTIL_OPTION}=${SPECIFIC_WAIT_UNTIL}`,
      `--${SITEMAP_URL_OPTION}`,
      `${DEFAULT_SITEMAP_HOST}/${SITEMAP_WAIT_UNTIL_FILENAME}`,
    ]);
    const expectedFiles = [WAIT_UNTIL_FILENAME];
    process.chdir(testTempPath);
    return Website2Pdf.main().then(() => {
      return assertExpectedFilesExists(expectedFiles);
    });
  });
});

function assertExpectedFilesExists(
  files: string[],
  outputDir: string = testOutputDir
) {
  return fs.pathExists(outputDir).then(isDirExists => {
    expect(isDirExists).to.be.true;
    return Promise.all(
      files.map(file => {
        return fs.pathExists(path.join(outputDir, file));
      })
    ).then((values: boolean[]) => {
      values.forEach(value => {
        expect(value).to.be.true;
      });
    });
  });
}

function assertExpectedFilesDoesntExists(
  files: string[],
  outputDir: string = testOutputDir
) {
  return fs.pathExists(outputDir).then(isDirExists => {
    expect(isDirExists).to.be.true;
    return Promise.all(
      files.map(file => {
        return fs.pathExists(path.join(outputDir, file));
      })
    ).then((values: boolean[]) => {
      values.forEach(value => {
        expect(value).to.be.false;
      });
    });
  });
}
