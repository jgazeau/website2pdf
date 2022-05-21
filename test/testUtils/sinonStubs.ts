/* c8 ignore start */
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import axios, {AxiosStatic} from 'axios';
import {logger} from '../../src/utils/logger';

export class SinonStubs {
  private _logger: boolean;
  public get logger(): boolean {
    return this._logger;
  }
  public set logger(value: boolean) {
    this._logger = value;
  }
  private _consoleLog: boolean;
  public get consoleLog(): boolean {
    return this._consoleLog;
  }
  public set consoleLog(value: boolean) {
    this._consoleLog = value;
  }
  private _consoleError: boolean;
  public get consoleError(): boolean {
    return this._consoleError;
  }
  public set consoleError(value: boolean) {
    this._consoleError = value;
  }
  private _processExit: boolean;
  public get processExit(): boolean {
    return this._processExit;
  }
  public set processExit(value: boolean) {
    this._processExit = value;
  }

  constructor({
    logger = false,
    consoleLog = false,
    consoleError = false,
    processExit = false,
  }: sinonStubsParameters) {
    this.logger = logger;
    this.consoleLog = consoleLog;
    this.consoleError = consoleError;
    this.processExit = processExit;
  }

  sinonSetStubs() {
    chai.use(sinonChai);
    if (this.logger) sinon.stub(logger());
    if (this.consoleLog) sinon.stub(console, 'log');
    if (this.consoleError) sinon.stub(console, 'error');
    if (this.processExit) sinon.stub(process, 'exit');
  }

  sinonRestoreStubs() {
    sinon.restore();
  }
}

interface sinonStubsParameters {
  logger?: boolean;
  consoleLog?: boolean;
  consoleError?: boolean;
  processExit?: boolean;
}

let sandbox: sinon.SinonSandbox;

export function createSandbox() {
  sandbox = sinon.createSandbox();
}
export function restoreSandbox() {
  sandbox.restore();
}

export class AxiosMethodStub {
  url: string;
  responseData: string;
  httpStatus: number;

  constructor(url: string, responseData: string, httpStatus = 200) {
    this.url = url;
    this.responseData = responseData;
    this.httpStatus = httpStatus;
  }
}

export function setAxiosStub(
  method: keyof AxiosStatic,
  methodStubs: Array<AxiosMethodStub>
) {
  const stub: sinon.SinonStub = sandbox.stub(axios, method);
  for (const methodStub of methodStubs) {
    const response = {
      status: methodStub.httpStatus,
      data: methodStub.responseData,
    };
    const stubResponse = new Promise(r => r(response));
    stub.withArgs(methodStub.url).returns(stubResponse);
  }
}
/* c8 ignore stop */
