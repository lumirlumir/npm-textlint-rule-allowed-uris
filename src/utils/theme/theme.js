/**
 * @fileoverview Console theme.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const c = require('ansi-colors');

// --------------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------------

/** Console error theme. */
module.exports.error = c.red.bold;
/** Console highlight theme. */
module.exports.highlight = c.white.bold;
/** Console strikethrough theme. */
module.exports.strikethrough = c.white.bold.strikethrough;
