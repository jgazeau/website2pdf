import {expect} from 'chai';
import {URL} from 'url';
import {DEFAULT_OUTPUT_DIR} from '../../src/utils/const';
import {logger} from '../../src/utils/logger';
import {
  PrintEntry,
  PrintResults,
  ResultEntry,
  STATUS_ERROR,
  STATUS_PRINTED,
} from '../../src/utils/stats';
import {SinonStubs} from '../testUtils/sinonStubs';

function mockResultEntry(
  url: URL,
  filePath: string,
  status: PrintEntry
): ResultEntry {
  return [new PrintEntry(url.pathname), new PrintEntry(filePath), status];
}

const orderedResults: ResultEntry[] = [
  mockResultEntry(
    new URL('http://localhost:1313/a'),
    `${DEFAULT_OUTPUT_DIR}/File1`,
    STATUS_PRINTED
  ),
  mockResultEntry(
    new URL('http://localhost:1313/b'),
    `${DEFAULT_OUTPUT_DIR}/File2`,
    STATUS_ERROR
  ),
  mockResultEntry(
    new URL('http://localhost:1313/c'),
    `${DEFAULT_OUTPUT_DIR}/File3`,
    STATUS_PRINTED
  ),
];

describe('Stats tests', () => {
  const sinonMock = new SinonStubs({});
  beforeEach(() => {
    PrintResults.results = [];
    PrintResults.table = [];
    PrintResults.storeResult(
      new URL('http://localhost:1313/c'),
      `${DEFAULT_OUTPUT_DIR}/File3`,
      STATUS_PRINTED
    );
    PrintResults.storeResult(
      new URL('http://localhost:1313/b'),
      `${DEFAULT_OUTPUT_DIR}/File2`,
      STATUS_ERROR
    );
    PrintResults.storeResult(
      new URL('http://localhost:1313/a'),
      `${DEFAULT_OUTPUT_DIR}/File1`,
      STATUS_PRINTED
    );
  });
  afterEach(() => {
    sinonMock.sinonRestoreStubs();
  });
  it('orderResults should order results', () => {
    PrintResults.orderResults();
    expect(PrintResults.results.toString()).to.equal(orderedResults.toString());
  });
  it('printResults should display results', () => {
    sinonMock.logger = true;
    sinonMock.sinonSetStubs();
    PrintResults.printResults();
    expect(logger()['info']).to.be.calledOnce;
  });
});
