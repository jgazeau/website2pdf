import {cyan} from 'kleur';

export const MAX_TTY_LENGTH = 100;
export const DEFAULT_TEMPLATE_DIR = './s2pdf_template';
export const DEFAULT_OUTPUT_DIR = './s2pdf_output';

export const DEFAULT_SITEMAP_LANG = 'default';
export const DEFAULT_SITEMAP_HOST = 'http://localhost:1313';
export const DEFAULT_SITEMAP_URL = `${DEFAULT_SITEMAP_HOST}/sitemap.xml`;
export const DEFAULT_SITEMAP_URL_EN = `${DEFAULT_SITEMAP_HOST}/en/sitemap.xml`;
export const DEFAULT_SITEMAP_URL_FR = `${DEFAULT_SITEMAP_HOST}/fr/sitemap.xml`;

export const fxpOptions = {
  ignoreAttributes: true,
  parseNodeValue: true,
  trimValues: true,
};

export const WEBSITE2PDF_HEADER = `
__          __  _         _ _       ___  _____    _  __ 
\\ \\        / / | |       (_) |     |__ \\|  __ \\  | |/ _|
 \\ \\  /\\  / /__| |__  ___ _| |_ ___   ) | |__) |_| | |_ 
  \\ \\/  \\/ / _ \\ '_ \\/ __| | __/ _ \\ / /|  ___/ _\` |  _|
   \\  /\\  /  __/ |_) \\__ \\ | ||  __// /_| |  | (_| | |  
    \\/  \\/ \\___|_.__/|___/_|\\__\\___|____|_|   \\__,_|_|  
`;

export const CLI_USAGE = `${WEBSITE2PDF_HEADER}
Usage: $0 [options]

NB: Website2Pdf will search for ${cyan('header.html')} and ${cyan(
  'footer.html'
)} files from the ${cyan('templateDir')}
    and use them respectively as header and footer definition when printing PDFs.`;
