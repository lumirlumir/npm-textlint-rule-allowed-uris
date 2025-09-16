/**
 * @fileoverview Entry point for the `textlint-rule-allowed-uris`.
 * DO NOT rename this file to `index.js`, as it is used as a RULE ID.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { parseFragment } from 'parse5';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * @import { TextlintRuleContext } from '@textlint/types';
 * @import { TxtLinkNode, TxtImageNode, TxtLinkReferenceNode, TxtImageReferenceNode, TxtDefinitionNode, TxtHtmlNode } from '@textlint/ast-node-types';
 * @import { DefaultTreeAdapterTypes } from 'parse5';
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
 * Mimics the behavior of `getElementsByTagName` in the DOM API.
 * @param {string} html The HTML string to parse.
 * @param {string} tagName The tag name to search for (case-insensitive).
 * @returns {Array<DefaultTreeAdapterTypes.Element | DefaultTreeAdapterTypes.Template>}
 */
function getElementsByTagName(html, tagName) {
  const ast = parseFragment(html);
  const normalizedTagName = tagName.toLowerCase();

  /** @type {Array<DefaultTreeAdapterTypes.Element | DefaultTreeAdapterTypes.Template>} */
  const nodes = [];

  /**
   * @param {DefaultTreeAdapterTypes.Node} node
   * @returns {void}
   */
  function visit(node) {
    if ('tagName' in node && node.tagName === normalizedTagName) {
      nodes.push(node);
    }

    if ('childNodes' in node) {
      node.childNodes.forEach(visit);
    }
  }

  visit(ast);

  return nodes;
}

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
 * Generates an error message for the specified `key`, `type`, `uri`, and `regexes`.
 * @param {'allowed' | 'disallowed'} key
 * @param {'links' | 'images'} type
 * @param {string} uri
 * @param {RegExp[]} regexes
 * @returns {string}
 */
function errorMessage(key, type, uri, regexes) {
  return `${error(`${key}.${type}`)}\n${error('-')} problem: '${strikethrough(uri)}'\n${error('-')} ${key} regular expressions: '${regexes.join(' or ')}'`;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * @param {TextlintRuleContext} context
 * @param {Options} rawOptions
 */
export default function textlintRuleAllowedUris(context, rawOptions) {
  /** @satisfies {Options} */
  const options = /** @type {const} */ ({
    allowed: {
      links: rawOptions?.allowed?.links ?? [/.*/u],
      images: rawOptions?.allowed?.images ?? [/.*/u],
    },
    disallowed: {
      links: rawOptions?.disallowed?.links ?? [],
      images: rawOptions?.disallowed?.images ?? [],
    },
    checkUnusedDefinitions: rawOptions?.checkUnusedDefinitions ?? false,
  });

  /** @type {Set<{ node: TxtLinkNode | TxtDefinitionNode | TxtHtmlNode, uri: string }>} */
  const links = new Set();
  /** @type {Set<{ node: TxtImageNode | TxtDefinitionNode | TxtHtmlNode, uri: string }>} */
  const images = new Set();

  /** @type {Set<string>} Set to track used link identifiers */
  const usedLinkIdentifiers = new Set();
  /** @type {Set<string>} Set to track used image identifiers */
  const usedImageIdentifiers = new Set();

  /** @type {Set<TxtDefinitionNode>} Set to store definition nodes */
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
      const html = node.value;

      getElementsByTagName(html, 'a').forEach(({ attrs }) => {
        attrs.forEach(({ name, value }) => {
          if (name === 'href') {
            links.add({ node, uri: value });
          }
        });
      });

      getElementsByTagName(html, 'img').forEach(({ attrs }) => {
        attrs.forEach(({ name, value }) => {
          if (name === 'src') {
            images.add({ node, uri: value });
          }
        });
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
            new context.RuleError(
              errorMessage('allowed', 'links', uri, options.allowed.links),
            ),
          );
        }

        if (options.disallowed.links.some(regex => regex.test(uri))) {
          context.report(
            node,
            new context.RuleError(
              errorMessage('disallowed', 'links', uri, options.disallowed.links),
            ),
          );
        }
      }

      for (const { node, uri } of images) {
        if (!options.allowed.images.some(regex => regex.test(uri))) {
          context.report(
            node,
            new context.RuleError(
              errorMessage('allowed', 'images', uri, options.allowed.images),
            ),
          );
        }

        if (options.disallowed.images.some(regex => regex.test(uri))) {
          context.report(
            node,
            new context.RuleError(
              errorMessage('disallowed', 'images', uri, options.disallowed.images),
            ),
          );
        }
      }
    },
  };
}
