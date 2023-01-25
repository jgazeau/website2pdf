/* c8 ignore start */
import * as fs from 'fs-extra';
import * as path from 'path';
import {ICliArguments} from '../../src/cli/iArgumentsParser';
import {
  DEFAULT_MARGIN_MIN,
  DEFAULT_OUTPUT_DIR,
  DEFAULT_PROCESS_POOL,
  DEFAULT_SITEMAP_HOST,
  DEFAULT_SITEMAP_NAME,
  DEFAULT_SITEMAP_URL,
  DEFAULT_TEMPLATE_DIR,
} from '../../src/utils/const';

export const rootPath: string = path.join(process.cwd());
export const testResourcesPath: string = path.join(rootPath, 'test/resources');
export const testTempPath: string = path.join(rootPath, 'test/temp');
export const testOutputDir = path.join(testTempPath, DEFAULT_OUTPUT_DIR);
export const testTemplatesPath: string = path.join(
  testResourcesPath,
  DEFAULT_TEMPLATE_DIR
);
export const testResourcesImagePath: string = path.join(
  testResourcesPath,
  '/images'
);
export const testTemplatesMetaPath: string = path.join(
  testResourcesPath,
  `${DEFAULT_TEMPLATE_DIR}_meta`
);
export const testTemplatesImagePath: string = path.join(
  testResourcesPath,
  `${DEFAULT_TEMPLATE_DIR}_image`
);
export const SPECIFIC_URL = `https://example.com/${DEFAULT_SITEMAP_NAME}`;
export const SPECIFIC_SERVED_SITEMAP = 'anotherSitemap.xml';
export const SPECIFIC_DIR = './aSpecificDir/';
export const SPECIFIC_CHROMIUM_FLAGS = '--no-sandbox';
export const SPECIFIC_EXCLUDE_REGEX = '\\/fr\\/';
export const SPECIFIC_PROCESS_POOL = 20;
export const DUMMY_CLIARGS: ICliArguments = {
  _: [],
  $0: '',
  excludeUrls: SPECIFIC_EXCLUDE_REGEX,
  debug: false,
  sitemapUrl: DEFAULT_SITEMAP_URL,
  displayHeaderFooter: false,
  templateDir: DEFAULT_TEMPLATE_DIR,
  outputDir: DEFAULT_OUTPUT_DIR,
  marginLeft: DEFAULT_MARGIN_MIN,
  marginRight: DEFAULT_MARGIN_MIN,
  marginTop: DEFAULT_MARGIN_MIN,
  marginBottom: DEFAULT_MARGIN_MIN,
  chromiumFlags: '',
  safeTitle: false,
  urlTitle: false,
  processPool: DEFAULT_PROCESS_POOL,
  serveSitemap: DEFAULT_SITEMAP_NAME,
};

