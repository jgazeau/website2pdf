import {red} from 'kleur';
import {expect} from 'chai';
import {logger} from '../../src/utils/logger';
import {logTestLevel} from '../testUtils/const';
import {SinonStubs} from '../testUtils/sinonStubs';
import {MAX_TTY_LENGTH} from '../../src/utils/const';
import {
  getOutputWidth,
  headerFactory,
  imageEncode,
  interpolate,
  puppeteerBrowserLaunchArgs,
  toFilename,
} from '../../src/utils/helpers';

describe('Utils tests', () => {
  const sinonMock = new SinonStubs({});
  afterEach(() => {
    sinonMock.sinonRestoreStubs();
  });
  it('getOutputWidth should return MAX_TTY_WIDTH at most', () => {
    process.stdout.columns = 0;
    expect(getOutputWidth()).to.equal(MAX_TTY_LENGTH);
  });
  it('getOutputWidth should return stdout length if less than MAX_TTY_WIDTH', () => {
    process.stdout.columns = 50;
    expect(getOutputWidth()).to.equal(process.stdout.columns);
  });
  it('headerFactory should log', () => {
    sinonMock.logger = true;
    sinonMock.sinonSetStubs();
    headerFactory(red, logTestLevel);
    expect(logger()[logTestLevel]).to.be.calledOnce;
  });
  it('toFilename should return filename with title', () => {
    expect(toFilename('file_title_éè%$@')).to.equal('file_title_éè');
  });
  it('toFilename should return filename with UUID', () => {
    expect(toFilename(undefined)).to.match(
      /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
    );
  });
  it('interpolate should replace placeholders with value from map of variable', () => {
    const variableMap = new Map<string, string>([
      ['key1', 'value1'],
      ['key2', 'value2'],
    ]);
    const input = 'key1=${key1},key2=${key2}';
    expect(interpolate(input, variableMap)).to.be.equal(
      'key1=value1,key2=value2'
    );
  });
  it('imageEncode should return source of image as base64', () => {
    const inputPath = './test/resources/images/test.png';
    expect(imageEncode(inputPath)).to.be.equal(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAeSURBVFhH7cExAQAAAMKg9U9tCF8gAAAAAAAAAG41HX4AASRYHnsAAAAASUVORK5CYII='
    );
  });
  it('puppeteerBrowserLaunchArgs should return PuppeteerNodeLaunchOptions when chromiumFlags', () => {
    const chromiumFlags = '--no-sandbox --disable-dev-shm-usage';
    expect(puppeteerBrowserLaunchArgs(chromiumFlags)).to.deep.equal({
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
  });
  it('puppeteerBrowserLaunchArgs should return empty PuppeteerNodeLaunchOptions when empty chromiumFlags', () => {
    const chromiumFlags = '';
    expect(puppeteerBrowserLaunchArgs(chromiumFlags)).to.deep.equal({});
  });
});
