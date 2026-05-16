+++
title = "Code Sample"
date = 2026-05-03T14:15:00+09:00
description = "A sample post for checking inline code and fenced code blocks."
tags = ["code", "syntax"]
categories = ["demo"]
image = ""
+++

Technical posts often mix explanation with small snippets. This page checks inline code, fenced code blocks, and prose following a highlighted block.

Use `resources.Get` when loading an asset from Hugo Pipes. Use `css.PostCSS` when the stylesheet should pass through the configured PostCSS pipeline.

```go-html-template
{{ $postcssConfig := "postcss.config.cjs" }}
{{ $tailwind := resources.Get "css/main.css" | css.PostCSS (dict "config" $postcssConfig) }}
<link rel="stylesheet" href="{{ $tailwind.RelPermalink }}" />
```

JavaScript snippets should also remain readable:

```js
const posts = ["hello", "markdown", "code"];

const visiblePosts = posts.map((slug) => ({
  slug,
  url: `/posts/${slug}/`,
}));

console.log(visiblePosts);
```

After a code block, the article should return to normal spacing. This helps confirm that long technical posts remain comfortable to read.

