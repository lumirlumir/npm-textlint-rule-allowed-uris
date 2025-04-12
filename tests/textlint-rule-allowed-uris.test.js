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
const testCases = require('./textlint-rule-allowed-uris.data');

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
    invalid: [
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
        errors: createErrors([]),
      },
    ],
  });

  testCases.forEach(({ options, lines }) => {
    tester.run('textlint-rule-allowed-uris', rule, {
      invalid: [
        {
          text,
          options,
          errors: lines.map(line => ({ line })),
        },
      ],
    });
  });
});
