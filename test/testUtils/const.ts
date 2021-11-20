/* c8 ignore start */
import * as path from 'path';
import {TLogLevelName} from 'tslog';

export const logTestLevel: TLogLevelName = 'debug';
export const rootPath: string = path.join(process.cwd());
export const testResourcesPath: string = path.join(rootPath, '/test/resources');
export const SPECIFIC_URL = 'https://example.com/sitemap.xml';
export const SPECIFIC_DIR = './aSpecificDir/';
/* c8 ignore stop */
