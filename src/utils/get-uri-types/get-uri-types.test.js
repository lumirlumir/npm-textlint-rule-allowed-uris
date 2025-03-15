const assert = require('node:assert');
const { describe, it } = require('node:test');
const testCases = require('./get-uri-types.data');
const getUriTypes = require('./get-uri-types');

/**
 * Tests for the `getUriTypes.js`
 */
describe('Util getUriList deepStrictEqual and rejects testing', () => {
  testCases.forEach(({ actual, expected }) => {
    it(`${actual.raw} => ${expected.map(({ uri, type }) => `${uri} ${type}`).join(' / ')}`, async () => {
      if (['Link', 'Image', 'Definition', 'Html'].includes(actual.type))
        assert.deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      else
        await assert.rejects(async () => {
          await getUriTypes(actual);
        });
    });
  });
});
