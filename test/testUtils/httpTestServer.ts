/* eslint-disable @typescript-eslint/no-explicit-any*/
/* c8 ignore start */
import {DEFAULT_HOST, DEFAULT_PORT} from '../../src/utils/const';
import {createServer, IncomingMessage, Server, ServerResponse} from 'http';

export class TestRequest {
  private _url: string;
  public get url(): string {
    return this._url;
  }
  public set url(value: string) {
    this._url = value;
  }
  private _response: string;
  public get response(): string {
    return this._response;
  }
  public set response(value: string) {
    this._response = value;
  }
  private _contentType: string;
  public get contentType(): string {
    return this._contentType;
  }
  public set contentType(value: string) {
    this._contentType = value;
  }

  constructor(
    url: string,
    response: string,
    contentType = 'text/html; charset=UTF-8'
  ) {
    this.url = url;
    this.response = response;
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
            //console.log(`Reaching URL: '${testRequest.url}'`);
            response.setHeader('Content-Type', testRequest.contentType);
            response.end(testRequest.response);
            defaultResponse = false;
          }
        }
        if (defaultResponse) {
          response.statusCode = 404;
          response.end();
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
        host: DEFAULT_HOST,
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
