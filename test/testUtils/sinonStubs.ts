/* c8 ignore start */
import * as chai from 'chai';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import axios, {AxiosStatic} from 'axios';
import {testResourcesPath} from './const';
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
    processExit = false,
  }: sinonStubsParameters) {
    this.logger = logger;
    this.consoleLog = consoleLog;
    this.processExit = processExit;
  }

  sinonSetStubs() {
    chai.use(sinonChai);
    if (this.logger) sinon.stub(logger());
    if (this.consoleLog) sinon.stub(console, 'log');
    if (this.processExit) sinon.stub(process, 'exit');
  }

  sinonRestoreStubs() {
    sinon.restore();
  }
}

interface sinonStubsParameters {
  logger?: boolean;
  consoleLog?: boolean;
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
  resourceFilename: string;
  httpStatus: number;

  constructor(url: string, resourceFilename: string, httpStatus = 200) {
    this.url = url;
    this.resourceFilename = resourceFilename;
    this.httpStatus = httpStatus;
  }
}

export function setAxiosStub(
  method: keyof AxiosStatic,
  methodStubs: Array<AxiosMethodStub>
) {
  const stub: sinon.SinonStub = sandbox.stub(axios, method);
  for (const methodStub of methodStubs) {
    const responseData = fs.readFileSync(
      path.join(testResourcesPath, methodStub.resourceFilename),
      'utf8'
    );
    const response = {status: methodStub.httpStatus, data: responseData};
    const stubResponse = new Promise(r => r(response));
    stub.withArgs(methodStub.url).returns(stubResponse);
  }
}
/* c8 ignore stop */
