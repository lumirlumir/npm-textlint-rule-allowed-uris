/**
 * @fileoverview Entry point for the `textlint-rule-allowed-uris`.
 * DO NOT rename this file to `index.js`, as it is used as a RULE ID.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { getUriTypesDefinition, getUriTypesHtml } from './utils/get-uri-types/index.js';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { TextlintRuleContext } from '@textlint/types';
 * @import { TxtLinkNode, TxtImageNode, TxtDefinitionNode, TxtHtmlNode } from '@textlint/ast-node-types';
 * @import { UriType, Options } from './utils/types.js';
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/**
 * Console error theme.
 * @param {string} str
 * @return {string}
 */
function error(str) {
  return `\u001b[31m${str}\u001b[0m`;
}

/**
 * Console strikethrough theme.
 * @param {string} str
 * @return {string}
 */
function strikethrough(str) {
  return `\u001b[9m${str}\u001b[0m`;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Entry point for the `textlint-rule-allowed-uris` rule.
 * @param {TextlintRuleContext} context Context object.
 * @param {Options} rawOptions Configuration options.
 */
export default function textlintRuleAllowedUris(context, rawOptions) {
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
  async function report(node, uriTypes) {
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
            ),
          );
      });
    });
  }

  return {
    /** @param {TxtLinkNode} node */
    Link(node) {
      return report(node, [{ uri: node.url, type: 'link' }]);
    },

    /** @param {TxtImageNode} node */
    Image(node) {
      return report(node, [{ uri: node.url, type: 'image' }]);
    },

    /** @param {TxtDefinitionNode} node */
    async Definition(node) {
      return report(node, await getUriTypesDefinition(node));
    },

    /** @param {TxtHtmlNode} node */
    Html(node) {
      return report(node, getUriTypesHtml(node));
    },
  };
}
