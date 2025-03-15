/**
 * @fileoverview
 *
 * IMPORTANT: It is crucial that the filename of this file MUST be changed to `index.js`, as it is used as a RULE ID.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const { error, highlight, strikethrough } = require('./utils/theme');
const getUriTypes = require('./utils/get-uri-types');

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/**
 * The main reporter function that processes the node and reports any issues based on the specified options.
 *
 * @async
 * @param {Object} context The context object containing the `report`, `locator`, and `RuleError`.
 * @param {function} context.report Function to report errors or issues.
 * @param {function} context.locator Function to locate the position of the node in the source.
 * @param {function} context.RuleError Constructor to create a new rule error.
 * @param {Object} options Configuration options containing `allowed` and `disallowed` URI patterns.
 * @param {Object} [options.allowed] Object specifying `allowed` URI patterns.
 * @param {RegExp[]} [options.allowed.links] Array of regular expressions for allowed links URIs.
 * @param {RegExp[]} [options.allowed.images] Array of regular expressions for allowed images URIs.
 * @param {Object} [options.disallowed] Object specifying `disallowed` URI patterns.
 * @param {RegExp[]} [options.disallowed.links] Array of regular expressions for disallowed links URIs.
 * @param {RegExp[]} [options.disallowed.images] Array of regular expressions for disallowed images URIs.
 * @param {Object} node The node to be processed, containing potential URIs.
 * @returns {Promise<void>} A `Promise` that resolves when the reporting is completed.
 */
const reporter = async ({ report, locator, RuleError }, options, node) => {
  /* Initialize options */
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

  /* Report process */
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
            `${error(`${key}.${type}s`)}\n${error('-')} problem: '${strikethrough(uri)}'\n${error('-')} ${key} regular expressions: '${highlight(regexes[key][`${type}s`].join(' or '))}'`,
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
 *
 * @param {Object} context The context object provided to the `reporter`.
 * @param {Object} options Configuration options for the `reporter`.
 * @returns {Object} An object with node type keys mapping to the `reporter` function.
 */
module.exports = (context, options) =>
  Object.fromEntries(
    ['Link', 'Image', 'Definition', 'Html'].map(type => [
      type,
      async node => reporter(context, options, node),
    ]),
  );
