/**
 * @fileoverview Retrieves the URI and creates an instance of `UriTypes` from a given `node`.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const cheerio = require('cheerio');

const UriTypes = require('../uri-types');
const getDefinitionNodeUriType = require('../get-definition-node-uri-type');

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { TxtLinkNode, TxtImageNode, TxtDefinitionNode, TxtHtmlNode } from '@textlint/ast-node-types';
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/**
 * Retrieves URI from a given `Link` node and returns an instance of `UriTypes`.
 * @param {TxtLinkNode} node `Link` type node.
 */
const getUriTypesLink = ({ url }) => new UriTypes().push({ uri: url, type: 'link' });

/**
 * Retrieves URI from a given `Image` node and returns an instance of `UriTypes`.
 * @param {TxtImageNode} node `Image` type node.
 */
const getUriTypesImage = ({ url }) => new UriTypes().push({ uri: url, type: 'image' });

/**
 * Retrieves URI from a given `Definition` node and returns an instance of `UriTypes`.
 * @param {TxtDefinitionNode} node `Definition` type node.
 * @async
 */
const getUriTypesDefinition = async ({ url }) => {
  const type = await getDefinitionNodeUriType(url);

  return ['link', 'image'].includes(type)
    ? // @ts-ignore -- TODO
      new UriTypes().push({ uri: url, type })
    : new UriTypes();
};

/**
 * Parses the HTML content of the given node and retrieves all the `<a>` and `<img>` tag's URIs.
 * @param {TxtHtmlNode} node `Html` type node.
 */
const getUriTypesHtml = ({ value }) => {
  const uriTypes = new UriTypes();
  const $ = cheerio.load(value);

  $('a, img').each((_, elem) => {
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
 * @param {TxtLinkNode | TxtImageNode | TxtDefinitionNode | TxtHtmlNode} node The node from which to retrieve the URI.
 * @async
 */
module.exports = async function getUriTypes(node) {
  switch (node.type) {
    case 'Link':
      return getUriTypesLink(node);
    case 'Image':
      return getUriTypesImage(node);
    case 'Definition':
      return getUriTypesDefinition(node);
    case 'Html':
      return getUriTypesHtml(node);
    default: // Unreachable
      return undefined;
  }
};
