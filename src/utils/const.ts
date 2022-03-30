import * as http from 'http';
import axios from 'axios';
import {cyan} from 'kleur';

export const MAX_TTY_LENGTH = 120;
export const DISPLAY_HEADER_FOOTER_OPTION = 'displayHeaderFooter';
export const TEMPLATE_DIR_OPTION = 'templateDir';
export const OUTPUT_DIR_OPTION = 'outputDir';
export const DEFAULT_TEMPLATE_DIR = './w2pdf_template';
export const DEFAULT_OUTPUT_DIR = './w2pdf_output';
export const DEFAULT_HEADER_FILE = 'header.html';
export const DEFAULT_FOOTER_FILE = 'footer.html';
export const DEFAULT_SITEMAP_LANG = 'default';
export const DEFAULT_HOST = 'localhost';
export const DEFAULT_PORT = '1313';
export const DEFAULT_SITEMAP_HOST = `http://${DEFAULT_HOST}:${DEFAULT_PORT}`;
export const DEFAULT_SITEMAP_URL = `${DEFAULT_SITEMAP_HOST}/sitemap.xml`;
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

NB: Website2Pdf will search for ${cyan(DEFAULT_HEADER_FILE)} and ${cyan(
  DEFAULT_FOOTER_FILE
)} files from the ${cyan(
  TEMPLATE_DIR_OPTION
)} and use them respectively as header and footer definition when printing PDFs.`;
