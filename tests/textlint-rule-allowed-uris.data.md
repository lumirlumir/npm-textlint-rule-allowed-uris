<!-- markdownlint-disable --> <!-- eslint-disable -->

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

[title](#heading) <!-- hash(fragment) -->

[README.md](../README.md) <!-- relative path -->

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

<div><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"></div>

<div>
  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">
  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg">
</div>

## Image with a link

[![example](https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg "Example Image")](https://en.wikipedia.org/wiki/File:Example.jpg)

## Comments

[//]: # (This behaves like a comment)
[//]: # "This behaves like a comment"
[//]: # 'This behaves like a comment'
[comment]: <> (This behaves like a comment)
[comment]: <> "This behaves like a comment"
[comment]: <> 'This behaves like a comment'

## Others

[linkLocal1]

[linkLocal1]: /README.md "Hello README"

[neverUsed]: /LICENSE "neverUsed"

<div>
  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><br>
  <a href="https://www.google.com">google</a><br>
  <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"><br>
</div>
