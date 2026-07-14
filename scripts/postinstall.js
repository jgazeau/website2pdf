'use strict';
/**
 * Postinstall script to fix TypeScript 7 compatibility with linting toolchain.
 *
 * TypeScript 7 changed its package exports so that require('typescript') only
 * returns {version, versionMajorMinor} instead of the full compiler API.
 * This breaks @typescript-eslint/typescript-estree and ts-api-utils, which
 * are used by gts lint and expect the old TypeScript API.
 *
 * The fix installs a TypeScript 5 copy (typescript-compat) as a nested
 * dependency so that the affected packages resolve it instead of TypeScript 7.
 * TypeScript 7 remains the compiler for project builds.
 */
const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const src = path.join(rootDir, 'node_modules', 'typescript-compat');

// Packages that require the old TypeScript API and are incompatible with TS7
const destinations = [
  // gts nested @typescript-eslint packages (typescript-estree, etc.)
  path.join(rootDir, 'node_modules', 'gts', 'node_modules', 'typescript'),
  // ts-api-utils is hoisted to root but is used by @typescript-eslint inside gts
  path.join(
    rootDir,
    'node_modules',
    'ts-api-utils',
    'node_modules',
    'typescript'
  ),
];

if (!fs.existsSync(src)) {
  // typescript-compat is a devDependency; skip if not present (e.g. --omit=dev)
  process.exit(0);
}

for (const dest of destinations) {
  // Check that the parent package is installed (one level above the node_modules dir)
  const packageDir = path.dirname(path.dirname(dest));
  if (!fs.existsSync(packageDir)) {
    continue;
  }
  fs.mkdirSync(dest, {recursive: true});
  fs.cpSync(src, dest, {recursive: true, force: true});
  console.log(
    `[postinstall] TypeScript 5 compat installed at ${path.relative(rootDir, dest)}`
  );
}
