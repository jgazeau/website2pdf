/* eslint-disable @typescript-eslint/no-explicit-any*/
import {validateSync, ValidationError} from 'class-validator';
import {randomUUID} from 'crypto';
import * as fs from 'fs-extra';
import {PathLike} from 'fs-extra';
import {Color, white} from 'kleur';
import {PuppeteerNodeLaunchOptions} from 'puppeteer';
import {ICliArguments} from '../cli/iArgumentsParser';
import {Website2PdfError} from '../model/website2pdfError';
import {
  DEFAULT_CHROMIUM_HEADLESS,
  MAX_TTY_LENGTH,
  WEBSITE2PDF_HEADER,
} from './const';
import {logger} from './logger';

export function validateClassObjectSync(object: Object): void {
  const objectTypeMessage = typeof object;
  const validationErrors: ValidationError[] = validateSync(object);
  if (validationErrors.length > 0) {
    throw new Error(
      `Validation failed on ${objectTypeMessage}  with following(s) error(s): \n ${validationErrors}`
    );
  }
}

export function headerFactory(color: Color = white): void {
  logger().info(color(`${WEBSITE2PDF_HEADER}`));
}

export function checkFilePath(filePath: PathLike): Promise<PathLike> {
  if (fs.existsSync(filePath)) {
    return Promise.resolve(filePath);
  } else {
    return Promise.reject(new Website2PdfError(`File not found (${filePath})`));
  }
}

export function getOutputWidth(): number {
  return process.stdout.columns
    ? Math.min(process.stdout.columns, MAX_TTY_LENGTH)
    : MAX_TTY_LENGTH;
}

export function toFilename(
  title: string | undefined,
  url: URL,
  cliArgs: ICliArguments
): string {
  return title
    ? cliArgs.safeTitle
      ? toSafeString(title)
      : cliArgs.urlTitle
      ? toSafeLastSegment(url)
      : title
    : cliArgs.urlTitle
    ? toSafeLastSegment(url)
    : randomUUID();
}

export function toSafeString(str: string) {
  return str
    .replace(/[^a-z0-9\u00C0-\u024F\u1E00-\u1EFF]/gi, ' ')
    .trim()
    .replace(/ /g, '_')
    .replace(/([_])\1+/g, '_');
}

export function toSafeLastSegment(url: URL) {
  return (
    url.pathname.substring(url.pathname.lastIndexOf('/') + 1) || randomUUID()
  );
}

export function toFilePath(url: URL): string {
  return url.pathname.substring(0, url.pathname.lastIndexOf('/'));
}

export function interpolate(
  str: string | undefined,
  variableMap: Map<string, string>
) {
  variableMap.forEach((value: string, key: string) => {
    str = str?.replace(`$\{${key}}`, value);
  });
  str = str?.replace(/\$\{image:.+\}/g, match => {
    return imageEncode(match.replace('${image:', '').replace('}', ''));
  });
  return str;
}

export function base64Encode(path: fs.PathOrFileDescriptor): string {
  return fs.readFileSync(path, {encoding: 'base64'});
}

export function imageEncode(path: fs.PathOrFileDescriptor): string {
  return `data:image/png;base64,${base64Encode(path)}`;
}

export function puppeteerBrowserLaunchArgs(
  chromiumFlags: string,
  chromiumHeadless: any = DEFAULT_CHROMIUM_HEADLESS
): PuppeteerNodeLaunchOptions {
  return chromiumFlags
    ? {
        headless: chromiumHeadless,
        args: [...chromiumFlags.split(' ')],
      }
    : {
        headless: chromiumHeadless,
      };
}
