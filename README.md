# textlint-rule-allowed-uris

[![lint](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/actions/workflows/lint.yml/badge.svg)](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/actions/workflows/lint.yml)
[![test](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/actions/workflows/test.yml/badge.svg)](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/lumirlumir/npm-textlint-rule-allowed-uris/graph/badge.svg?token=69BF05THA2)](https://codecov.io/gh/lumirlumir/npm-textlint-rule-allowed-uris)
[![NPM Version](https://img.shields.io/npm/v/textlint-rule-allowed-uris)](https://www.npmjs.com/package/textlint-rule-allowed-uris)

A textlint rule for checking **allowed or disallowed URIs** in ***links*** and ***images*** of Markdown.🔥

> [!IMPORTANT]
>
> 1. This rule only supports **Markdown(`.md` or `.mdx`)** files. Note that it does not recognize URIs in **~~Text~~(`.txt`)** files.
> 1. The linting process includes HTTP requests, so an <u>**internet connection is required**</u>. Otherwise, an error will occur.
> 1. Note that every URIs should be recognized by Markdown. URIs which are not recognized by Markdown cannot be inspected. For example, URIs without `https://...` or `http://...`.
>
>     ```md
>     www.google.com
>     <www.google.com>
>     ```

## Features

### Supported

You can use any ***link*** or ***image*** formats which are supported by Markdown. (Even **HTML tags** are available!)

- [Click to see detailed Markdown examples](/tests/textlint-rule-allowed-uris.data.md). Look at **raw** code. these all types are considered.

- You can also check out the [AST Tree of the above examples](https://textlint.github.io/astexplorer/#/snippet/woXCqHBhcnNlcklEwrh0ZXh0bGludDptxINrZG93bi10by1hc3TCqMSFdHTEkGdzwoHEisSMxI7EkMSSxJRyxJbEmMSaxJzEnsSgw4DCqHbEhnNpb27EqMSqxI3Ej8SRxJPElcSXxJnEm8SdxJ90wqYxNC4wLjXCqGZpbGVuYW1lwrBzb3VyY2UudW5kZcWUbmVkwqRjb8Wmw5oJezwhLS0gxK_EscSZxYJ0LWRpc2FixZYgxbU-CgojIyBMxJBrc8aHxbPFtcW3xYXEssSedcScxYJrLXJhd8aELcaGCmjEpHBzOi8vd8aqLmdvb2fFli7FrW3Gh8SMxZlwxZZAZ8SUxZXGsm_GtArGkcW2xbjFhsSaYcaXb8aZLWLGnGNrZXTGn8ahPMajdMalxqfGqcarxq3Gr8axxrPHk8a2bca4Zca6xrxsxr5tx5PFtMeDxpTFh8SQxYJlx5LGh1vHm8awZV0ox5XHl8aoxqp3xqzGrse1x6cgIkhlbGxvIEfHv8WWIinHsse0xZbHtykgx4IgZcehdHkgxpnHsQpbxKXEjse2KCNoZWHFvm5nyJPIlWjEn2goZsacxrvFl3TIk8aFx7JSRUFETUUubWTHty4uL8i5yLvIvci_ZMirx6ogcsiFYcSlxLkgxIJ0aMidyJXHhMaVyY5mxIbFl8WhLWZ1yIbIncezyIvHtlvGmTFdx7LJqV06IMe5xqbHu8eayabIgciDyIXIh8iJyaYixpDJjMmZxYfJm8mdbsmfxa3IhmHGpcWqyaTGmTJdW8mryJ7Ki8muybDGpMmyx5nHvciQxaLGs8iCyITIhsiIyIrHnGXJvMeByb7HrMSayoHJjsqDZS1zaG9ydGPGl8qKxo0zyo_JqMq0ypLJsceYx7zHvsqgybbKnMm5yp_HtcqiyKx0bWzJl2HJsMmbPSLKusmzypfJtcazIj7KmDwvYcahxokgScSUZ2XGj8qjxpLJv8Sax67EkMewyLcKIVvHoMeix7fLjy91xrhvyKcud2lracWaxb5hLsquZ8apy7hpcMWqaWEvxZfLmMuYOS9FeMa3xrFqcGfIgsyOzJDHsMudYcufyI3JvcujyqXGm8WnyoLJn8mhyaPLqcury63IkVvLusyaZcmqx7LMq8ufyarJr8uwy7LIh8u1y7fLucu7zIbLvnLMgMy4zIPMhcyHzInMh2HMjMyWx6HMkcyTzJXMj82IzJjLnsqhzJ3Hq8Swx4XMoMmcyqjKhMeJbMqHxIVkyJ3Lq8ywZcqMyo7Mr82PyozMs8qUx5jMtcu0ZMu2zILMusu9y7_Mgcu5zITLvMyIbsyKzYXMjc2Mx6IuzJLMlCLNh8eiy5zNj8uEyqTNk8mazKHNl8qqyqzKrsqwyrLMpsyqzY_Ktc2kzKzKtc2nx5bKlc2qzLfNrs2BzLzMvsyCzbTMhs22zbjNhs27zYnNv86BxoPMmcybzZHKk8uHyZfLusyUc8Wgy43MtMuzzpvMuc6dzbHMv86hzYLNt82EzqXMl829zJPLlMaQxb52PjzOsSDOs2POtc2oxqjOms2szL_Nr86ezbLNgM21zYPMi826z4LNvsuUz4ptzrLOtMuOz5DLsc63z5POnMu8z5bOvM2BzqPPgM-czY3Pg2fPny_Ph8eTz7YKIMiUz4vPjc-PzpjNqc-nza3Ouc-qzrvOoM-tz5rNuc6pxaLPnsaGz7rPoM-iz47PpM-_z5HQgc-UzrrMvc-Xzr3Prs-b0IrPss-Fy5fPuMaIxorOq8ewy7fJlSDLisaZx7LMp86myKLOtsy2z6jQg8y70IXNs9CHzr_QnNCtz7LNi8yXzoPMrMiNy6_PpcWX0ILPmNCz0JjMvy9GxZVlOtCdzb7IjtCiIEPGv8WaxJHLoVvGqMqSxoooVGjFvyBiZcitxLlzyJvLuMewy4rGs9GUyLXIntGYya_GiiLRnNGe0aDRosug0aXHj9CoINGpyLTJvNGXL9GZICfRsdGk0bNh0aPRttGn0bnRk8i0J8ie0brEkcqSPD4g0ZvRndKD0aHShdG1xI_Rt9Go0orEkciOW9KOdNKQ0pLRsNKV0Z_Sl9KG0prSiNKh0bzSodKj0oDSgtKn0bTRpNKq0bjSodKM0ZBPyZXEusmsxo1Mb2NhbMyuypDSvtOA04LMsiDJhci6yLzIvsmAypvJuMiIyYbTjcqiW8WpxLlyVc2cypIvTElDRU5TRciC05fEhtOaxarLhM-40I7PvM-j0K_Nq9GDz5XQtNGEzr7OpM-wzbzQjDzHjNCNyJTLimjLjNCSx7rKlsq9yIDLk8uVyabLl8uZ07py07zQj8-M067Ppc-S07HQl86f0LXPmdC30InQudO507vHgc-1ac-ICg}).

### Only URIs are inspected?

No! We check not only for URIs, but also for **local paths**. Below patterns are inspected too.

```txt
README.md (Relative path)
/README.md (Absolute path)
../README.md (Relative path)
/learn/start-a-new-react-project#can-i-use-react-without-a-framework (With hash)
/images/languages/javascript/composition-of-javascript/2.png?raw=true (With query parameters)
And more...
```

### Patterns

Only **regular expressions** are used for URIs pattern matching. You can define the pattern you want to inspect by yourself.

### Allowed URIs

> Related: `allowed.links`, `allowed.images`

Allowed URIs act like an <u>**whitelist**</u>. Only those written on the whitelist **can** pass through.

For example, If you pass an empty array to the option, it allows nothing. i.e. Every ***links*** or ***images*** will be detected. (For a detailed explanation, see [Configs](#configs).)

### Disallowed URIs

> Related: `disallowed.links`, `disallowed.images`

On the contrary, disallowed URIs act like an <u>**blacklist**</u>. Only those written on the blacklist **cannot** pass through.

For example, If you pass an empty array to the option, it allows everything. i.e. no ***links*** or ***images*** will be detected. (For a detailed explanation, see [Configs](#configs).)

## Installation

### `npm`

```sh
npm install --save-dev textlint-rule-allowed-uris
```

### `yarn`

```sh
yarn add --dev textlint-rule-allowed-uris
```

## Configs

### Interface

Every options are optional. If you pass nothing, then nothing just happens!

```ts
{
  rules: {
    "allowed-uris": {
      allowed?: { // Optional
        links?: RegExp[], // Optional
        images?: RegExp[], // Optional
      },
      disallowed?: { // Optional
        links?: RegExp[], // Optional
        images?: RegExp[], // Optional
      },
    }
  }
}
```

### Options

1. `allowed.links`: `RegExp[]`, Optional
    - Allowed `links` act like an <u>**whitelist**</u>. Only those written on the whitelist can pass through.
    - If you want to turn off this option, then pass nothing. **NOTE: DO NOT PASS AN EMPTY ARRAY TO TURN OFF THIS OPTION.**

        ```js
        /* .textlintrc.js */
        // Correct way of turning off this option.
        module.exports = {
          rules: {
            "allowed-uris": {
              allowed: {
                // links: [], => turned off
                images: [/example/],
              },
              disallowed: {
                links: [/example/],
                images: [/example/],
              },
            }
          }
        }
        ```

    - Default value passed: `[/.*/]`

1. `allowed.images`: `RegExp[]`, Optional
    - Allowed `images` act like an <u>**whitelist**</u>. Only those written on the whitelist can pass through.
    - If you want to turn off this option, then pass nothing. **NOTE: DO NOT PASS AN EMPTY ARRAY TO TURN OFF THIS OPTION.**

        ```js
        /* .textlintrc.js */
        // Correct way of turning off this option.
        module.exports = {
          rules: {
            "allowed-uris": {
              allowed: {
                links: [/example/],
                // images: [], => turned off
              },
              disallowed: {
                links: [/example/],
                images: [/example/],
              },
            }
          }
        }
        ```

    - Default value passed: `[/.*/]`

1. `disallowed.links`: `RegExp[]`, Optional
    - Disallowed `links` act like an <u>**blacklist**</u>. Only those written on the blacklist **cannot** pass through.
    - If you want to turn off this option, then pass nothing. or here, you can pass an empty array. (because the default value passed is an empty array too.)

        ```js
        /* .textlintrc.js */
        // Correct way of turning off this option.
        module.exports = {
          rules: {
            "allowed-uris": {
              allowed: {
                links: [/example/],
                images: [/example/],
              },
              disallowed: {
                // links: [], => turned off
                images: [/example/],
              },
            }
          }
        }
        ```

    - Default value passed: `[]`

1. `disallowed.images`: `RegExp[]`, Optional
    - Disallowed `images` act like an <u>**blacklist**</u>. Only those written on the blacklist **cannot** pass through.
    - If you want to turn off this option, then pass nothing. or here, you can pass an empty array. (because the default value passed is an empty array too.)

        ```js
        /* .textlintrc.js */
        // Correct way of turning off this option.
        module.exports = {
          rules: {
            "allowed-uris": {
              allowed: {
                links: [/example/],
                images: [/example/],
              },
              disallowed: {
                links: [/example/],
                // images: [], => turned off
              },
            }
          }
        }
        ```

    - Default value passed: `[]`

### Example (`.textlintrc.js`)

```js
module.exports = {
  rules: {
    "allowed-uris": {
      allowed: {
        links: [
          // regular expressions
        ],
        images: [
          // regular expressions
        ],
      },
      disallowed: {
        links: [
          // regular expressions
        ],
        images: [
          // regular expressions
        ],
      },
    }
  }
}
```

## Usages

```sh
textlint [options] file.md [file|dir|glob*]
```

### Without a config file

```sh
npx textlint --rule allowed-uris -f pretty-error file.md
```

### With a config file

```sh
npx textlint -f pretty-error file.md
```

## Sample Outputs

When configured like below:

```js
module.exports = {
  rules: {
    "allowed-uris": {
      allowed: {
        links: [/google/],
      },
    }
  }
}
```

### `-f pretty-error` option

<details>
<summary> Click to see sample outputs </summary>

```txt
> npx textlint tests/textlint-rule-allowed-uris.data.md --rulesdir ./src -f pretty-error

textlint-rule-allowed-uris: allowed.links
- problem: 'mailto:example@gmail.com'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/tests/textlint-rule-allowed-uris.data.md:9:1
        v
     8.
     9. example@gmail.com
    10.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: 'mailto:example@gmail.com'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/tests/textlint-rule-allowed-uris.data.md:15:1
        v
    14.
    15. <example@gmail.com>
    16.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: ''
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/tests/textlint-rule-allowed-uris.data.md:21:1
        v
    20.
    21. [google]() <!-- empty link -->
    22.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: '#heading'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/tests/textlint-rule-allowed-uris.data.md:23:1
        v
    22.
    23. [title](#heading) <!-- hash(fragment) -->
    24.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: '../README.md'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/tests/textlint-rule-allowed-uris.data.md:25:1
        v
    24.
    25. [README.md](../README.md) <!-- relative path -->
    26.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: 'https://en.wikipedia.org/wiki/File:Example.jpg'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/tests/textlint-rule-allowed-uris.data.md:86:1
        v
    85.
    86. [![example](https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg "Example Image")](https://en.wikipedia.org/wiki/File:Example.jpg)
    87.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: '/README.md'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/tests/textlint-rule-allowed-uris.data.md:101:1
         v
    100.
    101. [linkLocal1]: /README.md "Hello README"
    102.
         ^

textlint-rule-allowed-uris: allowed.links
- problem: '/LICENSE'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/tests/textlint-rule-allowed-uris.data.md:103:1
         v
    102.
    103. [neverUsed]: /LICENSE "neverUsed"
    104.
         ^

✖ 8 problems (8 errors, 0 warnings)
```

</details>

### `-f stylish` option

<details>
<summary> Click to see sample outputs </summary>

```txt
> npx textlint tests/textlint-rule-allowed-uris.data.md --rulesdir ./src -f stylish

textlint-rule-allowed-uris/tests/textlint-rule-allowed-uris.data.md
    9:1  error  allowed.links
- problem: 'mailto:example@gmail.com'
- allowed regular expressions: '/google/'                    textlint-rule-allowed-uris
   15:1  error  allowed.links
- problem: 'mailto:example@gmail.com'
- allowed regular expressions: '/google/'                    textlint-rule-allowed-uris
   21:1  error  allowed.links
- problem: ''
- allowed regular expressions: '/google/'                    textlint-rule-allowed-uris
   23:1  error  allowed.links
- problem: '#heading'
- allowed regular expressions: '/google/'                    textlint-rule-allowed-uris
   25:1  error  allowed.links
- problem: '../README.md'
- allowed regular expressions: '/google/'                    textlint-rule-allowed-uris
   86:1  error  allowed.links
- problem: 'https://en.wikipedia.org/wiki/File:Example.jpg'
- allowed regular expressions: '/google/'                    textlint-rule-allowed-uris
  101:1  error  allowed.links
- problem: '/README.md'
- allowed regular expressions: '/google/'                    textlint-rule-allowed-uris
  103:1  error  allowed.links
- problem: '/LICENSE'
- allowed regular expressions: '/google/'                    textlint-rule-allowed-uris

✖ 8 problems (8 errors, 0 warnings)
```

</details>

## Q&A

### How to distinguish email links?

Email links like `<example@gmail.com>` are interpreted as `mailto:example@gmail.com`. Therefore, use `/^mailto:/` in regular expressions.

## Contributing

Thanks for having attention to this package.🙇‍♂️ Issues and PRs are always welcome.🎉

I recommend you to read [textlint guides](https://textlint.github.io/) before contributing.

And check out the [Installation](#installation) and [Concepts of `textlint-rule-allowed-uris`](#concepts-of-textlint-rule-allowed-uris) guides below. It will help you to understand how this package works.

After that, refer to the comments in source code. It contains useful information to help you.

### Installation

1. Fork it.

1. Clone it to your local directory. ([Git](https://git-scm.com/downloads) is required.)

    ```sh
    git clone https://github.com/lumirlumir/npm-textlint-rule-allowed-uris.git
    ```

1. Move to the `npm-textlint-rule-allowed-uris` directory.

    ```sh
    cd npm-textlint-rule-allowed-uris
    ```

1. Install npm packages. ([Node.js](https://nodejs.org/en) is required.)

    ```sh
    npm install
    ```

1. Edit code.

1. Create `my-branch` branch.

    ```sh
    git switch -c my-branch
    ```

1. Commit your changes. (`husky` and `lint-staged` will lint and test your changed files!)

    ```sh
    git commit -am "<type>[scope]: <description>"
    ```

1. Push them to your remote branch.

1. Submit a pull request.

### Concepts of `textlint-rule-allowed-uris`

`textlint-rule-allowed-uris` rule checks **allowed or disallowed URIs** in ***links*** and ***images*** of Markdown.

#### Detailed node types which are checked by this rule

1. ***Links*** node type

    1. `Link`(`ASTNodeTypes.Link`)
    1. `Definition` (We don't use ~~`LinkReference`~~)
    1. `Html`(`ASTNodeTypes.Html`)

1. ***Images*** node type

    1. `Image`(`ASTNodeTypes.Image`)
    1. `Definition` (We don't use ~~`ImageReference`~~)
    1. `Html`(`ASTNodeTypes.Html`)

> [!NOTE]
>
> `LinkReference`, `ImageReference` and `Definition` are types parsed by [`@textlint/text-to-ast`](https://github.com/textlint/textlint/tree/master/packages/@textlint/markdown-to-ast/). But, It is not defined in [`@textlint/ast-node-types`](https://github.com/textlint/textlint/tree/master/packages/%40textlint/ast-node-types). (NOTE: Textlint started [supporting these types since `v14.5.0`](https://github.com/textlint/textlint/pull/1459)!)
>
> However, you can use these three node types. It is described in [textlint guides](https\://github.com/textlint/textlint/blob/master/docs/txtnode.md). See below.
>
>
> > Other plugin has defined other node type that is not defined in `@textlint/ast-node-types`, but you can specify it as just a string.
> >
> > ```js
> > // A rule can treat "Example" node type
> > export default () => {
> >     return {
> >         ["Example"](node) {
> >             // do something
> >         }
> >     };
> > };
> > ```
>
> In other words, you can use other node types that is not defined in `@textlint/ast-node-types`. like `Definition` type.

#### AST Tree

You can see detailed parsed AST Tree in [here](https://textlint.github.io/astexplorer/#/snippet/woXCqHBhcnNlcklEwrh0ZXh0bGludDptxINrZG93bi10by1hc3TCqMSFdHTEkGdzwoHEisSMxI7EkMSSxJRyxJbEmMSaxJzEnsSgw4DCqHbEhnNpb27EqMSqxI3Ej8SRxJPElcSXxJnEm8SdxJ90wqYxNC4wLjXCqGZpbGVuYW1lwrBzb3VyY2UudW5kZcWUbmVkwqRjb8Wmw5oJezwhLS0gxK_EscSZxYJ0LWRpc2FixZYgxbU-CgojIyBMxJBrc8aHxbPFtcW3xYXEssSedcScxYJrLXJhd8aELcaGCmjEpHBzOi8vd8aqLmdvb2fFli7FrW3Gh8SMxZlwxZZAZ8SUxZXGsm_GtArGkcW2xbjFhsSaYcaXb8aZLWLGnGNrZXTGn8ahPMajdMalxqfGqcarxq3Gr8axxrPHk8a2bca4Zca6xrxsxr5tx5PFtMeDxpTFh8SQxYJlx5LGh1vHm8awZV0ox5XHl8aoxqp3xqzGrse1x6cgIkhlbGxvIEfHv8WWIinHsse0xZbHtykgx4IgZcehdHkgxpnHsQpbxKXEjse2KCNoZWHFvm5nyJPIlWjEn2goZsacxrvFl3TIk8aFx7JSRUFETUUubWTHty4uL8i5yLvIvci_ZMirx6ogcsiFYcSlxLkgxIJ0aMidyJXHhMaVyY5mxIbFl8WhLWZ1yIbIncezyIvHtlvGmTFdx7LJqV06IMe5xqbHu8eayabIgciDyIXIh8iJyaYixpDJjMmZxYfJm8mdbsmfxa3IhmHGpcWqyaTGmTJdW8mryJ7Ki8muybDGpMmyx5nHvciQxaLGs8iCyITIhsiIyIrHnGXJvMeByb7HrMSayoHJjsqDZS1zaG9ydGPGl8qKxo0zyo_JqMq0ypLJsceYx7zHvsqgybbKnMm5yp_HtcqiyKx0bWzJl2HJsMmbPSLKusmzypfJtcazIj7KmDwvYcahxokgScSUZ2XGj8qjxpLJv8Sax67EkMewyLcKIVvHoMeix7fLjy91xrhvyKcud2lracWaxb5hLsquZ8apy7hpcMWqaWEvxZfLmMuYOS9FeMa3xrFqcGfIgsyOzJDHsMudYcufyI3JvcujyqXGm8WnyoLJn8mhyaPLqcury63IkVvLusyaZcmqx7LMq8ufyarJr8uwy7LIh8u1y7fLucu7zIbLvnLMgMy4zIPMhcyHzInMh2HMjMyWx6HMkcyTzJXMj82IzJjLnsqhzJ3Hq8Swx4XMoMmcyqjKhMeJbMqHxIVkyJ3Lq8ywZcqMyo7Mr82PyozMs8qUx5jMtcu0ZMu2zILMusu9y7_Mgcu5zITLvMyIbsyKzYXMjc2Mx6IuzJLMlCLNh8eiy5zNj8uEyqTNk8mazKHNl8qqyqzKrsqwyrLMpsyqzY_Ktc2kzKzKtc2nx5bKlc2qzLfNrs2BzLzMvsyCzbTMhs22zbjNhs27zYnNv86BxoPMmcybzZHKk8uHyZfLusyUc8Wgy43MtMuzzpvMuc6dzbHMv86hzYLNt82EzqXMl829zJPLlMaQxb52PjzOsSDOs2POtc2oxqjOms2szL_Nr86ezbLNgM21zYPMi826z4LNvsuUz4ptzrLOtMuOz5DLsc63z5POnMu8z5bOvM2BzqPPgM-czY3Pg2fPny_Ph8eTz7YKIMiUz4vPjc-PzpjNqc-nza3Ouc-qzrvOoM-tz5rNuc6pxaLPnsaGz7rPoM-iz47PpM-_z5HQgc-UzrrMvc-Xzr3Prs-b0IrPss-Fy5fPuMaIxorOq8ewy7fJlSDLisaZx7LMp86myKLOtsy2z6jQg8y70IXNs9CHzr_QnNCtz7LNi8yXzoPMrMiNy6_PpcWX0ILPmNCz0JjMvy9GxZVlOtCdzb7IjtCiIEPGv8WaxJHLoVvGqMqSxoooVGjFvyBiZcitxLlzyJvLuMewy4rGs9GUyLXIntGYya_GiiLRnNGe0aDRosug0aXHj9CoINGpyLTJvNGXL9GZICfRsdGk0bNh0aPRttGn0bnRk8i0J8ie0brEkcqSPD4g0ZvRndKD0aHShdG1xI_Rt9Go0orEkciOW9KOdNKQ0pLRsNKV0Z_Sl9KG0prSiNKh0bzSodKj0oDSgtKn0bTRpNKq0bjSodKM0ZBPyZXEusmsxo1Mb2NhbMyuypDSvtOA04LMsiDJhci6yLzIvsmAypvJuMiIyYbTjcqiW8WpxLlyVc2cypIvTElDRU5TRciC05fEhtOaxarLhM-40I7PvM-j0K_Nq9GDz5XQtNGEzr7OpM-wzbzQjDzHjNCNyJTLimjLjNCSx7rKlsq9yIDLk8uVyabLl8uZ07py07zQj8-M067Ppc-S07HQl86f0LXPmdC30InQudO507vHgc-1ac-ICg}). (Already mentioned above.) Look which kind of types are exist for ***links*** and ***images***.

## Versioning

This project adheres to [Semantic Versioning](https://semver.org/).

## Change Log

See [`CHANGELOG.md`](/CHANGELOG.md)

## License

[MIT](/LICENSE)
