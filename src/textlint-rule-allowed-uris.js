/**
 * @fileoverview Entry point for the `textlint-rule-allowed-uris`.
 * DO NOT rename this file to `index.js`, as it is used as a RULE ID.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const { error, strikethrough } = require('./utils/theme');
const {
  getUriTypesLink,
  getUriTypesImage,
  getUriTypesDefinition,
  getUriTypesHtml,
} = require('./utils/get-uri-types');

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { TextlintRuleContext } from '@textlint/types';
 * @import { TxtLinkNode, TxtImageNode, TxtDefinitionNode, TxtHtmlNode } from '@textlint/ast-node-types';
 * @import { UriType, Options } from './types';
 */

// --------------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------------

/**
 * Entry point for the `textlint-rule-allowed-uris` rule.
 * @param {TextlintRuleContext} context Context object.
 * @param {Options} rawOptions Configuration options.
 */
module.exports = (context, rawOptions) => {
  /** @type {Options} */
  const options = {
    allowed: {
      links: rawOptions?.allowed?.links ?? [/.*/],
      images: rawOptions?.allowed?.images ?? [/.*/],
    },
    disallowed: {
      links: rawOptions?.disallowed?.links ?? [],
      images: rawOptions?.disallowed?.images ?? [],
    },
  };

  /**
   * The main reporter function that processes the node and reports any issues based on the specified options.
   * @param {TxtLinkNode | TxtImageNode | TxtDefinitionNode | TxtHtmlNode} node
   * @param {UriType[]} uriTypes
   * @returns {Promise<void>}
   * @async
   */
  const report = async (node, uriTypes) => {
    uriTypes.forEach(({ uri, type }) => {
      Object.keys(options).forEach(key => {
        // The `some` method returns `true` if any element in the array satisfies the given condition.
        // In the case of an empty array, there are no elements to satisfy the condition, so the method returns `false`.
        // Therefore, calling the `some` method on an empty array will always return `false`.
        if (
          key === 'allowed'
            ? !options[key][`${type}s`].some(regex => regex.test(uri))
            : options[key][`${type}s`].some(regex => regex.test(uri))
        )
          context.report(
            node,
            new context.RuleError(
              `${error(`${key}.${type}s`)}\n${error('-')} problem: '${strikethrough(uri)}'\n${error('-')} ${key} regular expressions: '${options[key][`${type}s`].join(' or ')}'`,
              {
                padding: context.locator.at(0),
              },
            ),
          );
      });
    });
  };

  return {
    /** @param {TxtLinkNode} node */
    Link(node) {
      return report(node, getUriTypesLink(node).uriTypes);
    },

    /** @param {TxtImageNode} node */
    Image(node) {
      return report(node, getUriTypesImage(node).uriTypes);
    },

    /** @param {TxtDefinitionNode} node */
    async Definition(node) {
      return report(node, (await getUriTypesDefinition(node)).uriTypes);
    },

    /** @param {TxtHtmlNode} node */
    Html(node) {
      return report(node, getUriTypesHtml(node).uriTypes);
    },
  };
};
