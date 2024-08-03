# textlint-rule-allowed-uris

A textlint rule for checking **allowed URIs** in ***links*** and ***images*** of Markdown.🔥

> [!IMPORTANT]
>
> This rule only supports **Markdown(`.md`)** files. Note that it does not recognize URIs in Text(`.txt`) files.

## Allowed formats

You can use any ***links*** and ***images*** formats which are supported by Markdown! See examples below. these all types are considered.

<details>
<summary> Click to see examples</summary>

```markdown
## Links

<!-- markdown-autolink-raw -->

https://www.google.com

example@gmail.com

<!-- markdown-autolink-bracket -->

<https://www.google.com>

<example@gmail.com>

<!-- markdown-inline -->

[google](https://www.google.com "Hello Google")

[google]() <!-- empty link -->

[title](#heading) <!-- fragment -->

[README.md](README.md) <!-- relative path -->

<!-- markdown-reference-full -->

[google][link1]

[link1]: https://www.google.com "Hello Google"

<!-- markdown-reference-collapsed -->

[link2][]

[link2]: https://www.google.com "Hello Google"

<!-- markdown-reference-shortcut -->

[link3]

[link3]: https://www.google.com "Hello Google"

<!-- html -->

<a href="https://www.google.com">google</a>

## Images

<!-- markdown-inline -->

![example](https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg "Example Image")

<!-- markdown-reference-full -->

![example][image1]

[image1]: https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg "Example Image"

<!-- markdown-reference-collapsed -->

![image2][]

[image2]: https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg "Example Image"

<!-- markdown-reference-shortcut -->

![image3]

[image3]: https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg "Example Image"

<!-- html -->

<img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">

## Image with link

[![example](https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg "Example Image")](https://en.wikipedia.org/wiki/File:Example.jpg)

## Comment

[//]: # (This behaves like a comment)
[//]: # "This behaves like a comment"
[//]: # 'This behaves like a comment'
```

</details>

