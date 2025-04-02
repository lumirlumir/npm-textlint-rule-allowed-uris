/**
 * @fileoverview Define common types.
 */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {object} UriType `{uri: '...', type: '...'}` object.
 * @property {string} uri The URI. It should be `string` type.
 * @property {'link' | 'image'} type The type of URI. It should be either `'link'` or `'image'`.
 */

/**
 * @typedef {object} Options Options for the rule.
 * @property {object} [options.allowed] Object specifying `allowed` URI patterns.
 * @property {RegExp[]} [options.allowed.links] Array of regular expressions for allowed links URIs.
 * @property {RegExp[]} [options.allowed.images] Array of regular expressions for allowed images URIs.
 * @property {object} [options.disallowed] Object specifying `disallowed` URI patterns.
 * @property {RegExp[]} [options.disallowed.links] Array of regular expressions for disallowed links URIs.
 * @property {RegExp[]} [options.disallowed.images] Array of regular expressions for disallowed images URIs.
 */

// --------------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------------

module.exports = {};
