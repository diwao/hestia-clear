# hestia-clear

Hestia Clear is a clean, minimal Hugo blog theme built with Tailwind CSS, Hugo Pipes, and PostCSS.

## Requirements

- Hugo v0.152.2 or later
- Node.js 22 or later

## Setup with Hugo Modules

Add the theme to your Hugo site:

```toml
[[module.imports]]
path = "github.com/diwao/hestia-clear"
```

Install the frontend dependencies in your site and add PostCSS/Tailwind config files at the root of your Hugo project. Hugo will process the theme stylesheet with the consuming site's PostCSS configuration.

```bash
npm install -D postcss postcss-cli autoprefixer tailwindcss @tailwindcss/typography
```

When this theme is installed under `themes/hestia-clear`, keep `postcss.config.cjs`, `tailwind.config.cjs`, and `package.json` in your site root:

```text
my-site/
  hugo.toml
  package.json
  postcss.config.cjs
  tailwind.config.cjs
  themes/
    hestia-clear/
```

This theme intentionally does not pass a custom PostCSS config file name from its templates. Hugo's default PostCSS lookup should use the consuming project's root configuration. The `exampleSite` configuration files in this repository are only for local theme development and preview.

## Development

This repository includes an `exampleSite` for local theme development and visual checks.

```bash
npm install
npm run dev
```

Open `http://localhost:1313/` after the development server starts. The npm script runs Hugo against `exampleSite` and resolves this repository as the local theme. The PostCSS and Tailwind files inside `exampleSite` are local preview fixtures, not required files for consuming projects.

To run Hugo directly, include the local npm binaries in `PATH`:

```bash
PATH="./node_modules/.bin:$PATH" NODE_OPTIONS="--permission --allow-fs-read=$PWD --allow-fs-write=$PWD" hugo server -D --source exampleSite --themesDir ../.. --cacheDir "$PWD/.hugo_cache"
```

Generate a production build of the example site with:

```bash
npm run build
```

CSS is processed by Hugo Pipes and PostCSS during Hugo builds; this repository
does not commit generated Tailwind output.

## Customization

- Adjust Tailwind settings in `tailwind.config.cjs`.
- Add custom component styles to the `@layer components` block in `assets/css/main.css`.
- Author profile, social links, OGP locale, favicon, share images, and a GA4 measurement ID via `googleanalytics` can be configured from the consuming Hugo site's params and static assets.

## License

MIT License
