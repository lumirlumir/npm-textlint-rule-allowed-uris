/**
 * @fileoverview Test for `uri-types.js`.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const { deepStrictEqual, throws } = require('node:assert');

const UriTypes = require('../../src/utils/uri-types');

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('uri-types.js', () => {
  // deepStrictEqual
  it('Method: new UriTypes()', () => {
    deepStrictEqual([], new UriTypes().uriTypes);
  });
  it('Method: new UriTypes().push({ uri, type })', () => {
    deepStrictEqual(
      [
        {
          uri: 'https://www.google.com',
          type: 'link',
        },
      ],
      new UriTypes().push({ uri: 'https://www.google.com', type: 'link' }).uriTypes,
    );
  });
  it('Method Chaining: new UriTypes().push({ uri, type }).push({ uri, type })', () => {
    deepStrictEqual(
      [
        {
          uri: 'https://www.google.com',
          type: 'link',
        },
        {
          uri: 'https://en.wikipedia.org/wiki/File:Example.jpg',
          type: 'link',
        },
      ],
      new UriTypes()
        .push({ uri: 'https://www.google.com', type: 'link' })
        .push({ uri: 'https://en.wikipedia.org/wiki/File:Example.jpg', type: 'link' })
        .uriTypes,
    );
  });

  // throws
  it('Method Parameter: new UriTypes().push({ uri, type }), when uri is not a string', () => {
    throws(() => {
      new UriTypes().push({ uri: 1, type: 'link' });
    });
  });
  it('Method Parameter: new UriTypes().push({ uri, type }), when type is neither link nor image', () => {
    throws(() => {
      new UriTypes().push({ uri: 'https://www.google.com', type: 'comment' });
    });
  });
});
