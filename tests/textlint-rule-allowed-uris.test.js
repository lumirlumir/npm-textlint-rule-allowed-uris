/**
 * @fileoverview Test for `textlint-rule-allowed-uris.js`.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { test } = require('node:test');

const TextLintTester = require('textlint-tester').default;

const rule = require('../src/textlint-rule-allowed-uris');

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const tester = new TextLintTester();
const text = readFileSync(
  resolve(__dirname, 'textlint-rule-allowed-uris.data.md'),
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
        errors: createErrors([
          7, 9, 13, 15, 19, 21, 23, 25, 31, 37, 43, 47, 86, 101, 103, 105,
        ]),
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
    ],
  });
});
