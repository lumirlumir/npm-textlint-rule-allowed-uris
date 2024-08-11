/**
 * This class manages an URI list using an array of `{uri: '...', type: '...'}` objects.
 *
 * @example
 * [
 *   // ...
 *   {
 *     uri: 'https://www.google.com'
 *     type: 'link',
 *   },
 *   {
 *     uri: 'https://placehold.co/600x400'
 *     type: 'image',
 *   }
 *   // ...
 * ]
 */
module.exports = class UriList {
  /**
   * Private. Stores `{uri: '...', type: '...'}` objects.
   */
  #uriList = [];

  /**
   * Returns an array of `{uri: '...', type: '...'}` objects.
   *
   * @returns {Array} See example.
   * @example
   * [
   *   // ...
   *   {
   *     uri: 'https://www.google.com'
   *     type: 'link',
   *   },
   *   {
   *     uri: 'https://placehold.co/600x400'
   *     type: 'image',
   *   }
   *   // ...
   * ]
   */
  get uriList() {
    return this.#uriList;
  }

  /**
   * Pushes a new `{uri: '...', type: '...'}` object.
   *
   * @param {string} uri The URI. It should be `'string'` type.
   * @param {string} type The type of URI. It should be either `'link'` or `'image'`.
   * @returns {UriList} The current instance of `UriList` to allow for method chaining.
   */
  push(uri, type) {
    if (typeof uri !== 'string')
      throw new TypeError(
        `'${uri}' is an invalid 'uri' parameter. It should be 'string' type`,
      );
    if (!['link', 'image'].includes(type))
      throw new TypeError(
        `'${type}' is an invalid 'type' parameter. It should be either 'link' or 'image'`,
      );

    this.#uriList = [...this.#uriList, { uri, type }];

    return this;
  }
};
