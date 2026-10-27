# hestia-clear

Hestia Clear is a clean, minimal Hugo blog theme built with Tailwind CSS, Hugo Pipes, and PostCSS.

## Requirements

- Hugo v0.168.0 or later
- Node.js 24.22.1 or a newer 24.x release

Hugo v0.168.0 is the minimum supported version for security fixes, including
code-block HTML escaping and restrictions on theme/module file access during
builds. Keep Hugo up to date with security releases.

Node.js 24.22.1 is the security-patched baseline. This repository's `.nvmrc`
pins that version, and `engines` with `.npmrc` rejects unsupported Node versions
during npm installs. Keep the pin and minimum version up to date with Node.js
24.x security releases. These repository settings are not applied automatically
to sites consuming the theme through Hugo Modules; use the same Node.js baseline
in your site's build environment.

## Setup with Hugo Modules

Add the theme to your Hugo site:

```toml
[[module.imports]]
path = "github.com/diwao/hestia-clear"
```

Install the frontend dependencies in your site and add PostCSS/Tailwind config files at the root of your Hugo project. Hugo will process the theme stylesheet with the consuming site's PostCSS configuration. Adjust your Tailwind `content.files` entries so they include your site's content and the theme layouts.

Before installing, add this override to your site's root `package.json`.
Typography currently pins an older selector parser; the override selects the
patched 6.x version while retaining compatibility with this theme's Tailwind 3
configuration. npm only applies overrides from the root project, so installing
the theme through Hugo Modules does not apply this setting automatically.

```json
{
  "overrides": {
    "@tailwindcss/typography": {
      "postcss-selector-parser": "^6.1.5"
    }
  }
}
```

Then install the frontend dependencies:

```bash
npm install -D postcss@^8.5.32 postcss-cli@^10.1.0 autoprefixer@^10.4.20 tailwindcss@^3.4.19 @tailwindcss/typography@^0.5.20
```

Commit your site's `package-lock.json`, use `npm ci` for subsequent installs,
and run `npm audit` when updating dependencies. This repository's lockfile is
for theme development and does not control dependencies in consuming sites.

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

This theme intentionally does not pass a custom PostCSS config file name from its templates. Hugo's default PostCSS lookup should use the consuming project's root configuration. The root `postcss.config.cjs` and `tailwind.config.cjs` files are also used for this repository's local `exampleSite` preview and include the theme layouts, assets, and example content in Tailwind's scan paths.

## Development

This repository includes an `exampleSite` for local theme development and visual checks.

```bash
nvm install
nvm use
npm ci
npm run dev
```

The `nvm` commands use `.nvmrc`. If you use another Node version manager,
select the version in that file before running `npm ci`.

Open `http://localhost:1313/` after the development server starts. The npm script runs Hugo against `exampleSite`, resolves this repository as the local theme, and uses the root PostCSS and Tailwind configuration files.

To run Hugo directly, include the local npm binaries in `PATH`:

```bash
PATH="./node_modules/.bin:$PATH" hugo server -D --source exampleSite --themesDir ../.. --cacheDir "$PWD/.hugo_cache"
```

Hugo enables the Node.js permission model for PostCSS. The example site's
`security.node.permissions.allowRead` setting grants the additional theme
directories scanned by Tailwind; no project-wide Node write permission or
custom `NODE_OPTIONS` is needed.

Generate a production build of the example site with:

```bash
npm run build
```

CSS is processed by Hugo Pipes and PostCSS during Hugo builds; this repository
does not commit generated Tailwind output.

Run the Hugo security regression check after installing the dependencies:

```bash
node --test scripts/hugo-security.test.mjs
```

This builds a temporary copy of the example site in development and production
modes and checks that code-block anchor values cannot inject script elements.

## Customization

- Adjust Tailwind settings in `tailwind.config.cjs`.
- Add custom component styles to the `@layer components` block in `assets/css/main.css`.
- Author profile, social links, OGP locale, favicon, share images, and a GA4 measurement ID via `googleanalytics` can be configured from the consuming Hugo site's params and static assets.

## License

MIT License
