/**
 * @fileoverview Test for `get-uri-types.js`.
 */

// --------------------------------------------------------------------------------
// Require
// --------------------------------------------------------------------------------

const { deepStrictEqual } = require('node:assert');
const { describe, it } = require('node:test');

const getUriTypes = require('./get-uri-types');

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('get-uri-types.js', () => {
  describe('Link', () => {
    describe('`Link` node', () => {
      it('A `Link` node starting with `https://` should have type `link` in `UriType`', async () => {
        const actual = {
          type: 'Link',
          title: null,
          url: 'https://www.google.com',
          children: [
            {
              type: 'Str',
              value: 'https://www.google.com',
              loc: {
                start: {
                  line: 5,
                  column: 0,
                },
                end: {
                  line: 5,
                  column: 22,
                },
              },
              range: [42, 64],
              raw: 'https://www.google.com',
            },
          ],
          loc: {
            start: {
              line: 5,
              column: 0,
            },
            end: {
              line: 5,
              column: 22,
            },
          },
          range: [42, 64],
          raw: 'https://www.google.com',
        };
        const expected = [
          {
            uri: 'https://www.google.com',
            type: 'link',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });

      it('A `Link` node starting with `https://` and with a title should have type `link` in `UriType`', async () => {
        const actual = {
          type: 'Link',
          title: 'Hello Google',
          url: 'https://www.google.com',
          children: [
            {
              type: 'Str',
              value: 'google',
              loc: {
                start: {
                  line: 17,
                  column: 1,
                },
                end: {
                  line: 17,
                  column: 7,
                },
              },
              range: [195, 201],
              raw: 'google',
            },
          ],
          loc: {
            start: {
              line: 17,
              column: 0,
            },
            end: {
              line: 17,
              column: 47,
            },
          },
          range: [194, 241],
          raw: '[google](https://www.google.com "Hello Google")',
        };
        const expected = [
          {
            uri: 'https://www.google.com',
            type: 'link',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });

      it('A `Link` node starting with `mailto:` should have type `link` in `UriType`', async () => {
        const actual = {
          type: 'Link',
          title: null,
          url: 'mailto:example@gmail.com',
          children: [
            {
              type: 'Str',
              value: 'example@gmail.com',
              loc: {
                start: {
                  line: 7,
                  column: 0,
                },
                end: {
                  line: 7,
                  column: 17,
                },
              },
              range: [66, 83],
              raw: 'example@gmail.com',
            },
          ],
          loc: {
            start: {
              line: 7,
              column: 0,
            },
            end: {
              line: 7,
              column: 17,
            },
          },
          range: [66, 83],
          raw: 'example@gmail.com',
        };
        const expected = [
          {
            uri: 'mailto:example@gmail.com',
            type: 'link',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });

      it('A `link` node with empty URL should have type `link` in `UriType`', async () => {
        const actual = {
          type: 'Link',
          title: null,
          url: '',
          children: [
            {
              type: 'Str',
              value: 'google',
              loc: {
                start: {
                  line: 19,
                  column: 1,
                },
                end: {
                  line: 19,
                  column: 7,
                },
              },
              range: [244, 250],
              raw: 'google',
            },
          ],
          loc: {
            start: {
              line: 19,
              column: 0,
            },
            end: {
              line: 19,
              column: 10,
            },
          },
          range: [243, 253],
          raw: '[google]()',
        };
        const expected = [
          {
            uri: '',
            type: 'link',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });

      it('A `link` node with only `#` hash fragment should have type `link` in `UriType`', async () => {
        const actual = {
          type: 'Link',
          title: null,
          url: '#heading',
          children: [
            {
              type: 'Str',
              value: 'title',
              loc: {
                start: {
                  line: 21,
                  column: 1,
                },
                end: {
                  line: 21,
                  column: 6,
                },
              },
              range: [276, 281],
              raw: 'title',
            },
          ],
          loc: {
            start: {
              line: 21,
              column: 0,
            },
            end: {
              line: 21,
              column: 17,
            },
          },
          range: [275, 292],
          raw: '[title](#heading)',
        };
        const expected = [
          {
            uri: '#heading',
            type: 'link',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });

      it('A `link` node whose URL is a relative path should have type `link` in `UriType`', async () => {
        const actual = {
          type: 'Link',
          title: null,
          url: 'README.md',
          children: [
            {
              type: 'Str',
              value: 'README.md',
              loc: {
                start: {
                  line: 23,
                  column: 1,
                },
                end: {
                  line: 23,
                  column: 10,
                },
              },
              range: [313, 322],
              raw: 'README.md',
            },
          ],
          loc: {
            start: {
              line: 23,
              column: 0,
            },
            end: {
              line: 23,
              column: 22,
            },
          },
          range: [312, 334],
          raw: '[README.md](README.md)',
        };
        const expected = [
          {
            uri: 'README.md',
            type: 'link',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });
    });

    describe('`Definition` node', () => {
      it('A `Definition` node whose URL is `https://www.google.com` should have type `link` in `UriType`', async () => {
        const actual = {
          type: 'Definition',
          identifier: 'link1',
          label: 'link1',
          title: 'Hello Google',
          url: 'https://www.google.com',
          loc: {
            start: {
              line: 29,
              column: 0,
            },
            end: {
              line: 29,
              column: 46,
            },
          },
          range: [410, 456],
          raw: '[link1]: https://www.google.com "Hello Google"',
        };
        const expected = [
          {
            uri: 'https://www.google.com',
            type: 'link',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });
    });

    describe('`Html` node', () => {
      it('A `Html` node with `a` tag should have type `link` in `UriType`', async () => {
        const actual = {
          type: 'Html',
          value: '<a href="https://www.google.com">',
          loc: {
            start: {
              line: 45,
              column: 0,
            },
            end: {
              line: 45,
              column: 33,
            },
          },
          range: [666, 699],
          raw: '<a href="https://www.google.com">',
        };
        const expected = [
          {
            uri: 'https://www.google.com',
            type: 'link',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });
    });
  });

  describe('Image', () => {
    describe('`Image` node', () => {
      it('A `Image` node should have type `image` in `UriType`', async () => {
        const actual = {
          type: 'Image',
          title: 'Example Image',
          url: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
          alt: 'example',
          loc: {
            start: {
              line: 53,
              column: 0,
            },
            end: {
              line: 53,
              column: 86,
            },
          },
          range: [788, 874],
          raw: '![example](https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg "Example Image")',
        };
        const expected = [
          {
            uri: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
            type: 'image',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });
    });

    describe('`Definition` node', () => {
      it('A `Definition` node whose URL is `https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg` should have type `image` in `UriType`', async () => {
        const actual = {
          type: 'Definition',
          identifier: 'image1',
          label: 'image1',
          title: 'Example Image',
          url: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
          loc: {
            start: {
              line: 59,
              column: 0,
            },
            end: {
              line: 59,
              column: 84,
            },
          },
          range: [930, 1014],
          raw: '[image1]: https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg "Example Image"',
        };
        const expected = [
          {
            uri: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
            type: 'image',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });
    });

    describe('`Html` node', () => {
      it('A `Html` node with `img` tag should have type `image` in `UriType`', async () => {
        const actual = {
          type: 'Html',
          value: '<img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">',
          loc: {
            start: {
              line: 75,
              column: 0,
            },
            end: {
              line: 75,
              column: 70,
            },
          },
          range: [1304, 1374],
          raw: '<img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">',
        };
        const expected = [
          {
            uri: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
            type: 'image',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });

      it('Nested `Html` node with `div` and `img` tags should have type `image` in `UriType` - 1', async () => {
        const actual = {
          type: 'Html',
          value:
            '<div><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"></div>',
          loc: {
            start: {
              line: 77,
              column: 0,
            },
            end: {
              line: 77,
              column: 151,
            },
          },
          range: [1376, 1527],
          raw: '<div><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"></div>',
        };
        const expected = [
          {
            uri: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
            type: 'image',
          },
          {
            uri: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
            type: 'image',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });

      it('Nested `Html` node with `div` and `img` tags should have type `image` in `UriType` - 2', async () => {
        const actual = {
          type: 'Html',
          value:
            '<div>\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">\n</div>',
          loc: {
            start: {
              line: 79,
              column: 0,
            },
            end: {
              line: 82,
              column: 6,
            },
          },
          range: [1529, 1687],
          raw: '<div>\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">\n</div>',
        };
        const expected = [
          {
            uri: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
            type: 'image',
          },
          {
            uri: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
            type: 'image',
          },
        ];

        deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
      });
    });
  });

  describe('Link, Image', () => {
    it('`Html` node with `a` and `img` tags should have type `link` and `image` in `UriType`', async () => {
      const actual = {
        type: 'Html',
        value:
          '<div>\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><br>\n  <a href="https://www.google.com">google</a><br>\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><br>\n</div>',
        loc: {
          start: {
            line: 105,
            column: 0,
          },
          end: {
            line: 109,
            column: 6,
          },
        },
        range: [2210, 2426],
        raw: '<div>\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><br>\n  <a href="https://www.google.com">google</a><br>\n  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><br>\n</div>',
      };
      const expected = [
        {
          uri: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
          type: 'image',
        },
        {
          uri: 'https://www.google.com',
          type: 'link',
        },
        {
          uri: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
          type: 'image',
        },
      ];

      deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
    });
  });

  describe('Comments should not be detected', () => {
    it('[//]: # (This behaves like a comment)', async () => {
      const actual = {
        type: 'Definition',
        identifier: '//',
        label: '//',
        title: 'This behaves like a comment',
        url: '#',
        loc: {
          start: {
            line: 90,
            column: 0,
          },
          end: {
            line: 90,
            column: 37,
          },
        },
        range: [1862, 1899],
        raw: '[//]: # (This behaves like a comment)',
      };
      const expected = [];

      deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
    });

    it('[comment]: <> (This behaves like a comment)', async () => {
      const actual = {
        type: 'Definition',
        identifier: 'comment',
        label: 'comment',
        title: 'This behaves like a comment',
        url: '',
        loc: {
          start: {
            line: 93,
            column: 0,
          },
          end: {
            line: 93,
            column: 43,
          },
        },
        range: [1976, 2019],
        raw: '[comment]: <> (This behaves like a comment)',
      };
      const expected = [];

      deepStrictEqual((await getUriTypes(actual)).uriTypes, expected);
    });
  });

  describe('Invalid node type', () => {
    it('Invalid node type should return `undefined`', async () => {
      const actual = {
        type: 'Document',
        raw: '',
        range: [0, 0],
        loc: {
          start: {
            line: 1,
            column: 0,
          },
          end: {
            line: 1,
            column: 0,
          },
        },
        children: [],
      };

      deepStrictEqual(await getUriTypes(actual), undefined);
    });
  });
});
