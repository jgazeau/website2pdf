import {expect} from 'chai';
import {PathLike} from 'fs-extra';
import {red} from 'kleur';
import * as path from 'path';
import {Website2PdfError} from '../../src/model/website2pdfError';
import {
  CHROMIUM_FLAGS_OPTION,
  DEFAULT_SITEMAP_HOST,
  MAX_TTY_LENGTH,
} from '../../src/utils/const';
import {
  checkFilePath,
  getOutputWidth,
  headerFactory,
  imageEncode,
  interpolate,
  puppeteerBrowserLaunchArgs,
  toFilename,
  toFilePath,
  toSafeLastSegment,
  toSafeString,
} from '../../src/utils/helpers';
import {logger} from '../../src/utils/logger';
import {DUMMY_CLIARGS, testResourcesImagePath} from '../testUtils/const';
import {setChaiAsPromised} from '../testUtils/helpers';
import {SinonStubs} from '../testUtils/sinonStubs';

describe('Helpers tests', () => {
  const sinonMock = new SinonStubs({});
  afterEach(() => {
    sinonMock.sinonRestoreStubs();
  });
  it('checkFilePath should return path when existing file path', () => {
    setChaiAsPromised();
    const filePath: PathLike = __filename;
    return checkFilePath(filePath).then(tempPath => {
      expect(tempPath).to.be.equal(filePath);
    });
  });
  it('checkFilePath should throw a Website2PdfError when non existing file path', () => {
    setChaiAsPromised();
    const filePath: PathLike = './NonExistingFile.tst';
    return expect(checkFilePath(filePath)).to.eventually.be.rejectedWith(
      Website2PdfError,
      'File not found'
    );
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
    headerFactory(red);
    expect(logger().info).to.be.calledOnce;
  });
  it('toSafeString should return string without specific chars', () => {
    expect(toSafeString('string_éè%$@ with spaces')).to.equal(
      'string_éè_with_spaces'
    );
  });
  it('toSafeLastSegment should return last segment of URL when exist', () => {
    const urlPath = 'http://test.com/dir/subdir/anotherSubdir';
    expect(toSafeLastSegment(new URL(urlPath))).to.equal('anotherSubdir');
  });
  it('toSafeLastSegment should return UUID when empty last segment', () => {
    const urlPath = 'http://test.com/';
    expect(toSafeLastSegment(new URL(urlPath))).to.match(
      /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
    );
  });
  it('toFilename should return title without specific chars when safeTitle', () => {
    const urlPath = 'http://test.com/dir/subdir/anotherSubdir';
    const cliArgs = Object.assign({}, DUMMY_CLIARGS);
    cliArgs.safeTitle = true;
    expect(
      toFilename('file_title_éè%$@ with spaces', new URL(urlPath), cliArgs)
    ).to.equal('file_title_éè_with_spaces');
  });
  it('toFilename should return title', () => {
    const urlPath = 'http://test.com/dir/subdir/anotherSubdir';
    expect(
      toFilename(
        'file_title_éè%$@ with spaces',
        new URL(urlPath),
        DUMMY_CLIARGS
      )
    ).to.equal('file_title_éè%$@ with spaces');
  });
  it('toFilename should return last segment of URL when exist and urlTitle', () => {
    const urlPath = 'http://test.com/dir/subdir/anotherSubdir';
    const cliArgs = Object.assign({}, DUMMY_CLIARGS);
    cliArgs.urlTitle = true;
    expect(
      toFilename('file_title_éè%$@ with spaces', new URL(urlPath), cliArgs)
    ).to.equal('anotherSubdir');
  });
  it('toFilename should return last segment when urlTitle and empty title', () => {
    const urlPath = 'http://test.com/dir/subdir/anotherSubdir';
    const cliArgs = Object.assign({}, DUMMY_CLIARGS);
    cliArgs.urlTitle = true;
    expect(toFilename(undefined, new URL(urlPath), cliArgs)).to.equal(
      'anotherSubdir'
    );
  });
  it('toFilename should return UUID when urlTitle and empty last segment', () => {
    const urlPath = 'http://test.com/';
    const cliArgs = Object.assign({}, DUMMY_CLIARGS);
    cliArgs.urlTitle = true;
    expect(toFilename(undefined, new URL(urlPath), cliArgs)).to.match(
      /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
    );
  });
  it('toFilename should return UUID when empty title', () => {
    const urlPath = 'http://test.com/dir/subdir/anotherSubdir';
    expect(toFilename(undefined, new URL(urlPath), DUMMY_CLIARGS)).to.match(
      /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
    );
  });
  it('toFilePath should return empty string when url contains only a host', () => {
    expect(toFilePath(new URL(DEFAULT_SITEMAP_HOST))).to.be.empty;
  });
  it('toFilePath should return empty string when url contains only a filename', () => {
    const url = `${DEFAULT_SITEMAP_HOST}/filename.ext`;
    expect(toFilePath(new URL(url))).to.be.empty;
  });
  it('toFilePath should return a path when url ends with a filename', () => {
    const expectedPath = '/this/is/a/url';
    const url = `${DEFAULT_SITEMAP_HOST}${expectedPath}/filename.ext`;
    expect(toFilePath(new URL(url))).to.be.equal(expectedPath);
  });
  it('toFilePath should return a path when url ends with a /', () => {
    const expectedPath = '/this/is/a/url';
    const url = `${DEFAULT_SITEMAP_HOST}${expectedPath}/`;
    expect(toFilePath(new URL(url))).to.be.equal(expectedPath);
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
    const inputPath = path.join(testResourcesImagePath, 'test.png');
    expect(imageEncode(inputPath)).to.be.equal(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAeSURBVFhH7cExAQAAAMKg9U9tCF8gAAAAAAAAAG41HX4AASRYHnsAAAAASUVORK5CYII='
    );
  });
  it(`puppeteerBrowserLaunchArgs should return PuppeteerNodeLaunchOptions when ${CHROMIUM_FLAGS_OPTION}`, () => {
    const chromiumFlags = '--no-sandbox --disable-dev-shm-usage';
    expect(puppeteerBrowserLaunchArgs(chromiumFlags)).to.deep.equal({
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
  });
  it(`puppeteerBrowserLaunchArgs should return empty PuppeteerNodeLaunchOptions when empty ${CHROMIUM_FLAGS_OPTION}`, () => {
    const chromiumFlags = '';
    expect(puppeteerBrowserLaunchArgs(chromiumFlags)).to.deep.equal({});
  });
});
