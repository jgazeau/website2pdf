/* eslint-disable @typescript-eslint/no-explicit-any*/
import {bold, Color, green, red, white} from 'kleur';
import {getBorderCharacters, table, TableUserConfig} from 'table';
import {URL} from 'url';
import {logger} from './logger';

export class PrintEntry {
  constructor(
    public readonly content: string,
    public readonly color: Color = white
  ) {}
}

const HEADER_URL = new PrintEntry('URL', bold);
const HEADER_FILE = new PrintEntry('PDF file', bold);
const HEADER_STATUS = new PrintEntry('Status', bold);

export const STATUS_PRINTED = new PrintEntry('PRINTED', green);
export const STATUS_ERROR = new PrintEntry('ERROR', red);

export type ResultEntry = [PrintEntry, PrintEntry, PrintEntry];
type TableEntry = [string?, string?, string?] | [];

export class PrintResults {
  private static columnHeader: ResultEntry = [
    HEADER_URL,
    HEADER_FILE,
    HEADER_STATUS,
  ];

  private static _tableConfig: TableUserConfig;
  /* c8 ignore start */
  public static get tableConfig(): TableUserConfig {
    return PrintResults._tableConfig;
  }
  public static set tableConfig(value: TableUserConfig) {
    PrintResults._tableConfig = value;
  }
  /* c8 ignore stop */

  private static _table: TableEntry[] = [];
  /* c8 ignore start */
  public static get table(): TableEntry[] {
    return PrintResults._table;
  }
  public static set table(value: TableEntry[]) {
    PrintResults._table = value;
  }
  /* c8 ignore stop */

  private static _results: ResultEntry[] = [];
  /* c8 ignore start */
  public static get results(): ResultEntry[] {
    return PrintResults._results;
  }
  public static set results(value: ResultEntry[]) {
    PrintResults._results = value;
  }
  /* c8 ignore stop */

  public static orderResults() {
    this.results.sort((r1, r2) => {
      return r1[0].content.localeCompare(r2[0].content);
    });
  }

  public static storeResult(url: URL, filePath: string, status: PrintEntry) {
    this.results.push([
      new PrintEntry(url.pathname),
      new PrintEntry(filePath),
      status,
    ]);
  }

  private static tableResultsConfig(): void {
    this.tableConfig = {
      border: getBorderCharacters('norc'),
      header: {
        content: bold('Results summary'),
      },
      columns: {
        3: {alignment: 'center'},
      },
    };
  }

  private static enhanceTableResults(): void {
    this.results.unshift(PrintResults.columnHeader);
    this.results.forEach((entry, entryIndex) => {
      const tempEntry: TableEntry = [];
      entry.map((value, index) => {
        tempEntry[index] = value.color(value.content);
      });
      this.table[entryIndex] = tempEntry;
    });
  }

  public static printResults() {
    this.orderResults();
    this.tableResultsConfig();
    this.enhanceTableResults();
    this.table.length
      ? logger().info(`\n${table(this.table, this.tableConfig)}`)
      : logger().error('No results available');
  }
}
