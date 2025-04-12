/**
 * `testCases` for `textlint-rule-allowed-uris.test.js`
 */
module.exports = [
  /* Pass values */
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
