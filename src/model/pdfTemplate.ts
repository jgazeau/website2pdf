import {PathLike} from 'fs';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  DEFAULT_FOOTER_FILE,
  DEFAULT_HEADER_FILE,
  DEFAULT_TEMPLATE_DIR,
} from '../utils/const';

export class PdfTemplate {
  private _header?: string | undefined;
  /* c8 ignore start */
  public get header(): string | undefined {
    return this._header;
  }
  public set header(value: string | undefined) {
    this._header = value;
  }
  /* c8 ignore stop */

  private _footer?: string | undefined;
  /* c8 ignore start */
  public get footer(): string | undefined {
    return this._footer;
  }
  public set footer(value: string | undefined) {
    this._footer = value;
  }
  /* c8 ignore stop */

  constructor(displayHeaderFooter?: boolean, templateDir?: PathLike) {
    if (displayHeaderFooter) {
      const headerPath = templateDir
        ? path.join(templateDir.toString(), DEFAULT_HEADER_FILE)
        : path.join(DEFAULT_TEMPLATE_DIR, DEFAULT_HEADER_FILE);
      const footerPath = templateDir
        ? path.join(templateDir.toString(), DEFAULT_FOOTER_FILE)
        : path.join(DEFAULT_TEMPLATE_DIR, DEFAULT_FOOTER_FILE);
      this.header = fs.existsSync(headerPath)
        ? fs.readFileSync(headerPath, 'utf8')
        : undefined;
      this.footer = fs.existsSync(footerPath)
        ? fs.readFileSync(footerPath, 'utf8')
        : undefined;
    }
  }
}
