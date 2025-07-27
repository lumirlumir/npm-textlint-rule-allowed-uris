/**
 * @fileoverview Entry point for the `textlint-rule-allowed-uris`.
 * DO NOT rename this file to `index.js`, as it is used as a RULE ID.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import * as cheerio from 'cheerio';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { TextlintRuleContext } from '@textlint/types';
 * @import { TxtLinkNode, TxtImageNode, TxtLinkReferenceNode, TxtImageReferenceNode, TxtDefinitionNode, TxtHtmlNode } from '@textlint/ast-node-types';
 */

/**
 * @typedef {object} Options
 * @property {object} [allowed] Specifies `allowed` URI patterns.
 * @property {RegExp[]} [allowed.links] Array of regular expressions for allowed links URIs. (default: `new RegExp('.*', 'u')`)
 * @property {RegExp[]} [allowed.images] Array of regular expressions for allowed images URIs. (default: `new RegExp('.*', 'u')`)
 * @property {object} [disallowed] Specifies `disallowed` URI patterns.
 * @property {RegExp[]} [disallowed.links] Array of regular expressions for disallowed links URIs. (default: `[]`)
 * @property {RegExp[]} [disallowed.images] Array of regular expressions for disallowed images URIs. (default: `[]`)
 * @property {boolean} [checkUnusedDefinitions] If `true`, the rule will check for unused definitions. (default: `false`)
 */

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/**
 * Console error theme.
 * @param {string} str
 * @returns {string}
 */
function error(str) {
  return `\u001b[31m${str}\u001b[0m`;
}

/**
 * Console strikethrough theme.
 * @param {string} str
 * @returns {string}
 */
function strikethrough(str) {
  return `\u001b[9m${str}\u001b[0m`;
}

/**
 * Generates an error message for the specified `key`, `type`, `uri`, and `options`.
 * @param {'allowed' | 'disallowed'} key
 * @param {'links' | 'images'} type
 * @param {string} uri
 * @param {Options} options
 * @returns {string}
 */
function errorMessage(key, type, uri, options) {
  return `${error(`${key}.${type}`)}\n${error('-')} problem: '${strikethrough(uri)}'\n${error('-')} ${key} regular expressions: '${options[key][type].join(' or ')}'`;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * @param {TextlintRuleContext} context
 * @param {Options} rawOptions
 */
export default function textlintRuleAllowedUris(context, rawOptions) {
  /** @type {Options} */
  const options = {
    allowed: {
      links: rawOptions?.allowed?.links ?? [/.*/u],
      images: rawOptions?.allowed?.images ?? [/.*/u],
    },
    disallowed: {
      links: rawOptions?.disallowed?.links ?? [],
      images: rawOptions?.disallowed?.images ?? [],
    },
    checkUnusedDefinitions: rawOptions?.checkUnusedDefinitions ?? false,
  };

  /** @type {Set<{ node: TxtLinkNode | TxtDefinitionNode | TxtHtmlNode, uri: string }>} */
  const links = new Set();
  /** @type {Set<{ node: TxtImageNode | TxtDefinitionNode | TxtHtmlNode, uri: string }>} */
  const images = new Set();

  /** @type {Set<string>} Set to track used link identifiers */
  const usedLinkIdentifiers = new Set();
  /** @type {Set<string>} Set to track used image identifiers */
  const usedImageIdentifiers = new Set();

  /** @type {Set<TxtDefinitionNode>} Array to store definition nodes */
  const definitions = new Set();

  return {
    /** @param {TxtLinkNode} node */
    Link(node) {
      links.add({ node, uri: node.url });
    },

    /** @param {TxtImageNode} node */
    Image(node) {
      images.add({ node, uri: node.url });
    },

    /** @param {TxtHtmlNode} node */
    Html(node) {
      const $ = cheerio.load(node.value);

      $('a, img').each((_, elem) => {
        const tag = $(elem).prop('tagName').toLowerCase();

        if (tag === 'a') {
          const href = $(elem).attr('href');
          if (href) {
            links.add({ node, uri: href });
          }
        } else if (tag === 'img') {
          const src = $(elem).attr('src');
          if (src) {
            images.add({ node, uri: src });
          }
        }
      });
    },

    /** @param {TxtLinkReferenceNode} node */
    LinkReference(node) {
      usedLinkIdentifiers.add(node.identifier);
    },

    /** @param {TxtImageReferenceNode} node */
    ImageReference(node) {
      usedImageIdentifiers.add(node.identifier);
    },

    /** @param {TxtDefinitionNode} node */
    Definition(node) {
      if (node.identifier === '//') {
        return;
      } // Ignore definitions with identifier '//'.

      definitions.add(node);
    },

    'Document:exit'() {
      for (const definition of definitions) {
        if (usedLinkIdentifiers.has(definition.identifier)) {
          links.add({ node: definition, uri: definition.url });
        }

        if (usedImageIdentifiers.has(definition.identifier)) {
          images.add({ node: definition, uri: definition.url });
        }

        if (
          options.checkUnusedDefinitions &&
          !usedLinkIdentifiers.has(definition.identifier) &&
          !usedImageIdentifiers.has(definition.identifier)
        ) {
          context.report(
            definition,
            new context.RuleError(
              `Unexpected unused definition \`${definition.identifier}\` found.`,
            ),
          );
        }
      }

      /*
       * The `some` method returns `true` if any element in the array satisfies the given condition.
       * In the case of an empty array, there are no elements to satisfy the condition, so the method returns `false`.
       * Therefore, calling the `some` method on an empty array will always return `false`.
       */

      for (const { node, uri } of links) {
        if (!options.allowed.links.some(regex => regex.test(uri))) {
          context.report(
            node,
            new context.RuleError(errorMessage('allowed', 'links', uri, options)),
          );
        }

        if (options.disallowed.links.some(regex => regex.test(uri))) {
          context.report(
            node,
            new context.RuleError(errorMessage('disallowed', 'links', uri, options)),
          );
        }
      }

      for (const { node, uri } of images) {
        if (!options.allowed.images.some(regex => regex.test(uri))) {
          context.report(
            node,
            new context.RuleError(errorMessage('allowed', 'images', uri, options)),
          );
        }

        if (options.disallowed.images.some(regex => regex.test(uri))) {
          context.report(
            node,
            new context.RuleError(errorMessage('disallowed', 'images', uri, options)),
          );
        }
      }
    },
  };
}
