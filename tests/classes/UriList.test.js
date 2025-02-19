const assert = require('assert');
const UriList = require('../../src/classes/UriList');

/**
 * Tests for the `UriList.js`
 */
describe('Class UriList deepStrictEqual and throws testing', () => {
  it('Method: new UriList()', () => {
    assert.deepStrictEqual([], new UriList().uriList);
  });
  it('Method: new UriList().push(uri, type)', () => {
    assert.deepStrictEqual(
      [
        {
          uri: 'https://www.google.com',
          type: 'link',
        },
      ],
      new UriList().push('https://www.google.com', 'link').uriList,
    );
  });
  it('Method Chaining: new UriList().push(uri, type).push(uri, type)', () => {
    assert.deepStrictEqual(
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
      new UriList()
        .push('https://www.google.com', 'link')
        .push('https://en.wikipedia.org/wiki/File:Example.jpg', 'link').uriList,
    );
  });
  it('Method Parameter: new UriList().push(uri, type), when uri is not a string', () => {
    assert.throws(() => {
      new UriList().push(1, 'link');
    });
  });
  it('Method Parameter: new UriList().push(uri, type), when type is neither link nor image', () => {
    assert.throws(() => {
      new UriList().push('https://www.google.com', 'comment');
    });
  });
});
