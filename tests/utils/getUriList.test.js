const assert = require('node:assert');
const testCases = require('./getUriList.data');
const getUriList = require('../../src/utils/getUriList');

/**
 * Tests for the `getUriList.js`
 */
describe('Util getUriList deepStrictEqual and rejects testing', () => {
  testCases.forEach(({ actual, expected }) => {
    it(`${actual.raw} => ${expected.map(({ uri, type }) => `${uri} ${type}`).join(' / ')}`, async () => {
      if (['Link', 'Image', 'Definition', 'Html'].includes(actual.type))
        assert.deepStrictEqual((await getUriList(actual)).uriList, expected);
      else
        await assert.rejects(async () => {
          await getUriList(actual);
        });
    });
  });
});
