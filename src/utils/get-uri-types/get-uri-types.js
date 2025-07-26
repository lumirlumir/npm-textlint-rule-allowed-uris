/**
 * @fileoverview Retrieves the URI and creates an instance of `UriTypes` from a given `node`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import * as cheerio from 'cheerio';
import getDefinitionNodeUriType from '../get-definition-node-uri-type/index.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { TxtLinkNode, TxtImageNode, TxtDefinitionNode, TxtHtmlNode } from '@textlint/ast-node-types';
 * @import { UriType } from '../../types/index.js';
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Retrieves URI from a given `Link` node and returns `UriType` array.
 * @param {TxtLinkNode} node `Link` type node.
 * @return {UriType[]}
 */
export const getUriTypesLink = ({ url }) => [{ uri: url, type: 'link' }];

/**
 * Retrieves URI from a given `Image` node and returns `UriType` array.
 * @param {TxtImageNode} node `Image` type node.
 * @return {UriType[]}
 */
export const getUriTypesImage = ({ url }) => [{ uri: url, type: 'image' }];

/**
 * Retrieves URI from a given `Definition` node and returns `UriType` array.
 * @param {TxtDefinitionNode} node `Definition` type node.
 * @return {Promise<UriType[]>}
 * @async
 */
export const getUriTypesDefinition = async ({ url }) => {
  const type = await getDefinitionNodeUriType(url);

  return type === 'link' || type === 'image' ? [{ uri: url, type }] : [];
};

/**
 * Parses the HTML content of the given node and retrieves all the `<a>` and `<img>` tag's URIs.
 * @param {TxtHtmlNode} node `Html` type node.
 * @return {UriType[]}
 */
export const getUriTypesHtml = ({ value }) => {
  /** @type {UriType[]} */
  const uriTypes = [];
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
