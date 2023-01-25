/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {expect} from 'chai';
import {
  DEFAULT_SITEMAP_HOST,
  DEFAULT_SITEMAP_NAME,
  DEFAULT_SITEMAP_URL,
} from '../../src/utils/const';
import {LocalServer} from '../../src/utils/localServer';
import {setChaiAsPromised} from '../testUtils/helpers';

describe('LocalServer tests', () => {
  let localServer: LocalServer;
  afterEach(done => {
    if (localServer?.isStarted) {
      localServer.close().then(done);
    } else {
      done();
    }
  });
  it('localServer should start and serve simple file', () => {
    setChaiAsPromised();
    const content = 'A simple content';
    localServer = new LocalServer(DEFAULT_SITEMAP_NAME, content);
    return localServer.start().then(() => {
      return axios.get(DEFAULT_SITEMAP_URL).then((response: any) => {
        expect(localServer.isStarted).to.equal(true);
        expect(response.status).to.equal(200);
        expect(response.data).to.equal(content);
      });
    });
  });
  it('localServer should start and return a 404 when bad URL', () => {
    setChaiAsPromised();
    const content = 'A simple content';
    localServer = new LocalServer(DEFAULT_SITEMAP_NAME, content);
    return localServer.start().then(() => {
      return expect(
        axios.get(`${DEFAULT_SITEMAP_HOST}/bad_url`)
      ).to.eventually.be.rejectedWith('404');
    });
  });
  it('localServer should stop', () => {
    setChaiAsPromised();
    const content = 'A simple content';
    localServer = new LocalServer(DEFAULT_SITEMAP_NAME, content);
    return localServer.start().then(() => {
      return axios
        .get(DEFAULT_SITEMAP_URL)
        .then((response: any) => {
          expect(localServer.isStarted).to.equal(true);
          expect(response.status).to.equal(200);
          expect(response.data).to.equal(content);
        })
        .then(() => {
          return localServer
            .close()
            .then(() => {
              return expect(
                axios.get(DEFAULT_SITEMAP_URL)
              ).to.eventually.be.rejectedWith(Error, 'ECONNREFUSED');
            })
            .then(() => {
              expect(localServer.isStarted).to.equal(false);
            });
        });
    });
  });
});
