/* c8 ignore start */
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

export function setChaiAsPromised(): void {
  chai.should();
  chai.use(chaiAsPromised);
}

export function mockArgs(args: string[]): void {
  const tempArgv: string[] = process.argv;
  process.argv = [...tempArgv.slice(0, 2), ...args];
}
/* c8 ignore stop */
