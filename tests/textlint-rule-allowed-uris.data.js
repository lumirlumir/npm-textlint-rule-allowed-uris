/**
 * `testCases` for `textlint-rule-allowed-uris.spec.js`
 */
module.exports = [
  /* Totally empty */
  {
    options: {
      // allowed: {
      //   links: [],
      //   images: [],
      // },
      // disallowed: {
      //   links: [],
      //   images: [],
      // },
    },
    lines: [],
  },
  {
    options: {
      allowed: {
        // links: [],
        // images: [],
      },
      // disallowed: {
      //   links: [],
      //   images: [],
      // },
    },
    lines: [],
  },
  {
    options: {
      // allowed: {
      //   links: [],
      //   images: [],
      // },
      disallowed: {
        // links: [],
        // images: [],
      },
    },
    lines: [],
  },
  {
    options: {
      allowed: {
        // links: [],
        // images: [],
      },
      disallowed: {
        // links: [],
        // images: [],
      },
    },
    lines: [],
  },

  /* Pass empty array */
  {
    options: {
      allowed: {
        links: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `links` will be detected.
        // images: [],
      },
      disallowed: {
        // links: [],
        // images: [],
      },
    },
    lines: [7, 9, 13, 15, 19, 21, 23, 25, 31, 37, 43, 47, 86, 101, 103, 105],
  },
  {
    options: {
      allowed: {
        // links: [],
        images: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `images` will be detected.
      },
      disallowed: {
        // links: [],
        // images: [],
      },
    },
    lines: [53, 59, 65, 71, 75, 77, 79, 86, 105],
  },
  {
    options: {
      allowed: {
        links: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `links` will be detected.
        images: [], // Act like an whitelist. i.e. Empty array allows nothing. Every `images` will be detected.
      },
      disallowed: {
        // links: [],
        // images: [],
      },
    },
    lines: [
      7, 9, 13, 15, 19, 21, 23, 25, 31, 37, 43, 47, 53, 59, 65, 71, 75, 77, 79, 86, 86,
      101, 103, 105, 105,
    ], // `86` and `105` are same line number, but detected twice. one for `links` and the other for `images`
  },
  {
    options: {
      allowed: {
        // links: [],
        // images: [],
      },
      disallowed: {
        links: [], // Act like a blacklist. i.e. Empty array allows everything. No `links` will be detected.
        // images: [],
      },
    },
    lines: [],
  },
  {
    options: {
      allowed: {
        // links: [],
        // images: [],
      },
      disallowed: {
        // links: [],
        images: [], // Act like a blacklist. i.e. Empty array allows everything. No `images` will be detected.
      },
    },
    lines: [],
  },
  {
    options: {
      allowed: {
        // links: [],
        // images: [],
      },
      disallowed: {
        links: [], // Act like a blacklist. i.e. Empty array allows everything. No `images` will be detected.
        images: [], // Act like a blacklist. i.e. Empty array allows everything. No `images` will be detected.
      },
    },
    lines: [],
  },

  /* Pass values */
  // `allowed.links`
  {
    options: {
      allowed: {
        links: [/google/],
        // images: [],
      },
      // disallowed: {
      //   links: [],
      //   images: [],
      // },
    },
    lines: [9, 15, 21, 23, 25, 86, 101, 103],
  },
  {
    options: {
      allowed: {
        links: [/google/, /gmail/],
        // images: [],
      },
      // disallowed: {
      //   links: [],
      //   images: [],
      // },
    },
    lines: [21, 23, 25, 86, 101, 103],
  },
  {
    options: {
      allowed: {
        links: [/google/, /gmail/, /README.md/],
        // images: [],
      },
      // disallowed: {
      //   links: [],
      //   images: [],
      // },
    },
    lines: [21, 23, 86, 103],
  },
  // `allowed.images`
  {
    options: {
      allowed: {
        // links: [],
        images: [/wiki/],
      },
      // disallowed: {
      //   links: [],
      //   images: [],
      // },
    },
    lines: [],
  },
  // `disallowed.links`
  {
    options: {
      // allowed: {
      //   links: [],
      //   images: [],
      // },
      disallowed: {
        links: [/google/],
        // images: [],
      },
    },
    lines: [7, 13, 19, 31, 37, 43, 47, 105],
  },
  {
    options: {
      // allowed: {
      //   links: [],
      //   images: [],
      // },
      disallowed: {
        links: [/google/, /gmail/],
        // images: [],
      },
    },
    lines: [7, 9, 13, 15, 19, 31, 37, 43, 47, 105],
  },
  {
    options: {
      // allowed: {
      //   links: [],
      //   images: [],
      // },
      disallowed: {
        links: [/google/, /gmail/, /README.md/],
        // images: [],
      },
    },
    lines: [7, 9, 13, 15, 19, 25, 31, 37, 43, 47, 101, 105],
  },
  // `disallowed.images`
  {
    options: {
      // allowed: {
      //   links: [],
      //   images: [],
      // },
      disallowed: {
        // links: [],
        images: [/wiki/],
      },
    },
    lines: [53, 59, 65, 71, 75, 77, 79, 86, 105],
  },

  /* Pass same values to `allowed` and `disallowed` */
  {
    options: {
      allowed: {
        links: [/google/],
        // images: [],
      },
      disallowed: {
        links: [/google/],
        // images: [],
      },
    },
    lines: [7, 9, 13, 15, 19, 21, 23, 25, 31, 37, 43, 47, 86, 101, 103, 105], // Every `links` will be detected.
  },
  {
    options: {
      allowed: {
        // links: [],
        images: [/wiki/],
      },
      disallowed: {
        // links: [],
        images: [/wiki/],
      },
    },
    lines: [53, 59, 65, 71, 75, 77, 79, 86, 105], // Every `images` will be detected.
  },
];
