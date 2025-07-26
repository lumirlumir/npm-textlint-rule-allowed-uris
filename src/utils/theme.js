/**
 * @fileoverview Console theme.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** Console error theme. @param {string} str */
export const error = str => `\u001b[31m${str}\u001b[0m`;

/** Console strikethrough theme. @param {string} str */
export const strikethrough = str => `\u001b[9m${str}\u001b[0m`;
