/* eslint-disable @typescript-eslint/no-explicit-any*/
import * as fs from 'fs-extra';
import {logger} from './logger';
import {randomUUID} from 'crypto';
import {Color, white} from 'kleur';
import {TLogLevelName} from 'tslog';
import {WEBSITE2PDF_HEADER, MAX_TTY_LENGTH} from './const';
import {validateSync, ValidationError} from 'class-validator';

export function validateClassObjectSync(object: Object): void {
  const objectTypeMessage = typeof object;
  const validationErrors: ValidationError[] = validateSync(object);
  if (validationErrors.length > 0) {
    throw new Error(
      `Validation failed on ${objectTypeMessage}  with following(s) error(s): \n ${validationErrors}`
    );
  }
}

export function headerFactory(
  color: Color = white,
  logLevel: TLogLevelName = 'info'
): void {
  logger()[logLevel](color(`${WEBSITE2PDF_HEADER}`));
}

export function getOutputWidth(): number {
  return process.stdout.columns
    ? Math.min(process.stdout.columns, MAX_TTY_LENGTH)
    : MAX_TTY_LENGTH;
}

export function toFilename(title: string | undefined): string {
  return title
    ? title
        .replace(/[^a-z0-9\u00C0-\u024F\u1E00-\u1EFF]/gi, ' ')
        .trim()
        .replace(/ /g, '_')
        .replace(/([_])\1+/g, '_')
    : randomUUID();
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
