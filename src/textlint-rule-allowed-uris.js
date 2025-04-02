/**
 * @fileoverview Entry file for the `textlint-rule-allowed-uris`.
 * IMPORTANT: It is crucial that the filename of this file MUST NOT be changed to `index.js`, as it is used as a RULE ID.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const { error, strikethrough } = require('./utils/theme');
const getUriTypes = require('./utils/get-uri-types');

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @typedef {import('@textlint/types').TextlintRuleContext} TextlintRuleContext
 * @typedef {import('@textlint/ast-node-types').TxtLinkNode} TxtLinkNode
 * @typedef {import('@textlint/ast-node-types').TxtImageNode} TxtImageNode
 * @typedef {import('@textlint/ast-node-types').TxtDefinitionNode} TxtDefinitionNode
 * @typedef {import('@textlint/ast-node-types').TxtHtmlNode} TxtHtmlNode
 * @typedef {import('./types').Options} Options
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/**
 * The main reporter function that processes the node and reports any issues based on the specified options.
 * @param {TextlintRuleContext} context The context object provided to the `reporter`.
 * @param {Options} options Configuration options containing `allowed` and `disallowed` URI patterns.
 * @param {TxtLinkNode | TxtImageNode | TxtDefinitionNode | TxtHtmlNode} node The node to be processed, containing potential URIs.
 * @returns {Promise<void>}
 * @async
 */
const reporter = async ({ report, locator, RuleError }, options, node) => {
  // ------------------------------------------------------------------------------
  // Initialize Options
  // ------------------------------------------------------------------------------

  /** @type {Options} */
  const regexes = {
    allowed: {
      links: options?.allowed?.links ?? [/.*/],
      images: options?.allowed?.images ?? [/.*/],
    },
    disallowed: {
      links: options?.disallowed?.links ?? [],
      images: options?.disallowed?.images ?? [],
    },
  };

  // ------------------------------------------------------------------------------
  // Report
  // ------------------------------------------------------------------------------

  (await getUriTypes(node)).uriTypes.forEach(({ uri, type }) => {
    Object.keys(regexes).forEach(key => {
      // The `some` method returns `true` if any element in the array satisfies the given condition. In the case of an empty array, there are no elements to satisfy the condition, so the method returns `false`. Therefore, calling the `some` method on an empty array will always return `false`.
      if (
        key === 'allowed'
          ? !regexes[key][`${type}s`].some(regex => regex.test(uri))
          : regexes[key][`${type}s`].some(regex => regex.test(uri))
      )
        report(
          node,
          new RuleError(
            `${error(`${key}.${type}s`)}\n${error('-')} problem: '${strikethrough(uri)}'\n${error('-')} ${key} regular expressions: '${regexes[key][`${type}s`].join(' or ')}'`,
            {
              padding: locator.at(0),
            },
          ),
        );
    });
  });
};

// --------------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------------

/**
 * The module export function that returns an object mapping node types to the `reporter` function.
 * @param {TextlintRuleContext} context The context object provided to the `reporter`.
 * @param {Options} options Configuration options for the `reporter`.
 */
module.exports = (context, options) =>
  Object.fromEntries(
    ['Link', 'Image', 'Definition', 'Html'].map(type => [
      type,
      async node => reporter(context, options, node),
    ]),
  );
