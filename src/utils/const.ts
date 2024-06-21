import axios from 'axios';
import * as http from 'http';
import {cyan} from 'kleur';

export const MAX_TTY_LENGTH = 120;

export const CHROMIUM_FLAGS_OPTION = 'chromium-flags';
export const CHROMIUM_HEADLESS_OPTION = 'chromium-headless';
export const DISPLAY_HEADER_FOOTER_OPTION = 'display-header-footer';
export const EXCLUDE_URLS_OPTION = 'exclude-urls';
export const FORMAT_OPTION = 'format';
export const MARGIN_BOTTOM_OPTION = 'margin-bottom';
export const MARGIN_LEFT_OPTION = 'margin-left';
export const MARGIN_RIGHT_OPTION = 'margin-right';
export const MARGIN_TOP_OPTION = 'margin-top';
export const MERGE_ALL_OPTION = 'merge-all';
export const OUTPUT_DIR_OPTION = 'output-dir';
export const OUTPUT_FILE_NAME_URL_MAP_OPTION = 'output-file-name-url-map';
export const PROCESS_POOL_OPTION = 'process-pool';
export const SAFE_TITLE_OPTION = 'safe-title';
export const SERVE_SITEMAP_OPTION = 'serve-sitemap';
export const SITEMAP_URL_OPTION = 'sitemap-url';
export const TEMPLATE_DIR_OPTION = 'template-dir';
export const URL_TITLE_OPTION = 'url-title';
export const WAIT_UNTIL_OPTION = 'wait-until';

export const DEFAULT_CHROMIUM_HEADLESS = 'shell';
export const DEFAULT_FOOTER_FILE = 'footer.html';
export const DEFAULT_FORMAT = 'a4';
export const DEFAULT_HEADER_FILE = 'header.html';
export const DEFAULT_HEADER_FOOTER = false;
export const DEFAULT_HOST = 'localhost';
export const DEFAULT_MARGIN_MAX = '50px';
export const DEFAULT_MARGIN_MIN = '0px';
export const DEFAULT_MERGED_PDF = 'merged.pdf';
export const DEFAULT_OUTPUT_DIR = './w2pdf_output';
export const DEFAULT_OUTPUT_URL_TO_FILENAME_MAP = 'urlToFileNameMap.json';
export const DEFAULT_PORT = '1313';
export const DEFAULT_PROCESS_POOL = 10;
export const DEFAULT_SAFE_TITLE = false;
export const DEFAULT_SITEMAP_HOST = `http://${DEFAULT_HOST}:${DEFAULT_PORT}`;
export const DEFAULT_SITEMAP_NAME = 'sitemap.xml';
export const DEFAULT_SITEMAP_URL = `${DEFAULT_SITEMAP_HOST}/${DEFAULT_SITEMAP_NAME}`;
export const DEFAULT_TEMPLATE_DIR = './w2pdf_template';
export const DEFAULT_URL_TITLE = false;
export const DEFAULT_WAIT_UNTIL = 'domcontentloaded,networkidle2';
export const fxpOptions = {
  ignoreAttributes: true,
  parseNodeValue: true,
  trimValues: true,
  isArray: (tagName: string) => ['sitemap', 'url'].includes(tagName),
};

// Force ipv4 for Axios client
axios.defaults.httpAgent = new http.Agent({family: 4});

export const WEBSITE2PDF_HEADER = `
\u25CF      __          __  _         _ _       ___  _____    _  __ 
\u25CF      \\ \\        / / | |       (_) |     |__ \\|  __ \\  | |/ _|
\u25CF       \\ \\  /\\  / /__| |__  ___ _| |_ ___   ) | |__) |_| | |_ 
\u25CF        \\ \\/  \\/ / _ \\ '_ \\/ __| | __/ _ \\ / /|  ___/ _\` |  _|
\u25CF         \\  /\\  /  __/ |_) \\__ \\ | ||  __// /_| |  | (_| | |  
\u25CF          \\/  \\/ \\___|_.__/|___/_|\\__\\___|____|_|   \\__,_|_|  
`;

export const CLI_USAGE = `${WEBSITE2PDF_HEADER}
Usage: $0 [options]

NB1: Website2Pdf will search for ${cyan(DEFAULT_HEADER_FILE)} and ${cyan(
  DEFAULT_FOOTER_FILE
)} files from the ${cyan(
  TEMPLATE_DIR_OPTION
)} and use them respectively as header and footer definition when printing PDFs.

NB2: Margins have default values depending on the option used:
===> when ${DISPLAY_HEADER_FOOTER_OPTION}=true
-      ${MARGIN_TOP_OPTION}  = ${MARGIN_BOTTOM_OPTION} = 50px
-      ${MARGIN_LEFT_OPTION} = ${MARGIN_RIGHT_OPTION}  = 0px
===> when ${DISPLAY_HEADER_FOOTER_OPTION}=false
-      ${MARGIN_TOP_OPTION}  = ${MARGIN_BOTTOM_OPTION} = 0px
-      ${MARGIN_LEFT_OPTION} = ${MARGIN_RIGHT_OPTION}  = 0px`;
