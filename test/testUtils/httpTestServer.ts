/* eslint-disable @typescript-eslint/no-explicit-any*/
/* c8 ignore start */
import * as fs from 'fs-extra';
import {createServer, IncomingMessage, Server, ServerResponse} from 'http';
import {DEFAULT_PORT} from '../../src/utils/const';

export class TestRequest {
  private _url: string;
  public get url(): string {
    return this._url;
  }
  public set url(value: string) {
    this._url = value;
  }
  private _contentType: string;
  public get contentType(): string {
    return this._contentType;
  }
  public set contentType(value: string) {
    this._contentType = value;
  }
  private _filePath: string;
  public get filePath(): string {
    return this._filePath;
  }
  public set filePath(value: string) {
    this._filePath = value;
  }

  constructor(
    url: string,
    filePath: string,
    contentType = 'text/html; charset=UTF-8'
  ) {
    this.url = url;
    this.filePath = filePath;
    this.contentType = contentType;
  }
}

export class TestServer {
  private testServer: Server;

  constructor(testRequests: TestRequest[]) {
    this.testServer = createServer(
      (request: IncomingMessage, response: ServerResponse) => {
        let defaultResponse = true;
        for (const testRequest of testRequests) {
          if (request.url === testRequest.url && request.method === 'GET') {
            if (fs.existsSync(testRequest.filePath)) {
              const s = fs.createReadStream(testRequest.filePath);
              s.on('open', () => {
                response.setHeader('Content-Type', testRequest.contentType);
                s.pipe(response);
              });
              s.on('error', () => {
                response.setHeader('Content-Type', 'text/plain');
                response.statusCode = 404;
                response.end(`Error reaching ${testRequest.url}`);
              });
              defaultResponse = false;
              break;
            } else {
              response.setHeader('Content-Type', 'text/plain');
              response.statusCode = 404;
              response.end(`File ${testRequest.filePath} not found`);
              defaultResponse = false;
              break;
            }
          }
        }
        if (defaultResponse) {
          response.statusCode = 404;
          response.setHeader('Content-Type', 'text/plain');
          response.end('Unable to find appropriate request');
        }
      }
    );
  }
  start() {
    this.testServer.on('error', (error: Error) => {
      console.log(`Error occured when running test server: ${error.message}`);
    });
    this.testServer.listen(
      {
        host: '::',
        port: DEFAULT_PORT,
      },
      () => {
        //console.log('Starting test server...');
      }
    );
  }
  close() {
    this.testServer.close((error: any) => {
      //console.log('Closing test server...');
      if (error) {
        console.log(
          `Error occured when closing test server: ${error.message}(${error.code})`
        );
      }
    });
  }
}
/* c8 ignore stop */
