const assert = require('assert');
const testCases = require('./getDefinitionNodeUriType.data');
const getDefinitionNodeUriType = require('../../src/utils/getDefinitionNodeUriType');

/**
 * Test for the `getDefinitionNodeUriType.js`
 */
describe('Util getDefinitionNodeUriType strictEqual testing', () => {
  testCases.forEach(testCase => {
    it(`${testCase.actual} => ${testCase.expected}`, async () => {
      assert.strictEqual(
        await getDefinitionNodeUriType(testCase.actual),
        testCase.expected,
      );
    });
  });
});
