export const ERROR_PARSING_XML_SCHEMA = 'Error parsing Xml';
export const ERROR_UNKNOWN_XML_SCHEMA = 'Cannot define Xml schema from sitemap';

export class Website2PdfError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Website2PdfError';
  }
}
