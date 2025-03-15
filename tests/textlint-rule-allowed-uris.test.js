/**
 * @fileoverview Test for `textlint-rule-allowed-uris.js`.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { describe } = require('node:test');

const TextLintTester = require('textlint-tester').default;

const allowedUris = require('../src/textlint-rule-allowed-uris');
const testCases = require('./textlint-rule-allowed-uris.data');

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const tester = new TextLintTester();
const testCasesMarkdown = readFileSync(
  resolve(__dirname, 'textlint-rule-allowed-uris.data.md'),
  'utf-8',
);

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('textlint-rule-allowed-uris', () => {
  testCases.forEach(({ options, lines }) => {
    /* Initialization */
    const testConfig = {
      rules: [
        {
          ruleId: 'textlint-rule-allowed-uris',
          rule: allowedUris,
          options,
        },
      ],
    };
    const invalid = [
      {
        text: testCasesMarkdown,
        errors: lines.map(line => ({ line })),
      },
    ];

    /* Test */
    tester.run(
      `
      allowed links: ${options?.allowed?.links?.join(' or ')}
      allowed images: ${options?.allowed?.images?.join(' or ')}
      disallowed links: ${options?.disallowed?.links?.join(' or ')}
      disallowed images: ${options?.disallowed?.links?.join(' or ')}
      lines: ${lines.join(', ')}
      `,
      testConfig,
      {
        invalid,
      },
    );

    console.log(`
      allowed links: ${options?.allowed?.links?.join(' or ')}
      allowed images: ${options?.allowed?.images?.join(' or ')}
      disallowed links: ${options?.disallowed?.links?.join(' or ')}
      disallowed images: ${options?.disallowed?.links?.join(' or ')}
      lines: ${lines.join(', ')}
      `);
  });
});
