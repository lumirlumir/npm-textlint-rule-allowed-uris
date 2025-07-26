/**
 * @fileoverview Test for `get-definition-node-uri-type.js`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { strictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import getDefinitionNodeUriType from './get-definition-node-uri-type.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('get-definition-node-uri-type', () => {
  describe('comment', () => {
    it("The empty `''` character should be a `comment`", async () => {
      const actual = '';
      const expected = 'comment';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });
    it('The `#` character should be a `comment`', async () => {
      const actual = '#';
      const expected = 'comment';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });
  });

  describe('image', () => {
    it('The remote `https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg` should be an `image`', async () => {
      const actual = 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg';
      const expected = 'image';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });

    it('The local absolute path `/assets/test.png` should be an `image`', async () => {
      const actual = '/assets/test.png';
      const expected = 'image';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });

    it('The relative path `../assets/test.jpg` should be an `image`', async () => {
      const actual = '../assets/test.jpg';
      const expected = 'image';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });

    it('The local path with query parameters `/images/languages/javascript/composition-of-javascript/2.png?raw=true` should be an `image`', async () => {
      const actual =
        '/images/languages/javascript/composition-of-javascript/2.png?raw=true';
      const expected = 'image';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });
  });

  describe('link', () => {
    it('The remote `https://www.google.com` should be a `link`', async () => {
      const actual = 'https://www.google.com';
      const expected = 'link';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });

    it('The remote `https://en.wikipedia.org/wiki/File:Example.jpg` should be a `link` (Link but ends with `.jpg`', async () => {
      const actual = 'https://en.wikipedia.org/wiki/File:Example.jpg';
      const expected = 'link';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });

    it('The local absolute path `/LICENSE` should be a `link`', async () => {
      const actual = '/LICENSE';
      const expected = 'link';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });

    it('The relative path `../README.md` should be a `link`', async () => {
      const actual = '../README.md';
      const expected = 'link';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });

    it('The local path with hash `/learn/start-a-new-react-project#can-i-use-react-without-a-framework` should be a `link`', async () => {
      const actual =
        '/learn/start-a-new-react-project#can-i-use-react-without-a-framework';
      const expected = 'link';

      strictEqual(await getDefinitionNodeUriType(actual), expected);
    });
  });
});
