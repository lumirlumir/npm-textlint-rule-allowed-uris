const cheerio = require('cheerio');
const UriList = require('../classes/UriList');
const getDefinitionNodeUriType = require('./getDefinitionNodeUriType');

/**
 * Retrieves URI from a given `Link` node and returns an instance of `UriList`.
 *
 * @param {Object} node `Link` type node.
 * @param {string} node.url The URI of the node.
 * @returns {UriList} An instance of `UriList`.
 */
const getUriListLink = node => new UriList().push(node.url, 'link');

/**
 * Retrieves URI from a given `Image` node and returns an instance of `UriList`.
 *
 * @param {Object} node `Image` type node.
 * @param {string} node.url The URI of the node.
 * @returns {UriList} An instance of `UriList`.
 */
const getUriListImage = node => new UriList().push(node.url, 'image');

/**
 * Retrieves URI from a given `Definition` node and returns an instance of `UriList`.
 *
 * @param {Object} node `Definition` type node.
 * @param {string} node.url The URI of the node.
 * @returns {Promise<UriList>} A `Promise` that resolves to an instance of `UriList` containing the URI if it is of type `'link'` or `'image'`, otherwise resolves to an empty `UriList`.
 */
const getUriListDefinition = async node => {
  const type = await getDefinitionNodeUriType(node.url);

  return ['link', 'image'].includes(type)
    ? new UriList().push(node.url, type)
    : new UriList();
};

/**
 * Parses the HTML content of the given node and retrieves all the `<a>` and `<img>` tag's URIs.
 *
 * @param {Object} node `Html` type node.
 * @param {string} node.value The raw HTML string.
 * @returns {UriList} An instance of `UriList`, containing all extracted `'link'` and `'image'` URIs.
 */
const getUriListHtml = node => {
  const uriList = new UriList();
  const $ = cheerio.load(node.value);

  $('a').each((_, a) => {
    uriList.push($(a).attr('href'), 'link');
  });
  $('img').each((_, img) => {
    uriList.push($(img).attr('src'), 'image');
  });

  return uriList;
};

/**
 * Retrieves the URI and creates an instance of `UriList` from a given `node`.
 *
 * @param {Object} node The node from which to retrieve the URI.
 * @param {string} node.type The type of the node, which should be `Link`, `Image`, `Definition`, or `Html`.
 * @returns {Promise<UriList>} A `Promise` that resolves to an instance of `UriList` retrieved from the `node`.
 * @throws Throws an `TypeError` error if `node.type` is not one of `Link`, `Image`, `Definition`, or `Html`.
 */
module.exports = async node => {
  switch (node.type) {
    case 'Link':
      return getUriListLink(node);
    case 'Image':
      return getUriListImage(node);
    case 'Definition':
      return getUriListDefinition(node);
    case 'Html':
      return getUriListHtml(node);
    default:
      throw new TypeError(
        `'${node.type}' is an invalid 'node.type' parameter. It should be 'Link', 'Image', 'Definition', or 'Html'`,
      );
  }
};
