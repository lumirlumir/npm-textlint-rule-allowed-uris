/**
 * @fileoverview Entry point for the `textlint-rule-allowed-uris`.
 * DO NOT rename this file to `index.js`, as it is used as a RULE ID.
 */

/* eslint n/no-unpublished-import: ["error", { ignoreTypeImport: true }] -- TODO */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import * as cheerio from 'cheerio';

import type { TextlintRuleContext } from '@textlint/types';
import type {
  TxtLinkNode,
  TxtImageNode,
  TxtLinkReferenceNode,
  TxtImageReferenceNode,
  TxtDefinitionNode,
  TxtHtmlNode,
} from '@textlint/ast-node-types';

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

/**
 * Options for the rule.
 */
export interface Options {
  /**
   * Specifies `allowed` URI patterns.
   */
  allowed?: {
    /**
     * Array of regular expressions for allowed links URIs.
     * @default [new RegExp('.*', 'u')]
     */
    links?: RegExp[];

    /**
     * Array of regular expressions for allowed images URIs.
     * @default [new RegExp('.*', 'u')]
     */
    images?: RegExp[];
  };

  /**
   * Specifies `disallowed` URI patterns.
   */
  disallowed?: {
    /**
     * Array of regular expressions for disallowed links URIs.
     * @default []
     */
    links?: RegExp[];

    /**
     * Array of regular expressions for disallowed images URIs.
     * @default []
     */
    images?: RegExp[];
  };

  /**
   * If `true`, the rule will check for unused definitions.
   * @default false
   */
  checkUnusedDefinitions?: boolean;
}

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/** Console error theme. */
function error(str: string): string {
  return `\u001b[31m${str}\u001b[0m`;
}

/** Console strikethrough theme. */
function strikethrough(str: string): string {
  return `\u001b[9m${str}\u001b[0m`;
}

/** Generates an error message for the specified `key`, `type`, `uri`, and `options`. */
function errorMessage(
  key: 'allowed' | 'disallowed',
  type: 'links' | 'images',
  uri: string,
  options: Options,
): string {
  return `${error(`${key}.${type}`)}\n${error('-')} problem: '${strikethrough(uri)}'\n${error('-')} ${key} regular expressions: '${options[key][type].join(' or ')}'`;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function textlintRuleAllowedUris(
  context: TextlintRuleContext,
  rawOptions: Options,
) {
  const options: Options = {
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

  const links = new Set<{
    node: TxtLinkNode | TxtDefinitionNode | TxtHtmlNode;
    uri: string;
  }>();
  const images = new Set<{
    node: TxtImageNode | TxtDefinitionNode | TxtHtmlNode;
    uri: string;
  }>();

  /** Set to track used link identifiers */
  const usedLinkIdentifiers = new Set<string>();
  /** Set to track used image identifiers */
  const usedImageIdentifiers = new Set<string>();

  /** Array to store definition nodes */
  const definitions = new Set<TxtDefinitionNode>();

  return {
    Link(node: TxtLinkNode) {
      links.add({ node, uri: node.url });
    },

    Image(node: TxtImageNode) {
      images.add({ node, uri: node.url });
    },

    Html(node: TxtHtmlNode) {
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

    LinkReference(node: TxtLinkReferenceNode) {
      usedLinkIdentifiers.add(node.identifier);
    },

    ImageReference(node: TxtImageReferenceNode) {
      usedImageIdentifiers.add(node.identifier);
    },

    Definition(node: TxtDefinitionNode) {
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
