/* c8 ignore start */
import * as path from 'path';
import {ICliArguments} from '../../src/cli/iArgumentsParser';
import {
  DEFAULT_FORMAT,
  DEFAULT_MARGIN_MIN,
  DEFAULT_OUTPUT_DIR,
  DEFAULT_PROCESS_POOL,
  DEFAULT_SITEMAP_HOST,
  DEFAULT_SITEMAP_NAME,
  DEFAULT_SITEMAP_URL,
  DEFAULT_TEMPLATE_DIR,
  DEFAULT_WAIT_UNTIL,
} from '../../src/utils/const';

export const rootPath: string = path.join(process.cwd());
export const testResourcesPath: string = path.join(rootPath, 'test/resources');
export const testTempPath: string = path.join(rootPath, 'test/temp');
export const testOutputDir = path.join(testTempPath, DEFAULT_OUTPUT_DIR);
export const testResourcesImagePath: string = path.join(
  testResourcesPath,
  '/html/static/images'
);
export const testTemplatesPath: string = path.join(
  testResourcesPath,
  DEFAULT_TEMPLATE_DIR
);
export const testTemplatesMetaPath: string = path.join(
  testResourcesPath,
  `${DEFAULT_TEMPLATE_DIR}_meta`
);
export const testTemplatesImagePath: string = path.join(
  testResourcesPath,
  `${DEFAULT_TEMPLATE_DIR}_image`
);
export const SPECIFIC_CHROMIUM_NO_SANDBOX = '--no-sandbox';
export const SPECIFIC_CHROMIUM_DISABLE_DEV_SHM_USAGE =
  '--disable-dev-shm-usage';
