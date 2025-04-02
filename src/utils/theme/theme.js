/**
 * @fileoverview Console theme.
 */

// --------------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------------

/** Console error theme. @param {string} str */
module.exports.error = str => `\u001b[31m${str}\u001b[0m`;
/** Console strikethrough theme. @param {string} str */
module.exports.strikethrough = str => `\u001b[9m${str}\u001b[0m`;
