const c = require('ansi-colors');
const getUriList = require('./utils/getUriList');

const reporter = async ({ report, locator, RuleError }, options, node) => {
  /* Initialize */
  const regexes = {
    allowed: {
      links: options?.allowed?.links ?? [],
      images: options?.allowed?.images ?? [],
    },
    disallowed: {
      links: options?.disallowed?.links ?? [],
      images: options?.disallowed?.images ?? [],
    },
  };

  /* Report */
  (await getUriList(node)).uriList.forEach(({ uri, type }) => {
    Object.keys(regexes).forEach(key => {
      regexes[key][`${type}s`].forEach(regex => {
        if (key === 'allowed' ? !uri.match(regex) : uri.match(regex))
          report(
            node,
            new RuleError(
              `${c.red.bold(`${key}.${type}s`)}\n${c.bold.red('-')} problem: '${c.strikethrough.bold.white(uri)}'\n${c.bold.red('-')} ${key} regular expressions: '${c.bold.white(regexes[key][`${type}s`].join(' or '))}'`,
              {
                padding: locator.at(0),
              },
            ),
          );
      });
    });
  });
};

module.exports = (context, options) => {
  // TODO: Error When it is offline.

  return Object.fromEntries(
    ['Link', 'Image', 'Definition', 'Html'].map(type => [
      type,
      async node => reporter(context, options, node),
    ]),
  );
};
