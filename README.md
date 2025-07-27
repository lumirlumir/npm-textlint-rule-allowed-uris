# textlint-rule-allowed-uris

[![lint](https://img.shields.io/github/actions/workflow/status/lumirlumir/npm-textlint-rule-allowed-uris/lint.yml?label=lint&color=6FB8CE&labelColor=333333&logo=github)](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/actions/workflows/lint.yml)
[![test](https://img.shields.io/github/actions/workflow/status/lumirlumir/npm-textlint-rule-allowed-uris/test.yml?label=test&color=6FB8CE&labelColor=333333&logo=github)](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/actions/workflows/test.yml)
[![test-cross-platform](https://img.shields.io/github/actions/workflow/status/lumirlumir/npm-textlint-rule-allowed-uris/test-cross-platform.yml?label=test-cross-platform&color=6FB8CE&labelColor=333333&logo=github)](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/actions/workflows/test-cross-platform.yml)
[![codecov](https://img.shields.io/codecov/c/gh/lumirlumir/npm-textlint-rule-allowed-uris?token=2zUCHlMFT3&label=Codecov&color=6FB8CE&labelColor=333333&logo=codecov)](https://codecov.io/gh/lumirlumir/npm-textlint-rule-allowed-uris)
[![npm package textlint-rule-allowed-uris latest version](https://img.shields.io/npm/v/textlint-rule-allowed-uris?label=textlint-rule-allowed-uris@latest&color=6FB8CE&labelColor=333333&logo=npm)](https://www.npmjs.com/package/textlint-rule-allowed-uris)

A textlint rule for checking **allowed or disallowed URIs** in ***links*** and ***images*** of Markdown.🔥

[Click here to view the documentation for `textlint-rule-allowed-uris@1`](https://github.com/lumirlumir/npm-textlint-rule-allowed-uris/tree/v1.1.1#readme).

> [!IMPORTANT]
>
> 1. Support both [`textlint`](https://github.com/textlint/textlint) v14 and v15. (v15 is the latest version of `textlint`.)
> 1. This rule only supports **Markdown(`.md` or `.mdx`)** files. Note that it does not recognize URIs in **~~Text~~(`.txt`)** files.
> 1. Note that every URIs should be recognized by Markdown. URIs which are not recognized by Markdown cannot be inspected. For example, URIs without `https://...` or `http://...`.
>
>     ```md
>     www.google.com
>     <www.google.com>
>     ```

## Features

### Supported

You can use any ***link*** or ***image*** formats which are supported by Markdown. (Even **HTML tags** are available!)

- [Click to see detailed Markdown examples](/src/textlint-rule-allowed-uris.md). Look at **raw** code. these all types are considered.

- You can also check out the [AST Tree of the above examples](https://textlint.org/astexplorer/#/snippet/woXCqHBhcnNlcklEwrh0ZXh0bGludDptxINrZG93bi10by1hc3TCqMSFdHTEkGdzwoHEisSMxI7EkMSSxJRyxJbEmMSaxJzEnsSgw4DCqHbEhnNpb27EqMSqxI3Ej8SRxJPElcSXxJnEm8SdxJ90wqYxNS4yLjHCqGZpbGVuYW1lwrBzb3VyY2UudW5kZcWUbmVkwqRjb8Wmw5oJwoQ8IS0tIMSvxLHEmcWCdC1kaXNhYsWWIMW1PiDFs8W1IGVzxbvFvcW_xoHGg8aFCgojIyBMxJBrc8aTxojFtsW4xYbEmmF1xJzFgmstcmF3xoQtPsaTaMSkcHM6Ly93xrYuZ29vZ8WWLsWtbcaTxIzFmXDFlkBnxJTFlca-b8eACsadxbfFhcSyxJ7Go2_GpS1ixqhja2V0xqvGrceNxq90xrHGs8a1xrfGuca7xr3Gv8eePMeCbceEZceGx4hsx4ptx6rFtMaex5DFh8SQxYJlx53Gk1vHpsa8ZV0ox6DHosa0xrZ3xrjGusiBx7MgIkhlbGxvIEfIi8WWIinHvsiAxZbIgynGh8e2xorHrXR5IMalx70KW8SlxI7IgigjaGVhxb5uZ8ifx45oxJ9oKGbGqMeHxZd0yJ_GksipUkVBRE1FLm1kyIMuLi_JhMmGyYjJimTItsihcsiRYcSlxLkgxIJ0aMiox47Gn8eRyZhmxIbFl8WhLWZ1yJLIqMe_yJfIglvGpTFdx77Js106IMiFxrLIh8elybDIjciPyJHIk8iVybAixpzIocmjxYfJpcmnbsmpxa3IkmHGscWqya7GpTJdW8m1yKnKlcm4ybrGsMm8x6TIicicxaLGv8iOyJDIksiUyJbHp2XKhseNyojHuMSayovJmMqNZS1zaG9ydGPGo8qUxpkzypnJssq-ypzJu8ejyIjIisqqyoDKpsqDyqnIgcqsyLd0bWzJoWHJusmlPSLLhMm9yqHJv8a_Ij7KojwvYceexpUgScSUZ8aLyofGicqJxJrHusSQx7zJgiFbx6zHrsiDy5kvdceEb8iyLndpa2nFmsW-YS7KuGfGtcyAaXDFqmlhL8WXy6LLojkvRXjHg8a9anBnyI7MlsyYx7zLp2HLqciZy6vHt8SwxqDGp8WnyozJqcmrya3Lssu0zJfHrcidW8yCzKJlybTHvsy1y6nJtMm5y7jLusiTy73Lv8yBzIPMjsyGcsyIzYLMi8yNzI_MkcyPYcyUzJ7MssWizJrMnCLNkceuy6bLqMqrzKXHj8ynyaTMqsqyyo7HlGzKkcSFZMioy7PMumXKlsqYzLnNmsqWzL3KnsejzL_LvGTLvsyKzYTMhcyHzInMgcyMzITMkG7Mks2PzJXMsceuLs2UzJ3OhcaDzKHMo82cy63MqcmmzaHKtMq2yrjKusq8zK_Nqsq_za7Mtsq_zbHHocqfzbTNgc24zYvNhs2IzIrNvsyOzoDOgs2QzorNk8ybzonMn82ZzLbLjsihxq_LkcmhzILMnHPFoMuXzL7Lu86izYPOpM27zYnOqM2MzoHNjs6szJ_Oh8yby57GnMW-dj48zrkgzrtjzr3Nssa0zqHNts2JzbnOpc28zYrNv82NzJPOhM-KzZTLns-Sbc66zrzLmM-Yy7nOv8-bzqPMhM-ez4TNi86qz4jPpM2Sz4tnz6cvz4_Hqs--CiDGh8-Tz5XPl86fzbPPr823z4HPss-DzqfPtc-izoPNl8yZz4zGrdCCz6jPqs-Wz6zQh8-Z0InPnM-CzYfPn8-Fz7bPo9CSzq7Pu8aty6HQgMaUxpbOjMe8y7_JnyDLlMalx77Ls8u1yJ3IhM-tz5rQisyC0J_Ops290I_Ph9Ckzq3Pus6wzZLOssyjKcu3z63Fl9C7z4XPs8yKL0bFlWU60KXPusia0KsgQ8eLxZrEkcabyKnGtMqcxpYoVGjFvyBiZci4xLlzyKbMgMe8y5TGv9GdyYDRoC_RosiO0aXRp9Gp0avGi9Gux5rQsSDRssi_yoZb0aHJucaWJ9G50a3Ru2HRrNG-0bDSgdGcyL8n0bXKnDzGhtGk0abSi9Gq0o3RvcSP0b_RsdKSxJHImtKF0bbJudKX0bjSmtGo0pzSjtKf0pDSgsSR0oTShsaHxobSidKq0ozSrdGv0oDSsHTSlNGZT8mfxLrJtsaZTG9jYWzMuMqa04TThtOIzLwgyZDJhcmHyYnJi8qlyoLIlMmR05PKrFvFqcS5clXNpsqcL0xJQ0VOU0XIjtOdxIbToMWqy47QgNCW0ITPq86-zYDPsNCLzYXQjdC_z6HRgdCR0YPPps-Rx5fQlcaHy5Roy5bQmsiGyqDLh8iMy53Ln8mwy6HLozzUgtCB0IPPqc-U07TQudCdz7HTudCgz7TTvM6rz7jOhtSA1JJy0KjPvWnPkAo}).

### Only URIs are inspected?

No! This rule checks not only for URIs, but also for **local paths**. Below patterns are inspected too.

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
npm install --save-dev textlint-rule-allowed-uris@latest
```

### `yarn`

```sh
yarn add --dev textlint-rule-allowed-uris@latest
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
      checkUnusedDefinitions?: boolean, // Optional
    }
  }
}
```

### Types

You can import `Options` type from `textlint-rule-allowed-uris` package.

```ts
import type { Options } from "textlint-rule-allowed-uris";
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

    - Default value passed: `[/.*/u]`

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

    - Default value passed: `[/.*/u]`

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

1. `checkUnusedDefinitions`: `boolean`, Optional
    - If set to `true`, the rule will check for [unused definitions](https://github.com/eslint/markdown/blob/main/docs/rules/no-unused-definitions.md) and report them as problems.
    - If set to `false` or not specified, the rule will not check for unused definitions.
    - Definitions that use `//` are treated as comments and always ignored.

        ```md
        [//]: # (This behaves like a comment)
        ```

    - Default value passed: `false`

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
      checkUnusedDefinitions: true, // Optional, default is `false`
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
> npx textlint src/textlint-rule-allowed-uris.md --rulesdir ./src -f pretty-error

textlint-rule-allowed-uris: allowed.links
- problem: 'mailto:example@gmail.com'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/src/textlint-rule-allowed-uris.md:9:1
        v
     8.
     9. example@gmail.com
    10.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: 'mailto:example@gmail.com'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/src/textlint-rule-allowed-uris.md:15:1
        v
    14.
    15. <example@gmail.com>
    16.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: ''
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/src/textlint-rule-allowed-uris.md:21:1
        v
    20.
    21. [google]() <!-- empty link -->
    22.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: '#heading'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/src/textlint-rule-allowed-uris.md:23:1
        v
    22.
    23. [title](#heading) <!-- hash(fragment) -->
    24.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: '../README.md'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/src/textlint-rule-allowed-uris.md:25:1
        v
    24.
    25. [README.md](../README.md) <!-- relative path -->
    26.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: 'https://en.wikipedia.org/wiki/File:Example.jpg'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/src/textlint-rule-allowed-uris.md:86:1
        v
    85.
    86. [![example](https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg "Example Image")](https://en.wikipedia.org/wiki/File:Example.jpg)
    87.
        ^

textlint-rule-allowed-uris: allowed.links
- problem: '/README.md'
- allowed regular expressions: '/google/'
textlint-rule-allowed-uris/src/textlint-rule-allowed-uris.md:101:1
         v
    100.
    101. [linkLocal1]: /README.md "Hello README"
    102.
         ^

✖ 7 problems (7 errors, 0 warnings)
```

</details>

### `-f stylish` option

<details>
<summary> Click to see sample outputs </summary>

```txt
> npx textlint src/textlint-rule-allowed-uris.md --rulesdir ./src -f stylish

textlint-rule-allowed-uris/src/textlint-rule-allowed-uris.md
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

✖ 7 problems (7 errors, 0 warnings)
```

</details>

## Q&A

### How to distinguish email links?

Email links like `<example@gmail.com>` are interpreted as `mailto:example@gmail.com`. Therefore, use `/^mailto:/` in regular expressions.

## Contributing

Thanks for having attention to this package. Issues and PRs are always welcome.🎉

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

You can see detailed parsed [AST Tree in here](https://textlint.org/astexplorer/#/snippet/woXCqHBhcnNlcklEwrh0ZXh0bGludDptxINrZG93bi10by1hc3TCqMSFdHTEkGdzwoHEisSMxI7EkMSSxJRyxJbEmMSaxJzEnsSgw4DCqHbEhnNpb27EqMSqxI3Ej8SRxJPElcSXxJnEm8SdxJ90wqYxNS4yLjHCqGZpbGVuYW1lwrBzb3VyY2UudW5kZcWUbmVkwqRjb8Wmw5oJwoQ8IS0tIMSvxLHEmcWCdC1kaXNhYsWWIMW1PiDFs8W1IGVzxbvFvcW_xoHGg8aFCgojIyBMxJBrc8aTxojFtsW4xYbEmmF1xJzFgmstcmF3xoQtPsaTaMSkcHM6Ly93xrYuZ29vZ8WWLsWtbcaTxIzFmXDFlkBnxJTFlca-b8eACsadxbfFhcSyxJ7Go2_GpS1ixqhja2V0xqvGrceNxq90xrHGs8a1xrfGuca7xr3Gv8eePMeCbceEZceGx4hsx4ptx6rFtMaex5DFh8SQxYJlx53Gk1vHpsa8ZV0ox6DHosa0xrZ3xrjGusiBx7MgIkhlbGxvIEfIi8WWIinHvsiAxZbIgynGh8e2xorHrXR5IMalx70KW8SlxI7IgigjaGVhxb5uZ8ifx45oxJ9oKGbGqMeHxZd0yJ_GksipUkVBRE1FLm1kyIMuLi_JhMmGyYjJimTItsihcsiRYcSlxLkgxIJ0aMiox47Gn8eRyZhmxIbFl8WhLWZ1yJLIqMe_yJfIglvGpTFdx77Js106IMiFxrLIh8elybDIjciPyJHIk8iVybAixpzIocmjxYfJpcmnbsmpxa3IkmHGscWqya7GpTJdW8m1yKnKlcm4ybrGsMm8x6TIicicxaLGv8iOyJDIksiUyJbHp2XKhseNyojHuMSayovJmMqNZS1zaG9ydGPGo8qUxpkzypnJssq-ypzJu8ejyIjIisqqyoDKpsqDyqnIgcqsyLd0bWzJoWHJusmlPSLLhMm9yqHJv8a_Ij7KojwvYceexpUgScSUZ8aLyofGicqJxJrHusSQx7zJgiFbx6zHrsiDy5kvdceEb8iyLndpa2nFmsW-YS7KuGfGtcyAaXDFqmlhL8WXy6LLojkvRXjHg8a9anBnyI7MlsyYx7zLp2HLqciZy6vHt8SwxqDGp8WnyozJqcmrya3Lssu0zJfHrcidW8yCzKJlybTHvsy1y6nJtMm5y7jLusiTy73Lv8yBzIPMjsyGcsyIzYLMi8yNzI_MkcyPYcyUzJ7MssWizJrMnCLNkceuy6bLqMqrzKXHj8ynyaTMqsqyyo7HlGzKkcSFZMioy7PMumXKlsqYzLnNmsqWzL3KnsejzL_LvGTLvsyKzYTMhcyHzInMgcyMzITMkG7Mks2PzJXMsceuLs2UzJ3OhcaDzKHMo82cy63MqcmmzaHKtMq2yrjKusq8zK_Nqsq_za7Mtsq_zbHHocqfzbTNgc24zYvNhs2IzIrNvsyOzoDOgs2QzorNk8ybzonMn82ZzLbLjsihxq_LkcmhzILMnHPFoMuXzL7Lu86izYPOpM27zYnOqM2MzoHNjs6szJ_Oh8yby57GnMW-dj48zrkgzrtjzr3Nssa0zqHNts2JzbnOpc28zYrNv82NzJPOhM-KzZTLns-Sbc66zrzLmM-Yy7nOv8-bzqPMhM-ez4TNi86qz4jPpM2Sz4tnz6cvz4_Hqs--CiDGh8-Tz5XPl86fzbPPr823z4HPss-DzqfPtc-izoPNl8yZz4zGrdCCz6jPqs-Wz6zQh8-Z0InPnM-CzYfPn8-Fz7bPo9CSzq7Pu8aty6HQgMaUxpbOjMe8y7_JnyDLlMalx77Ls8u1yJ3IhM-tz5rQisyC0J_Ops290I_Ph9Ckzq3Pus6wzZLOssyjKcu3z63Fl9C7z4XPs8yKL0bFlWU60KXPusia0KsgQ8eLxZrEkcabyKnGtMqcxpYoVGjFvyBiZci4xLlzyKbMgMe8y5TGv9GdyYDRoC_RosiO0aXRp9Gp0avGi9Gux5rQsSDRssi_yoZb0aHJucaWJ9G50a3Ru2HRrNG-0bDSgdGcyL8n0bXKnDzGhtGk0abSi9Gq0o3RvcSP0b_RsdKSxJHImtKF0bbJudKX0bjSmtGo0pzSjtKf0pDSgsSR0oTShsaHxobSidKq0ozSrdGv0oDSsHTSlNGZT8mfxLrJtsaZTG9jYWzMuMqa04TThtOIzLwgyZDJhcmHyYnJi8qlyoLIlMmR05PKrFvFqcS5clXNpsqcL0xJQ0VOU0XIjtOdxIbToMWqy47QgNCW0ITPq86-zYDPsNCLzYXQjdC_z6HRgdCR0YPPps-Rx5fQlcaHy5Roy5bQmsiGyqDLh8iMy53Ln8mwy6HLozzUgtCB0IPPqc-U07TQudCdz7HTudCgz7TTvM6rz7jOhtSA1JJy0KjPvWnPkAo}). (Already mentioned above.) Look which kind of types are exist for ***links*** and ***images***.

## Versioning

This project adheres to [Semantic Versioning](https://semver.org/).

## Change Log

See [`CHANGELOG.md`](/CHANGELOG.md)

## License

[MIT](/LICENSE)