export const SPECIFIC_CHROMIUM_HEADLESS = 'true';
export const SPECIFIC_DIR = './aSpecificDir/';
export const SPECIFIC_EXCLUDE_REGEX = '\\/fr\\/';
export const SPECIFIC_FORMAT = 'a3';
export const SPECIFIC_PROCESS_POOL = 20;
export const SPECIFIC_SERVED_SITEMAP = 'anotherSitemap.xml';
export const SPECIFIC_URL = `https://example.com/${DEFAULT_SITEMAP_NAME}`;
export const SPECIFIC_WAIT_UNTIL = 'domcontentloaded,networkidle0';
export const DUMMY_CLIARGS: ICliArguments = {
  _: [],
  $0: '',
  chromiumFlags: '',
  chromiumHeadless: 'shell',
  debug: false,
  displayHeaderFooter: false,
  excludeUrls: SPECIFIC_EXCLUDE_REGEX,
  format: DEFAULT_FORMAT,
  marginBottom: DEFAULT_MARGIN_MIN,
  marginLeft: DEFAULT_MARGIN_MIN,
  marginRight: DEFAULT_MARGIN_MIN,
  marginTop: DEFAULT_MARGIN_MIN,
  mergeAll: false,
  outputDir: DEFAULT_OUTPUT_DIR,
  outputFileNameUrlMap: false,
  processPool: DEFAULT_PROCESS_POOL,
  safeTitle: false,
  serveSitemap: DEFAULT_SITEMAP_NAME,
  sitemapUrl: DEFAULT_SITEMAP_URL,
  templateDir: DEFAULT_TEMPLATE_DIR,
  urlTitle: false,
  waitUntil: DEFAULT_WAIT_UNTIL,
};
//
export const ABSOLUTE_URL = 'absolute/url';
export const RELATIVE_URL = 'relative/url';
export const EN_HOMEPAGE_URL = 'en';
export const EN_ABSOLUTE_URL = `${EN_HOMEPAGE_URL}/${ABSOLUTE_URL}`;
export const EN_RELATIVE_URL = `${EN_HOMEPAGE_URL}/${RELATIVE_URL}`;
export const SITEMAP_EN_RELURL = `${EN_HOMEPAGE_URL}/${DEFAULT_SITEMAP_NAME}`;
export const SITEMAP_EN_ABSURL = `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EN_RELURL}`;
export const FR_HOMEPAGE_URL = 'fr';
export const FR_ABSOLUTE_URL = `${FR_HOMEPAGE_URL}/${ABSOLUTE_URL}`;
export const FR_RELATIVE_URL = `${FR_HOMEPAGE_URL}/${RELATIVE_URL}`;
export const SITEMAP_FR_RELURL = `${FR_HOMEPAGE_URL}/${DEFAULT_SITEMAP_NAME}`;
export const SITEMAP_FR_ABSURL = `${DEFAULT_SITEMAP_HOST}/${SITEMAP_FR_RELURL}`;
export const ABSOLUTE_URL_TITLE = 'absolute_url_title';
export const RELATIVE_URL_TITLE = 'relative_url_title';
export const WAIT_UNTIL_URL_TITLE = 'wait_until_url_title';
//
export const SITEMAP_EXTENDED_FILENAME = 'sitemapindex.xml';
export const SITEMAP_URL_TITLE_OPTION_FILENAME = 'sitemap_url_title_option.xml';
export const ABSOLUTE_URL_TITLE_FILENAME = 'absolute_url_title.pdf';
export const RELATIVE_URL_TITLE_FILENAME = 'relative_url_title.pdf';
export const EN_ABSOLUTE_FILENAME = 'Absolute URL.pdf';
export const EN_HOMEPAGE_FILENAME = 'First page.pdf';
export const EN_RELATIVE_FILENAME = 'Relative URL.pdf';
export const EN_ABSOLUTE_SAFE_FILENAME = 'Absolute_URL.pdf';
export const EN_HOMEPAGE_SAFE_FILENAME = 'First_page.pdf';
export const EN_RELATIVE_SAFE_FILENAME = 'Relative_URL.pdf';
export const FR_ABSOLUTE_FILENAME = 'URL absolue.pdf';
export const FR_HOMEPAGE_FILENAME = 'Première page.pdf';
export const FR_RELATIVE_FILENAME = 'URL relative.pdf';
export const FR_ABSOLUTE_SAFE_FILENAME = 'URL_absolue.pdf';
export const FR_HOMEPAGE_SAFE_FILENAME = 'Première_page.pdf';
export const FR_RELATIVE_SAFE_FILENAME = 'URL_relative.pdf';
export const WAIT_UNTIL_FILENAME = 'Wait until page.pdf';
export const SITEMAP_EMPTY_FILENAME = `empty/${DEFAULT_SITEMAP_NAME}`;
export const SITEMAP_WAIT_UNTIL_FILENAME = `wait_until/${DEFAULT_SITEMAP_NAME}`;
export const SITEMAPINDEX_EMPTY_FILENAME = `empty/${SITEMAP_EXTENDED_FILENAME}`;
export const SITEMAPINDEX_EMPTY_URL_FILENAME = `empty_url/${SITEMAP_EXTENDED_FILENAME}`;
//
export const SITEMAP_STANDARD = path.join(
  testResourcesPath,
  DEFAULT_SITEMAP_NAME
);
//
export const SITEMAP_EN_FILE = path.join(testResourcesPath, 'sitemap_en.xml');
export const SITEMAP_FR_FILE = path.join(testResourcesPath, 'sitemap_fr.xml');
export const SITEMAP_EXTENDED_FILE = path.join(
  testResourcesPath,
  SITEMAP_EXTENDED_FILENAME
);
export const SITEMAP_UNKNOWN_FILE = path.join(
  testResourcesPath,
  'sitemap_unknown.xml'
);
export const SITEMAP_INVALID_FILE = path.join(
  testResourcesPath,
  'sitemap_invalid.xml'
);
export const SITEMAP_SINGLE_ENTRY_FILE = path.join(
  testResourcesPath,
  'sitemap_single_entry.xml'
);
export const SITEMAP_WAIT_UNTIL_FILE = path.join(
  testResourcesPath,
  'sitemap_wait_until.xml'
);
export const SITEMAP_URL_TITLE_OPTION_FILE = path.join(
  testResourcesPath,
  SITEMAP_URL_TITLE_OPTION_FILENAME
);
export const SITEMAP_EMPTY_FILE = path.join(
  testResourcesPath,
  'sitemap_empty.xml'
);
export const SITEMAPINDEX_EMPTY_FILE = path.join(
  testResourcesPath,
  'sitemapindex_empty.xml'
);
export const SITEMAPINDEX_EMPTY_URL_FILE = path.join(
  testResourcesPath,
  'sitemapindex_empty_url.xml'
);
export const SITEMAPINDEX_SINGLE_ENTRY_FILE = path.join(
  testResourcesPath,
  'sitemapindex_single_entry.xml'
);
export const HTML_EN_HOMEPAGE_FILE = path.join(
  testResourcesPath,
  `html/${EN_HOMEPAGE_URL}/homepage.html`
);
export const HTML_EN_ABSOLUTE_FILE = path.join(
  testResourcesPath,
  `html/${EN_HOMEPAGE_URL}/absolute.html`
);
export const HTML_EN_RELATIVE_FILE = path.join(
  testResourcesPath,
  `html/${EN_HOMEPAGE_URL}/relative.html`
);
export const HTML_FR_HOMEPAGE_FILE = path.join(
  testResourcesPath,
  `html/${FR_HOMEPAGE_URL}/homepage.html`
);
export const HTML_FR_ABSOLUTE_FILE = path.join(
  testResourcesPath,
  `html/${FR_HOMEPAGE_URL}/absolute.html`
);
export const HTML_FR_RELATIVE_FILE = path.join(
  testResourcesPath,
  `html/${FR_HOMEPAGE_URL}/relative.html`
);
export const HTML_DUMMY_FILE = path.join(testResourcesPath, 'html/dummy.html');
export const HTML_WAIT_UNTIL_FILE = path.join(
  testResourcesPath,
  'html/wait_until.html'
);
/* c8 ignore stop */
