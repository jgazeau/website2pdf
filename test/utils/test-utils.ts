import {red} from 'kleur';
import {expect} from 'chai';
import {logger} from '../../src/utils/logger';
import {logTestLevel} from '../testUtils/const';
import {SinonStubs} from '../testUtils/sinonStubs';
import {MAX_TTY_LENGTH} from '../../src/utils/const';
import {getOutputWidth, headerFactory} from '../../src/utils/helpers';

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
});
