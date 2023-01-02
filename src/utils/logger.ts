import {Logger} from 'tslog';
import {ILogObj} from 'tslog/dist/types/interfaces';
import {Website2PdfCli} from '../cli/website2pdfCli';

export class LoggerFactory {
  private static _logger: Logger<ILogObj>;
  public static get logger(): Logger<ILogObj> {
    return LoggerFactory._logger;
  }
  public static set logger(value: Logger<ILogObj>) {
    LoggerFactory._logger = value;
  }

  public static getInstance(): Logger<ILogObj> {
    if (!this.logger) {
      const loggerLevel: number =
        Website2PdfCli.cliArgs !== undefined
          ? Website2PdfCli.cliArgs.debug
            ? 2
            : 3
          : 3;
      this.logger = new Logger({
        type: 'pretty',
        minLevel: loggerLevel,
      });
    }
    return this.logger;
  }
}

export function logger(): Logger<ILogObj> {
  return LoggerFactory.getInstance();
}
