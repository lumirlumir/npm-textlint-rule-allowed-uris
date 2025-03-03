const url = require('node:url');
const c = require('ansi-colors');
const mime = require('mime-types');
const axios = require('axios');

/**
 * Retrieves the MIME type of a given URI.
 *
 * @async
 * @param {string} uri The URI to check. It can be a remote or local URI.
 * @returns {Promise<string>} A promise that resolves to the MIME type of the URI. Defaults to `application/octet-stream` if the MIME type can't be determined.
 */
const getMimeType = async uri => {
  try {
    // fetch succeeded. (i.e. Remote URI links)
    return (await axios.head(uri)).headers['content-type'];
  } catch (err) {
    // fetch failed. (Internet connection)
    if (err.code === 'ENOTFOUND')
      throw new Error(
        c.red.bold(
          'The linting process includes an HTTP request, so an internet connection is required',
        ),
      );
    // fetch failed. (i.e. Local URI links)
    return mime.lookup(url.parse(uri).pathname) || 'application/octet-stream'; // eslint-disable-line -- TODO: Remove this comment.
  }
};

/**
 * Retrieves the type of a given URI.
 *
 * @async
 * @param {string} uri The URI to check. It can be a remote or local URI.
 * @returns {Promise<string>} A promise that resolves to `'comment'` for empty(` `) or hash-only(`#`) URIs, `'image'` if the URI's MIME type is an image, and `'link'` for other types of URIs.
 */
module.exports = async uri => {
  if (['', '#'].includes(uri)) return 'comment';
  if ((await getMimeType(uri)).startsWith('image/')) return 'image';
  return 'link';
};