export const ABSOLUTE_URL = 'absolute/url';
export const RELATIVE_URL = 'relative/url';
export const SITEMAP_STANDARD_PAGE = fs.readFileSync(
  path.join(testResourcesPath, DEFAULT_SITEMAP_NAME),
  'utf8'
);
export const SITEMAP_EXTENDED_RELURL = 'sitemapindex.xml';
export const SITEMAP_EXTENDED_PAGE = fs.readFileSync(
  path.join(testResourcesPath, SITEMAP_EXTENDED_RELURL),
  'utf8'
);
export const SITEMAP_UNKNOWN_PAGE = fs.readFileSync(
  path.join(testResourcesPath, 'sitemap_unknown.xml'),
  'utf8'
);
export const SITEMAP_INVALID_PAGE = fs.readFileSync(
  path.join(testResourcesPath, 'sitemap_invalid.xml'),
  'utf8'
);
export const SITEMAP_EMPTY_RELURL = `empty/${DEFAULT_SITEMAP_NAME}`;
export const SITEMAP_EMPTY_PAGE = fs.readFileSync(
  path.join(testResourcesPath, 'sitemap_empty.xml'),
  'utf8'
);
export const SITEMAPINDEX_EMPTY_RELURL = `empty/${SITEMAP_EXTENDED_RELURL}`;
export const SITEMAPINDEX_EMPTY_PAGE = fs.readFileSync(
  path.join(testResourcesPath, 'sitemapindex_empty.xml'),
  'utf8'
);
export const SITEMAPINDEX_EMPTY_URL_RELURL = `empty_url/${SITEMAP_EXTENDED_RELURL}`;
export const SITEMAPINDEX_EMPTY_URL_PAGE = fs.readFileSync(
  path.join(testResourcesPath, 'sitemapindex_empty_url.xml'),
  'utf8'
);
export const EN_HOMEPAGE_URL = 'en';
export const EN_ABSOLUTE_FILENAME = 'Absolute URL.pdf';
export const EN_HOMEPAGE_FILENAME = 'First page.pdf';
export const EN_RELATIVE_FILENAME = 'Relative URL.pdf';
export const EN_ABSOLUTE_SAFE_FILENAME = 'Absolute_URL.pdf';
export const EN_HOMEPAGE_SAFE_FILENAME = 'First_page.pdf';
export const EN_RELATIVE_SAFE_FILENAME = 'Relative_URL.pdf';
export const EN_HOMEPAGE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, `html/${EN_HOMEPAGE_URL}/homepage.html`),
  'utf8'
);
export const EN_ABSOLUTE_URL = `${EN_HOMEPAGE_URL}/${ABSOLUTE_URL}`;
export const EN_ABSOLUTE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, `html/${EN_HOMEPAGE_URL}/absolute.html`),
  'utf8'
);
export const EN_RELATIVE_URL = `${EN_HOMEPAGE_URL}/${RELATIVE_URL}`;
export const EN_RELATIVE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, `html/${EN_HOMEPAGE_URL}/relative.html`),
  'utf8'
);
export const FR_HOMEPAGE_URL = 'fr';
export const FR_ABSOLUTE_FILENAME = 'URL absolue.pdf';
export const FR_HOMEPAGE_FILENAME = 'Première page.pdf';
export const FR_RELATIVE_FILENAME = 'URL relative.pdf';
export const FR_ABSOLUTE_SAFE_FILENAME = 'URL_absolue.pdf';
export const FR_HOMEPAGE_SAFE_FILENAME = 'Première_page.pdf';
export const FR_RELATIVE_SAFE_FILENAME = 'URL_relative.pdf';
export const FR_HOMEPAGE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, `html/${FR_HOMEPAGE_URL}/homepage.html`),
  'utf8'
);
export const FR_ABSOLUTE_URL = `${FR_HOMEPAGE_URL}/${ABSOLUTE_URL}`;
export const FR_ABSOLUTE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, `html/${FR_HOMEPAGE_URL}/absolute.html`),
  'utf8'
);
export const FR_RELATIVE_URL = `${FR_HOMEPAGE_URL}/${RELATIVE_URL}`;
export const FR_RELATIVE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, `html/${FR_HOMEPAGE_URL}/relative.html`),
  'utf8'
);
export const SITEMAP_EN_RELURL = `${EN_HOMEPAGE_URL}/${DEFAULT_SITEMAP_NAME}`;
export const SITEMAP_EN_ABSURL = `${DEFAULT_SITEMAP_HOST}/${SITEMAP_EN_RELURL}`;
export const SITEMAP_EN_PAGE = fs.readFileSync(
  path.join(testResourcesPath, 'sitemap_en.xml'),
  'utf8'
);
export const SITEMAP_FR_RELURL = `${FR_HOMEPAGE_URL}/${DEFAULT_SITEMAP_NAME}`;
export const SITEMAP_FR_ABSURL = `${DEFAULT_SITEMAP_HOST}/${SITEMAP_FR_RELURL}`;
export const SITEMAP_FR_PAGE = fs.readFileSync(
  path.join(testResourcesPath, 'sitemap_fr.xml'),
  'utf8'
);
/* c8 ignore stop */
