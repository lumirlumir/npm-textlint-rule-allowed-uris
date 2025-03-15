const assert = require('node:assert');
const { describe, it } = require('node:test');
const testCases = require('./get-definition-node-uri-type.data');
const getDefinitionNodeUriType = require('./get-definition-node-uri-type');

/**
 * Tests for the `getDefinitionNodeUriType.js`
 */
describe('Util getDefinitionNodeUriType strictEqual testing', () => {
  testCases.forEach(({ actual, expected }) => {
    it(`${actual} => ${expected}`, async () => {
      assert.strictEqual(await getDefinitionNodeUriType(actual), expected);
    });
  });
});
