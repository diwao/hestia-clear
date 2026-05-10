# hestia-clear

Hestia Clear is a clean, minimal Hugo blog theme built with Tailwind CSS, Hugo Pipes, and PostCSS.

## Requirements

- Hugo v0.152.2 以上
- Node.js 25 以上

## Setup with Hugo Modules

Add the theme to your Hugo site:

```toml
[[module.imports]]
path = "github.com/diwao/hestia-clear"
```

Install the frontend dependencies in your site and add PostCSS/Tailwind config files that point to this theme's CSS entrypoint. This repository includes working `postcss.config.cjs` and `tailwind.config.cjs` examples.

## Development

```bash
npm install
npm run dev
```

`npm run dev` は `hugo server -D` を起動し、Hugo が Tailwind CSS を PostCSS 経由でコンパイルします。ビルド済みの静的サイトは次で生成できます。

```bash
npm run build
```

Tailwind の CSS を単体で最小化して書き出したい場合は次を利用してください。

```bash
npm run build:css
```

## Customization

- Tailwind の設定は `tailwind.config.cjs` で調整できます。
- 追加のスタイルは `assets/css/main.css` の `@layer components` に記述してください。
- Author profile, social links, OGP locale, favicon, and share images can be configured from the consuming Hugo site's params and static assets.

## License

MIT License
