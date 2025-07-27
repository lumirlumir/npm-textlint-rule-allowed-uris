/**
 * @fileoverview Define common types.
 */

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
   * @default true
   */
  checkUnusedDefinitions?: boolean;
}
