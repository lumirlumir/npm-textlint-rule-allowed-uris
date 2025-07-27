/**
 * @fileoverview Test for `textlint-rule-allowed-uris.ts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { test } from 'node:test';

import rule from './textlint-rule-allowed-uris.js';

const TextLintTester = createRequire(import.meta.url)('textlint-tester').default;

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const tester = new TextLintTester();
const text = readFileSync(
  resolve(import.meta.dirname, 'textlint-rule-allowed-uris.md'),
  'utf-8',
);

/** @param {number[]} lines */
const createErrors = lines => lines.map(line => ({ line }));

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

test('textlint-rule-allowed-uris', () => {
  tester.run('textlint-rule-allowed-uris', rule, {
    valid: [
      {
        name: 'Totally Empty - 1',
        text,
        options: {
          // allowed: {
          //   links: [],
          //   images: [],
          // },
          // disallowed: {
          //   links: [],
          //   images: [],
          // },
        },
      },
      {
        name: 'Totally Empty - 2',
        text,
        options: {
          allowed: {
            // links: [],
            // images: [],
          },
          // disallowed: {
          //   links: [],
          //   images: [],
          // },
        },
      },
      {
        name: 'Totally Empty - 3',
        text,
        options: {
          // allowed: {
          //   links: [],
          //   images: [],
          // },
          disallowed: {
            // links: [],
            // images: [],
          },
        },
      },
      {
        name: 'Totally Empty - 4',
        text,
        options: {
          allowed: {
            // links: [],
            // images: [],
          },
          disallowed: {
            // links: [],
            // images: [],
          },
        },
      },

      {
        name: 'Pass Empty Array - 1',
        text,
        options: {
          allowed: {
            // links: [],
            // images: [],
          },
          disallowed: {
            links: [], // Act like a blacklist. i.e. Empty array allows everything. No `links` will be detected.
            // images: [],
          },
        },
      },
      {
        name: 'Pass Empty Array - 2',
        text,
        options: {
          allowed: {
            // links: [],
            // images: [],
          },
          disallowed: {
            // links: [],
            images: [], // Act like a blacklist. i.e. Empty array allows everything. No `images` will be detected.
          },
        },
      },
      {
        name: 'Pass Empty Array - 3',
        text,
        options: {
          allowed: {
            // links: [],
            // images: [],
          },
          disallowed: {
            links: [], // Act like a blacklist. i.e. Empty array allows everything. No `images` will be detected.
            images: [], // Act like a blacklist. i.e. Empty array allows everything. No `images` will be detected.
          },
        },
      },

      {
        name: 'Pass Values - `allowed.images` - 1',
        text,
        options: {
          allowed: {
            // links: [],
            images: [/wiki/],
          },
          // disallowed: {
          //   links: [],
          //   images: [],
          // },
        },
      },

      // HTML node.

      {
        name: 'HTML node - 1',
        text: '<a href="https://www.google.com">',
        options: {
          allowed: {
            links: [/google/],
          },
        },
      },

      {
        name: 'HTML node - 2',
        text: '<img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">',
        options: {
          allowed: {
            images: [/wiki/],
          },
        },
      },

      {
        name: 'HTML node - 3',
        text: '<div><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"></div>',
        options: {
          allowed: {
            images: [/wiki/],
          },
        },
      },

      // Check unused definitions.

      {
        name: 'Do not report unused definitions by default',
        text: '[link1]: https://www.google.com',
      },

      {
        name: 'Do not report `//` unused definitions by default - 1',
        text: '[//]: # (This behaves like a comment)',
        options: {
          checkUnusedDefinitions: true,
        },
      },

      {
        name: 'Do not report `//` unused definitions by default - 2',
        text: '[//]: <> (This behaves like a comment)',
        options: {
          checkUnusedDefinitions: true,
        },
      },

      {
        name: 'Do not report used definitions',
        text: '[google][link1]\n\n[link1]: https://www.google.com "Hello Google"',
        options: {
          checkUnusedDefinitions: true,
        },
      },
    ],

    invalid: [
      {
        name: 'Pass Empty Array - 1',
        text,
        options: {
          allowed: {
            links: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `links` will be detected.
            // images: [],
          },
          disallowed: {
            // links: [],
            // images: [],
          },
        },
        errors: [
          {
            range: [97, 119],
            loc: {
              start: { line: 7, column: 1 },
              end: { line: 7, column: 23 },
            },
          },
          {
            range: [121, 138],
            loc: {
              start: { line: 9, column: 1 },
              end: { line: 9, column: 18 },
            },
          },
          ...createErrors([13, 15, 19, 21, 23, 25, 31, 37, 43, 47, 86, 101, 105]),
        ],
      },

      {
        name: 'Pass Empty Array - 1 (`checkUnusedDefinitions`: true)',
        text,
        options: {
          allowed: {
            links: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `links` will be detected.
            // images: [],
          },
          disallowed: {
            // links: [],
            // images: [],
          },
          checkUnusedDefinitions: true,
        },
        errors: [
          {
            range: [97, 119],
            loc: {
              start: { line: 7, column: 1 },
              end: { line: 7, column: 23 },
            },
          },
          {
            range: [121, 138],
            loc: {
              start: { line: 9, column: 1 },
              end: { line: 9, column: 18 },
            },
          },
          ...createErrors([13, 15, 19, 21, 23, 25, 31, 37, 43, 47, 86, 101, 103, 105]),
        ],
      },

      {
        name: 'Pass Empty Array - 2',
        text,
        options: {
          allowed: {
            // links: [],
            images: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `images` will be detected.
          },
          disallowed: {
            // links: [],
            // images: [],
          },
        },
        errors: createErrors([53, 59, 65, 71, 75, 77, 79, 86, 105]),
      },

      {
        name: 'Pass Empty Array - 3',
        text,
        options: {
          allowed: {
            links: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `links` will be detected.
            images: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `images` will be detected.
          },
          disallowed: {
            // links: [],
            // images: [],
          },
        },
        errors: createErrors([
          7, 9, 13, 15, 19, 21, 23, 25, 31, 37, 43, 47, 53, 59, 65, 71, 75, 77, 79, 86,
          86, 101, 105, 105,
        ]), // `86` and `105` are same line number, but detected twice. one for `links` and the other for `images`
      },

      {
        name: 'Pass Empty Array - 3 (`checkUnusedDefinitions`: true)',
        text,
        options: {
          allowed: {
            links: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `links` will be detected.
            images: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `images` will be detected.
          },
          disallowed: {
            // links: [],
            // images: [],
          },
          checkUnusedDefinitions: true,
        },
        errors: createErrors([
          7, 9, 13, 15, 19, 21, 23, 25, 31, 37, 43, 47, 53, 59, 65, 71, 75, 77, 79, 86,
          86, 101, 103, 105, 105,
        ]), // `86` and `105` are same line number, but detected twice. one for `links` and the other for `images`
      },

      {
        name: 'Pass Values - `allowed.links` - 1',
        text,
        options: {
          allowed: {
            links: [/google/],
            // images: [],
          },
          // disallowed: {
          //   links: [],
          //   images: [],
          // },
        },
        errors: createErrors([9, 15, 21, 23, 25, 86, 101]),
      },

      {
        name: 'Pass Values - `allowed.links` - 1 (`checkUnusedDefinitions`: true)',
        text,
        options: {
          allowed: {
            links: [/google/],
            // images: [],
          },
          // disallowed: {
          //   links: [],
          //   images: [],
          // },
          checkUnusedDefinitions: true,
        },
        errors: createErrors([9, 15, 21, 23, 25, 86, 101, 103]),
      },

      {
        name: 'Pass Values - `allowed.links` - 2',
        text,
        options: {
          allowed: {
            links: [/google/, /gmail/],
            // images: [],
          },
          // disallowed: {
          //   links: [],
          //   images: [],
          // },
        },
        errors: createErrors([21, 23, 25, 86, 101]),
      },

      {
        name: 'Pass Values - `allowed.links` - 2 (`checkUnusedDefinitions`: true)',
        text,
        options: {
          allowed: {
            links: [/google/, /gmail/],
            // images: [],
          },
          // disallowed: {
          //   links: [],
          //   images: [],
          // },
          checkUnusedDefinitions: true,
        },
        errors: createErrors([21, 23, 25, 86, 101, 103]),
      },

      {
        name: 'Pass Values - `allowed.links` - 3',
        text,
        options: {
          allowed: {
            links: [/google/, /gmail/, /README.md/],
            // images: [],
          },
          // disallowed: {
          //   links: [],
          //   images: [],
          // },
        },
        errors: createErrors([21, 23, 86]),
      },

      {
        name: 'Pass Values - `allowed.links` - 3 (`checkUnusedDefinitions`: true)',
        text,
        options: {
          allowed: {
            links: [/google/, /gmail/, /README.md/],
            // images: [],
          },
          // disallowed: {
          //   links: [],
          //   images: [],
          // },
          checkUnusedDefinitions: true,
        },
        errors: createErrors([21, 23, 86, 103]),
      },

      {
        name: 'Pass Values - `disallowed.links` - 1',
        text,
        options: {
          // allowed: {
          //   links: [],
          //   images: [],
          // },
          disallowed: {
            links: [/google/],
            // images: [],
          },
        },
        errors: createErrors([7, 13, 19, 31, 37, 43, 47, 105]),
      },

      {
        name: 'Pass Values - `disallowed.links` - 1 (`checkUnusedDefinitions`: true)',
        text,
        options: {
          // allowed: {
          //   links: [],
          //   images: [],
          // },
          disallowed: {
            links: [/google/],
            // images: [],
          },
          checkUnusedDefinitions: true,
        },
        errors: createErrors([7, 13, 19, 31, 37, 43, 47, 103, 105]),
      },

      {
        name: 'Pass Values - `disallowed.links` - 2',
        text,
        options: {
          // allowed: {
          //   links: [],
          //   images: [],
          // },
          disallowed: {
            links: [/google/, /gmail/],
            // images: [],
          },
        },
        errors: createErrors([7, 9, 13, 15, 19, 31, 37, 43, 47, 105]),
      },

      {
        name: 'Pass Values - `disallowed.links` - 3',
        text,
        options: {
          // allowed: {
          //   links: [],
          //   images: [],
          // },
          disallowed: {
            links: [/google/, /gmail/, /README.md/],
            // images: [],
          },
        },
        errors: createErrors([7, 9, 13, 15, 19, 25, 31, 37, 43, 47, 101, 105]),
      },

      {
        name: 'Pass Values - `disallowed.images` - 1',
        text,
        options: {
          // allowed: {
          //   links: [],
          //   images: [],
          // },
          disallowed: {
            // links: [],
            images: [/wiki/],
          },
        },
        errors: createErrors([53, 59, 65, 71, 75, 77, 79, 86, 105]),
      },

      {
        name: 'Pass same values to `allowed` and `disallowed` - 1',
        text,
        options: {
          allowed: {
            links: [/google/],
            // images: [],
          },
          disallowed: {
            links: [/google/],
            // images: [],
          },
        },
        errors: createErrors([
          7, 9, 13, 15, 19, 21, 23, 25, 31, 37, 43, 47, 86, 101, 105,
        ]), // Every `links` will be detected.
      },

      {
        name: 'Pass same values to `allowed` and `disallowed` - 1 (`checkUnusedDefinitions`: true)',
        text,
        options: {
          allowed: {
            links: [/google/],
            // images: [],
          },
          disallowed: {
            links: [/google/],
            // images: [],
          },
          checkUnusedDefinitions: true,
        },
        errors: createErrors([
          7, 9, 13, 15, 19, 21, 23, 25, 31, 37, 43, 47, 86, 101, 103, 105,
        ]), // Every `links` will be detected.
      },

      {
        name: 'Pass same values to `allowed` and `disallowed` - 2',
        text,
        options: {
          allowed: {
            // links: [],
            images: [/wiki/],
          },
          disallowed: {
            // links: [],
            images: [/wiki/],
          },
        },
        errors: createErrors([53, 59, 65, 71, 75, 77, 79, 86, 105]), // Every `images` will be detected.
      },

      // HTML node.

      {
        name: 'HTML node - 1',
        text: '<a href="https://www.google.com">',
        options: {
          disallowed: {
            links: [/google/],
          },
        },
        errors: [
          {
            line: 1,
            range: [0, 33],
          },
        ],
      },

      {
        name: 'HTML node - 2',
        text: '<img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">',
        options: {
          disallowed: {
            images: [/wiki/],
          },
        },
        errors: [
          {
            line: 1,
            range: [0, 70],
          },
        ],
      },

      {
        name: 'HTML node - 3',
        text: '<div><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"></div>',
        options: {
          disallowed: {
            images: [/wiki/],
          },
        },
        errors: [
          {
            line: 1,
            range: [0, 81],
          },
        ],
      },

      {
        name: 'HTML node - 4',
        text: '<div><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"></div>',
        options: {
          disallowed: {
            images: [/wiki/],
          },
        },
        errors: [
          {
            line: 1,
            range: [0, 151],
          },
        ],
      },

      {
        name: 'HTML node - 5',
        text: '<div>\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">\n</div>',
        options: {
          disallowed: {
            images: [/wiki/],
          },
        },
        errors: [
          {
            line: 1,
            range: [0, 158],
          },
        ],
      },

      {
        name: 'HTML node - 6',
        text: '<div>\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><br>\n  <a href="https://www.google.com">google</a><br>\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><br>\n</div>',
        options: {
          disallowed: {
            links: [/google/],
            images: [/wiki/],
          },
        },
        errors: [
          // 1 for the link and 2 for the images, but since the errors on the images are the same, it's only reported once.
          {
            line: 1,
            range: [0, 216],
          },
          {
            line: 1,
            range: [0, 216],
          },
        ],
      },

      // Check unused definitions.

      {
        name: 'Report unused definitions when `checkUnusedDefinitions` is true - 1',
        text: '[link1]: https://www.google.com',
        options: {
          checkUnusedDefinitions: true,
        },
        errors: [
          {
            line: 1,
            range: [0, 31],
          },
        ],
      },

      {
        name: 'Report unused definitions when `checkUnusedDefinitions` is true - 2',
        text: '[/]: https://www.google.com',
        options: {
          checkUnusedDefinitions: true,
        },
        errors: [
          {
            line: 1,
            range: [0, 27],
          },
        ],
      },
    ],
  });
});
