/* eslint-disable @typescript-eslint/no-explicit-any*/
import {logger} from './logger';
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
