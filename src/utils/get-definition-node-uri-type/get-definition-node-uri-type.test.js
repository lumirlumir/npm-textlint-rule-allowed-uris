/**
 * @fileoverview Test for `get-definition-node-uri-type.js`.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const { strictEqual } = require('node:assert');
const { describe, it } = require('node:test');

const testCases = require('./get-definition-node-uri-type.data');
const getDefinitionNodeUriType = require('./get-definition-node-uri-type');

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('get-definition-node-uri-type.js', () => {
  testCases.forEach(({ actual, expected }) => {
    it(`${actual} => ${expected}`, async () => {
      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });
  });
});
