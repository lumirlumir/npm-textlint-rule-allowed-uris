/**
 * @fileoverview Retrieves the URI and creates an instance of `UriTypes` from a given `node`.
 */

// @ts-check

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const cheerio = require('cheerio');

const UriTypes = require('./uri-types');
const getDefinitionNodeUriType = require('./getDefinitionNodeUriType');

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/**
 * Retrieves URI from a given `Link` node and returns an instance of `UriTypes`.
 *
 * @param {object} node `Link` type node.
 * @param {string} node.url The URI of the node.
 */
const getUriListLink = ({ url }) => new UriTypes().push({ uri: url, type: 'link' });

/**
 * Retrieves URI from a given `Image` node and returns an instance of `UriTypes`.
 *
 * @param {object} node `Image` type node.
 * @param {string} node.url The URI of the node.
 */
const getUriListImage = ({ url }) => new UriTypes().push({ uri: url, type: 'image' });

/**
 * Retrieves URI from a given `Definition` node and returns an instance of `UriTypes`.
 *
 * @param {object} node `Definition` type node.
 * @param {string} node.url The URI of the node.
 * @async
 */
const getUriListDefinition = async ({ url }) => {
  const type = await getDefinitionNodeUriType(url);

  return ['link', 'image'].includes(type)
    ? // @ts-ignore -- TODO
      new UriTypes().push({ uri: url, type })
    : new UriTypes();
};

/**
 * Parses the HTML content of the given node and retrieves all the `<a>` and `<img>` tag's URIs.
 *
 * @param {object} node `Html` type node.
 * @param {string} node.value The raw HTML string.
 */
const getUriListHtml = ({ value }) => {
  const uriTypes = new UriTypes();
  const $ = cheerio.load(value);

  $('a, img').each((_, elem) => {
    // @ts-ignore -- TODO
    const tag = $(elem).prop('tagName').toLowerCase();

    if (tag === 'a') {
      const href = $(elem).attr('href');
      if (href) {
        uriTypes.push({ uri: href, type: 'link' });
      }
    } else if (tag === 'img') {
      const src = $(elem).attr('src');
      if (src) {
        uriTypes.push({ uri: src, type: 'image' });
      }
    }
  });

  return uriTypes;
};

// --------------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------------

/**
 * Retrieves the URI and creates an instance of `UriTypes` from a given `node`.
 *
 * @async
 * @param {Object} node The node from which to retrieve the URI.
 * @param {string} node.type The type of the node, which should be `Link`, `Image`, `Definition`, or `Html`.
 * @throws Throws an `TypeError` error if `node.type` is not one of `Link`, `Image`, `Definition`, or `Html`.
 */
module.exports = async node => {
  switch (node.type) {
    case 'Link':
      // @ts-ignore -- TODO
      return getUriListLink(node);
    case 'Image':
      // @ts-ignore -- TODO
      return getUriListImage(node);
    case 'Definition':
      // @ts-ignore -- TODO
      return getUriListDefinition(node);
    case 'Html':
      // @ts-ignore -- TODO
      return getUriListHtml(node);
    default:
      throw new TypeError(
        `'${node.type}' is an invalid 'node.type' parameter. It should be 'Link', 'Image', 'Definition', or 'Html'`,
      );
  }
};
