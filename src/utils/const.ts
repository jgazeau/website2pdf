import * as http from 'http';
import axios from 'axios';
import {cyan} from 'kleur';

export const MAX_TTY_LENGTH = 120;
export const DISPLAY_HEADER_FOOTER_OPTION = 'displayHeaderFooter';
export const TEMPLATE_DIR_OPTION = 'templateDir';
export const OUTPUT_DIR_OPTION = 'outputDir';
export const MARGIN_TOP_OPTION = 'marginTop';
export const MARGIN_BOTTOM_OPTION = 'marginBottom';
export const MARGIN_LEFT_OPTION = 'marginLeft';
export const MARGIN_RIGHT_OPTION = 'marginRight';
export const CHROMIUM_FLAGS_OPTION = 'chromiumFlags';

export const DEFAULT_TEMPLATE_DIR = './w2pdf_template';
export const DEFAULT_OUTPUT_DIR = './w2pdf_output';
export const DEFAULT_MARGIN_MAX = '50px';
export const DEFAULT_MARGIN_MIN = '0px';
export const DEFAULT_HEADER_FILE = 'header.html';
export const DEFAULT_FOOTER_FILE = 'footer.html';
export const DEFAULT_HOST = 'localhost';
export const DEFAULT_PORT = '1313';
export const DEFAULT_SITEMAP_NAME = 'sitemap.xml';
export const DEFAULT_SITEMAP_HOST = `http://${DEFAULT_HOST}:${DEFAULT_PORT}`;
export const DEFAULT_SITEMAP_URL = `${DEFAULT_SITEMAP_HOST}/${DEFAULT_SITEMAP_NAME}`;
export const fxpOptions = {
  ignoreAttributes: true,
  parseNodeValue: true,
  trimValues: true,
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
===> when displayHeaderFooter=true
-      marginTop  = marginBottom = 50px
-      marginLeft = marginRight  = 0px
===> when displayHeaderFooter=false
-      marginTop  = marginBottom = 0px
-      marginLeft = marginRight  = 0px`;
