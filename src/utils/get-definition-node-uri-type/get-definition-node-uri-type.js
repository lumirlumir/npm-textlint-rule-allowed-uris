/**
 * @fileoverview Retrieves the type of a given URI.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import url from 'node:url';
import mime from 'mime-types';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/**
 * Retrieves the MIME type of a given URI.
 * @param {string} uri The URI to check. It can be a remote or local URI.
 * @returns {Promise<string>} Resolves to the MIME type of the URI. Defaults to `application/octet-stream` if the MIME type can't be determined.
 * @async
 */
const getMimeType = async uri => {
  try {
    // fetch succeeded. (i.e. Remote URI links)
    const response = await fetch(uri, { method: 'HEAD' });
    return response.headers.get('content-type');
  } catch (err) {
    // fetch failed. (Internet connection)
    if (err?.cause?.code === 'ENOTFOUND')
      throw new Error(
        'The linting process includes an HTTP request, so an internet connection is required',
      );
    // fetch failed. (i.e. Local URI links)
    return mime.lookup(url.parse(uri).pathname) || 'application/octet-stream'; // eslint-disable-line -- TODO: Remove this comment.
  }
};

// --------------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------------

/**
 * Retrieves the type of a given URI.
 * @param {string} uri The URI to check. It can be a remote or local URI.
 * @returns {Promise<'comment' | 'image' | 'link'>} Resolves to `'comment'` for empty(` `) or hash-only(`#`) URIs, `'image'` if the URI's MIME type is an image, and `'link'` for other types of URIs.
 * @async
 */
export default async function getDefinitionNodeUriType(uri) {
  if (['', '#'].includes(uri)) return 'comment';
  if ((await getMimeType(uri)).startsWith('image/')) return 'image';
  return 'link';
}
