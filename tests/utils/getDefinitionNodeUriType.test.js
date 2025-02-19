const assert = require('assert');
const testCases = require('./getDefinitionNodeUriType.data');
const getDefinitionNodeUriType = require('../../src/utils/getDefinitionNodeUriType');

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
