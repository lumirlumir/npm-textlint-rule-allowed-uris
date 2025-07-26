/**
 * @fileoverview Define common types.
 */

// --------------------------------------------------------------------------------
// Typedefs
// --------------------------------------------------------------------------------

export interface UriType {
  /**
   * The URI. It should be `string` type.
   */
  uri: string;

  /**
   * The type of URI. It should be either `'link'` or `'image'`.
   */
  type: 'link' | 'image';
}

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
     */
    links?: RegExp[];

    /**
     * Array of regular expressions for allowed images URIs.
     */
    images?: RegExp[];
  };

  /**
   * Specifies `disallowed` URI patterns.
   */
  disallowed?: {
    /**
     * Array of regular expressions for disallowed links URIs.
     */
    links?: RegExp[];

    /**
     * Array of regular expressions for disallowed images URIs.
     */
    images?: RegExp[];
  };
}