You can also check out the AST Tree of the examples. [Click!](https://textlint.github.io/astexplorer/#/snippet/woXCqHBhcnNlcklEwrh0ZXh0bGludDptxINrZG93bi10by1hc3TCqMSFdHTEkGdzwoHEisSMxI7EkMSSxJRyxJbEmMSaxJzEnsSgw4DCqHbEhnNpb27EqMSqxI3Ej8SRxJPElcSXxJnEm8SdxJ90wqYxNC4wLjTCqGZpbGVuYW1lwrBzb3VyY2UudW5kZcWUbmVkwqRjb8Wmw5oGUyMjIEzEkGtzCgo8IS0tIMSvxLHFh2F1xJzFgmstcmF3IMW-PsW6aMSkcHM6Ly93xpguZ29vZ8WWLsWtbcW6xIzFmXDFlkBnxJTFlcagb8aixbvFvcW_xoHFhsSaxoTGhsW3LWLGimNrZXTGjS3Gj8W7xpF0xpPGlcaXxpnGm8adxp_GoceBPMakbcamZcaoxqpsxqxtx43GsMaAxYXEsi3EkMWCZca_x4Fbx4nGnmVdKMeDx4XGlsaYd8aaxpzHpceWICJIZWxsbyBHx6_FliIpxbrHo8e7x6YoKSDFvMW-IGXHkHR5IMaHx6HHv8SlxI7IgiNoZWFkxKbIhMiGxb9mxorGqcWXxr7Gjse_UkVBRE1FLm1kx6fIpMimyKjIqmTImseZcse1YcSlxLkgxIJ0aMiPxq_Ih8ayx5zItWbEhsWXxaEtZnXHtsi-yIDHisemW8aHMV3Hv8mRXTogx6nGlMerx4jIgcexx7PHtce3x7nIgSLFusibx5rEsMazxonFp8mFbsmHxa3HtmHGk8WqyYzGhzJdW8mTCsmQxbfJtsmXyZnHhsesx67Jjsmex7THtse4x7rJjsmkyL_GscebxYfJg8msyYdzaG9ydGPGhcm0xbczybnJu25rypvJvsaSyZrHh8etx6THi8atx7LKhcmhyojHpcqKyabGkW1syL48YcmYyYM9Ism_yZvKpcmdxqEiPsqmZTwvYceBxbMgScSUZ2XFucqLyafGgsSax57EkMegyKIKIVvHj8eRx6fKui91xqZvyJcud2lracWayJhhLsqUZ8aXy6RpcMWqaWEvxZfLhMuEOS9FeMalxp9qcGfHssu6y7zHoMuJYcuLx73JpceZyYHKjsmryLXJrWXJiMmKyrLLlcuXy5nFlsm3y6bMhmXJkse_zJnLi8mSyqHHhMqjy57Ht8uhy6PLpcuny7LLqnLLrMyny6_Lscuzy7XLs2HLuMyCx5DLvcu_zIHLu8y3zITLimXKrsyKyo3EmsqPzI7Jrm_JsMmyZMi-y5fMnmXJtsm4zJ3Mvsm9yZjKoseGzKTLoGTLosuuzKnLqcury63Lpcuwy6jLtG7Ltsy0y7nMu8eRLsu-zIAizLbHkcuIzL7NgMmAzYLJqsmEzYXMkMqSypTKlsqYzJRbzY3Km82RzJrKoM2UzKLNlsufzKbNm8ywzKvMrcuuzaHLss2jzaXMtc2ozLjNrM2uxZbNsMyazbLFv8qwzJPHgMmly6bMgHPFoMq4y5zNl86IzKjOis2ezK7OjsyxzaTMs86SzIPNqsu_yr_FusuHzIXLiyDLo8i8yI3Ft8e_zJXOk8iCzqXOh82ZzK7NnM6LzZ_Mr82izLLLt82nzrHNq8y6zIPOmMyHKcubzZXGlsWXzZrNoM6pzKzPiC9GxZVlOs6WxaLNq8e-CsuHQ8atxZrEkce_xpbJliDFtChUaGlzIGJlaGHEuc-2xI_GvCDKtcahz6t0x75bz67Jl8W0Is-zz7XPt8-5z7vLjM68z7_Qgc-qyKDJpNCGL8-vxbQn0IvPts-4z7rPvNCRx6DQk23Qgyc})

## Usage

### NO

1. URIs which are not recognized by Markdown.
    - Note that every URIs should be recognized by Markdown.
    - For example, URIs without `https://...` or `http://...`.

        ```markdown
        <www.google.com>
        www.google.com 
        ```

## Contributing

Thanks for having attention to this package.🙇‍♂️ Issues and PRs are always welcomed.🎉

I recommend you to read [textlint guides](https://textlint.github.io/) before contributing. 

And check out the [Installation](#installation) and [Concepts of `textlint-rule-allowed-uris`](#concepts-of-textlint-rule-allowed-uris) guides below. It will help you to understand how this package works.

### Installation

1. Fork it.
1. Clone it to your local directory. ([Git](https://git-scm.com/downloads) is needed!)

    ```bash
    git clone https://github.com/lumirlumir/textlint-rule-allowed-uris.git
    ```

1. Move to the `textlint-rule-allowed-uris` directory.

    ```bash
    cd textlint-rule-allowed-uris
    ```

1. Install npm packages. ([Node.js](https://nodejs.org/en) is needed!)

    ```bash
    npm install
    ```

1. Edit codes.

1. Create `feature` branch.

    ```bash
    git switch -c feature
    ```

1. Commit your changes.

    ```bash
    git commit -am "feat: feature"
    ```

1. Push them to your remote branch.

    ```bash
    git push --set-upstream origin feature
    ```

1. Submit a pull request.👍

### Concepts of `textlint-rule-allowed-uris`

`textlint-rule-allowed-uris` rule checks **allowed URIs** in ***links*** and ***images*** of Markdown.

Detailed node types which are checked by this rule are described below.

1. ***Links***

    1. `ASTNodeTypes.Link`
    1. `LinkReference` & `Definition`
    1. `ASTNodeTypes.Html`

2. ***Images***

    1. `ASTNodeTypes.Image`
    1. `ImageReference` & `Definition`
    1. `ASTNodeTypes.Html`

> [!NOTE]
>
> `LinkReference`, `ImageReference` and `Definition` are types parsed by [`@textlint/text-to-ast`](https://github.com/textlint/textlint/tree/master/packages/@textlint/markdown-to-ast/). But, It is not defined in [`@textlint/ast-node-types`](https://github.com/textlint/textlint/tree/master/packages/%40textlint/ast-node-types).
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
> i.e. you can use other node types that is not defined in `@textlint/ast-node-types`. like `Definition` type.

#### AST Tree

You can see detailed parsed AST Tree in [here](https://textlint.github.io/astexplorer/#/snippet/woXCqHBhcnNlcklEwrh0ZXh0bGludDptxINrZG93bi10by1hc3TCqMSFdHTEkGdzwoHEisSMxI7EkMSSxJRyxJbEmMSaxJzEnsSgw4DCqHbEhnNpb27EqMSqxI3Ej8SRxJPElcSXxJnEm8SdxJ90wqYxNC4wLjTCqGZpbGVuYW1lwrBzb3VyY2UudW5kZcWUbmVkwqRjb8Wmw5oGUyMjIEzEkGtzCgo8IS0tIMSvxLHFh2F1xJzFgmstcmF3IMW-PsW6aMSkcHM6Ly93xpguZ29vZ8WWLsWtbcW6xIzFmXDFlkBnxJTFlcagb8aixbvFvcW_xoHFhsSaxoTGhsW3LWLGimNrZXTGjS3Gj8W7xpF0xpPGlcaXxpnGm8adxp_GoceBPMakbcamZcaoxqpsxqxtx43GsMaAxYXEsi3EkMWCZca_x4Fbx4nGnmVdKMeDx4XGlsaYd8aaxpzHpceWICJIZWxsbyBHx6_FliIpxbrHo8e7x6YoKSDFvMW-IGXHkHR5IMaHx6HHv8SlxI7IgiNoZWFkxKbIhMiGxb9mxorGqcWXxr7Gjse_UkVBRE1FLm1kx6fIpMimyKjIqmTImseZcse1YcSlxLkgxIJ0aMiPxq_Ih8ayx5zItWbEhsWXxaEtZnXHtsi-yIDHisemW8aHMV3Hv8mRXTogx6nGlMerx4jIgcexx7PHtce3x7nIgSLFusibx5rEsMazxonFp8mFbsmHxa3HtmHGk8WqyYzGhzJdW8mTCsmQxbfJtsmXyZnHhsesx67Jjsmex7THtse4x7rJjsmkyL_GscebxYfJg8msyYdzaG9ydGPGhcm0xbczybnJu25rypvJvsaSyZrHh8etx6THi8atx7LKhcmhyojHpcqKyabGkW1syL48YcmYyYM9Ism_yZvKpcmdxqEiPsqmZTwvYceBxbMgScSUZ2XFucqLyafGgsSax57EkMegyKIKIVvHj8eRx6fKui91xqZvyJcud2lracWayJhhLsqUZ8aXy6RpcMWqaWEvxZfLhMuEOS9FeMalxp9qcGfHssu6y7zHoMuJYcuLx73JpceZyYHKjsmryLXJrWXJiMmKyrLLlcuXy5nFlsm3y6bMhmXJkse_zJnLi8mSyqHHhMqjy57Ht8uhy6PLpcuny7LLqnLLrMyny6_Lscuzy7XLs2HLuMyCx5DLvcu_zIHLu8y3zITLimXKrsyKyo3EmsqPzI7Jrm_JsMmyZMi-y5fMnmXJtsm4zJ3Mvsm9yZjKoseGzKTLoGTLosuuzKnLqcury63Lpcuwy6jLtG7Ltsy0y7nMu8eRLsu-zIAizLbHkcuIzL7NgMmAzYLJqsmEzYXMkMqSypTKlsqYzJRbzY3Km82RzJrKoM2UzKLNlsufzKbNm8ywzKvMrcuuzaHLss2jzaXMtc2ozLjNrM2uxZbNsMyazbLFv8qwzJPHgMmly6bMgHPFoMq4y5zNl86IzKjOis2ezK7OjsyxzaTMs86SzIPNqsu_yr_FusuHzIXLiyDLo8i8yI3Ft8e_zJXOk8iCzqXOh82ZzK7NnM6LzZ_Mr82izLLLt82nzrHNq8y6zIPOmMyHKcubzZXGlsWXzZrNoM6pzKzPiC9GxZVlOs6WxaLNq8e-CsuHQ8atxZrEkce_xpbJliDFtChUaGlzIGJlaGHEuc-2xI_GvCDKtcahz6t0x75bz67Jl8W0Is-zz7XPt8-5z7vLjM68z7_Qgc-qyKDJpNCGL8-vxbQn0IvPts-4z7rPvNCRx6DQk23Qgyc}). (Already mentioned above.) Look which kind of types are exist for ***links*** and ***images***.

## License

[MIT](/LICENSE)
