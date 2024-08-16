const assert = require('assert');
const testCases = require('./getUriList.data');
const getUriList = require('../../src/utils/getUriList');

/**
 * Tests for the `getUriList.js`
 */
describe('Util getUriList deepStrictEqual testing', () => {
  testCases.forEach(({ actual, expected }) => {
    it(`${actual.raw} => ${expected.map(({ uri, type }) => `${uri} ${type}`).join(' / ')}`, async () => {
      assert.deepStrictEqual((await getUriList(actual)).uriList, expected);
    });
  });
});
