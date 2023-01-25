/* eslint-disable @typescript-eslint/no-explicit-any */
import {createServer, IncomingMessage, Server, ServerResponse} from 'http';
import {Website2PdfError} from '../model/website2pdfError';
import {DEFAULT_PORT} from './const';
import {logger} from './logger';

export class LocalServer {
  private CONTENT_TYPE = 'text/html';
  private server: Server;

  /* c8 ignore start */
  private _isStarted: boolean;
  public get isStarted(): boolean {
    return this._isStarted;
  }
  public set isStarted(value: boolean) {
    this._isStarted = value;
  }
  /* c8 ignore stop */

  constructor(fileName: string, content: string) {
    this.isStarted = false;
    this.server = createServer(
      (request: IncomingMessage, response: ServerResponse) => {
        let defaultResponse = true;
        if (request.url === `/${fileName}` && request.method === 'GET') {
          logger().debug(`Serving URL: '${request.url}'`);
          response.writeHead(200, {'Content-Type': this.CONTENT_TYPE});
          response.end(content);
          defaultResponse = false;
        }
        if (defaultResponse) {
          response.statusCode = 404;
          response.end();
        }
      }
    );
  }
  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server?.on('error', (error: Error) => {
        reject(
          new Website2PdfError(
            `Error occured when running test server: ${error.message}`
          )
        );
      });
      this.server.listen(
        {
          port: DEFAULT_PORT,
        },
        () => {
          this.isStarted = true;
          logger().debug('Starting local server...');
          resolve();
        }
      );
    });
  }
  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server?.close((error: any) => {
        this.isStarted = false;
        logger().debug('Closing local server...');
        if (error) {
          reject(
            new Website2PdfError(
              `Error occured when closing local server: ${error.message}(${error.code})`
            )
          );
        } else {
          resolve();
        }
      });
    });
  }
}
