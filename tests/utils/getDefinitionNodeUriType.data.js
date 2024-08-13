/**
 * `testCases` for `getDefinitionNodeUriType.spec.js`
 */
module.exports = [
  /* comment */
  {
    actual: '',
    expected: 'comment', // An Empty string is treated as a `comment`.
  },
  {
    actual: '#',
    expected: 'comment', // The `#` character is treated as a `comment`.
  },

  /* image */
  // uri
  {
    actual: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
    expected: 'image',
  },
  // local
  {
    actual: '/assets/test.png',
    expected: 'image', // Absolute path.
  },
  {
    actual: '../assets/test.jpg',
    expected: 'image', // Relative path.
  },
  {
    actual: '/images/languages/javascript/composition-of-javascript/2.png?raw=true',
    expected: 'image', // With query parameters.
  },

  /* link */
  // uri
  {
    actual: 'https://www.google.com',
    expected: 'link',
  },
  {
    actual: 'https://en.wikipedia.org/wiki/File:Example.jpg',
    expected: 'link', // Link but ends with `.jpg`
  },
  // local
  {
    actual: '/LICENSE',
    expected: 'link', // Absolute path.
  },
  {
    actual: '../README.md',
    expected: 'link', // Relative path.
  },
  {
    actual: '/learn/start-a-new-react-project#can-i-use-react-without-a-framework',
    expected: 'link', // With hash.
  },
];
