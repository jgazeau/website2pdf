/* c8 ignore start */
import * as path from 'path';
import * as fs from 'fs-extra';
import {TLogLevelName} from 'tslog';
import {
  DEFAULT_SITEMAP_HOST,
  DEFAULT_TEMPLATE_DIR,
} from '../../src/utils/const';

export const logTestLevel: TLogLevelName = 'debug';
export const rootPath: string = path.join(process.cwd());
export const testResourcesPath: string = path.join(rootPath, '/test/resources');
export const testTempPath: string = path.join(rootPath, '/test/temp');
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
export const SPECIFIC_URL = 'https://example.com/sitemap.xml';
export const SPECIFIC_DIR = './aSpecificDir/';

export const ABSOLUTE_URL = 'absolute/url/';
export const RELATIVE_URL = 'relative/url/';
export const SITEMAP_EN_RELURL = '/en/sitemap.xml';
export const SITEMAP_EN_ABSURL = `${DEFAULT_SITEMAP_HOST}${SITEMAP_EN_RELURL}`;
export const SITEMAP_EN_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/sitemap_en.xml'),
  'utf8'
);
export const SITEMAP_FR_RELURL = '/fr/sitemap.xml';
export const SITEMAP_FR_ABSURL = `${DEFAULT_SITEMAP_HOST}${SITEMAP_FR_RELURL}`;
export const SITEMAP_FR_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/sitemap_fr.xml'),
  'utf8'
);
export const SITEMAP_STANDARD_RELURL = '/sitemap.xml';
export const SITEMAP_STANDARD_PAGE = fs.readFileSync(
  path.join(testResourcesPath, SITEMAP_STANDARD_RELURL),
  'utf8'
);
export const SITEMAP_EXTENDED_RELURL = '/sitemapindex.xml';
export const SITEMAP_EXTENDED_PAGE = fs.readFileSync(
  path.join(testResourcesPath, SITEMAP_EXTENDED_RELURL),
  'utf8'
);
export const SITEMAP_UNKNOWN_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/sitemap_unknown.xml'),
  'utf8'
);
export const SITEMAP_INVALID_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/sitemap_invalid.xml'),
  'utf8'
);
export const SITEMAP_EMPTY_RELURL = '/empty/sitemap.xml';
export const SITEMAP_EMPTY_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/sitemap_empty.xml'),
  'utf8'
);
export const SITEMAPINDEX_EMPTY_RELURL = '/empty/sitemapindex.xml';
export const SITEMAPINDEX_EMPTY_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/sitemapindex_empty.xml'),
  'utf8'
);
export const SITEMAPINDEX_EMPTY_URL_RELURL = '/empty_url/sitemapindex.xml';
export const SITEMAPINDEX_EMPTY_URL_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/sitemapindex_empty_url.xml'),
  'utf8'
);
export const EN_HOMEPAGE_URL = '/en/';
export const EN_HOMEPAGE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/html/en/homepage.html'),
  'utf8'
);
export const EN_ABSOLUTE_URL = `/en/${ABSOLUTE_URL}`;
export const EN_ABSOLUTE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/html/en/absolute.html'),
  'utf8'
);
export const EN_RELATIVE_URL = `/en/${RELATIVE_URL}`;
export const EN_RELATIVE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/html/en/relative.html'),
  'utf8'
);
export const FR_HOMEPAGE_URL = '/fr/';
export const FR_HOMEPAGE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/html/fr/homepage.html'),
  'utf8'
);
export const FR_ABSOLUTE_URL = `/fr/${ABSOLUTE_URL}`;
export const FR_ABSOLUTE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/html/fr/absolute.html'),
  'utf8'
);
export const FR_RELATIVE_URL = `/fr/${RELATIVE_URL}`;
export const FR_RELATIVE_PAGE = fs.readFileSync(
  path.join(testResourcesPath, '/html/fr/relative.html'),
  'utf8'
);
/* c8 ignore stop */
