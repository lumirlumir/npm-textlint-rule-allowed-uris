/**
 * @fileoverview Test for `get-uri-types.js`.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const { deepStrictEqual, rejects } = require('node:assert');
const { describe, it } = require('node:test');

const testCases = require('./get-uri-types.data');
const getUriTypes = require('./get-uri-types');

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('get-uri-types.js', () => {
  testCases.forEach(({ actual, expected }) => {
    it(`${actual.raw} => ${expected.map(({ uri, type }) => `${uri} ${type}`).join(' / ')}`, async () => {
      if (['Link', 'Image', 'Definition', 'Html'].includes(actual.type))
        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      else
        await rejects(async () => {
          await getUriTypes(actual);
        });
    });
  });
});
