/**
 * @fileoverview Manage an array of `UriType` objects.
 *
 * - The `UriTypes` class is introduced to manage `UriType` in a CONSISTENT manner.
 * - In the case of the `getUriTypesHtml` function in `get-uri-types.js` file, it can return multiple `UriType`, so the `UriTypes` class is used to manage them.
 */

// @ts-check

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import('../../types/index.js').UriType} UriType
 */

// --------------------------------------------------------------------------------
// Class
// --------------------------------------------------------------------------------

/**
 * Manage an array of `UriType` objects.
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
class UriTypes {
  // ------------------------------------------------------------------------------
  // Private Properties
  // ------------------------------------------------------------------------------

  /** @type {UriType[]} */
  #uriTypes = [];

  // ------------------------------------------------------------------------------
  // Public Methods
  // ------------------------------------------------------------------------------

  /**
   * Pushes a new `UriType` object.
   *
   * @param {UriType} uriType The `UriType` object.
   * @returns {this} The current instance of `UriTypes` to allow for method chaining.
   */
  push(uriType) {
    const { uri, type } = uriType;

    if (typeof uri !== 'string')
      throw new TypeError(
        `\`${uri}\` is an invalid \`uri\` parameter. It should be \`string\` type`,
      );
    if (!['link', 'image'].includes(type))
      throw new TypeError(
        `\`${type}\` is an invalid \`type\` parameter. It should be either \`'link'\` or \`'image'\``,
      );

    this.#uriTypes = [...this.#uriTypes, uriType];

    return this;
  }

  // ------------------------------------------------------------------------------
  // Getters and Setters
  // ------------------------------------------------------------------------------

  /**
   * Returns an array of `UriType` objects.
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
  get uriTypes() {
    return this.#uriTypes;
  }
}

// --------------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------------

module.exports = UriTypes;
