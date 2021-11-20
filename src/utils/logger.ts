import {Logger, TLogLevelName} from 'tslog';
import {Website2PdfCli} from '../cli/website2pdfCli';

export class LoggerFactory {
  private static _logger: Logger;
  public static get logger(): Logger {
    return LoggerFactory._logger;
  }
  public static set logger(value: Logger) {
    LoggerFactory._logger = value;
  }

  public static getInstance(): Logger {
    if (!this.logger) {
      const loggerLevel: TLogLevelName = Website2PdfCli.cliArgs.debug
        ? 'debug'
        : 'info';
      this.logger = new Logger({
        type: 'pretty',
        minLevel: loggerLevel,
        displayFunctionName: false,
      });
    }
    return this.logger;
  }
}

export function logger(): Logger {
  return LoggerFactory.getInstance();
}
