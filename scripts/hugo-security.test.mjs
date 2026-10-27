import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));

test('Hugo escapes code-fence lineAnchors in development and production builds', () => {
  const temporary = mkdtempSync(path.join(tmpdir(), 'hestia-hugo-security-'));
  const project = path.join(temporary, 'hestia-clear');
  try {
    mkdirSync(project);
    // Copy dependencies too: a symlink outside the project would cross Hugo's sandbox.
    for (const entry of ['assets', 'layouts', 'static', 'exampleSite', 'node_modules',
      'package.json', 'postcss.config.cjs', 'tailwind.config.cjs', 'theme.toml']) {
      cpSync(path.join(root, entry), path.join(project, entry), {
        recursive: true,
        verbatimSymlinks: true,
        filter: source => entry !== 'exampleSite' ||
          !['public', 'resources', '.hugo_build.lock'].includes(path.basename(source)),
      });
    }
    writeFileSync(path.join(project, 'exampleSite/content/posts/security-probe.md'), `+++\ntitle = 'Security probe'\n+++\n\n` +
      '```go {lineNos=true anchorLineNos=true lineAnchors="z\\"><script>alert(8675309)</script>"}\nfunc main() {}\n```\n');

    for (const production of [false, true]) {
      const destination = path.join(temporary, production ? 'production' : 'development');
      const args = ['--source', 'exampleSite', '--themesDir', '../..',
        '--cacheDir', path.join(project, '.hugo_cache'), '--destination', destination,
        '--environment', production ? 'production' : 'development'];
      if (production) args.push('--gc', '--minify');
      const result = spawnSync('hugo', args, {
        cwd: project,
        encoding: 'utf8',
        env: {
          ...process.env,
          PATH: `${path.join(project, 'node_modules/.bin')}${path.delimiter}${process.env.PATH}`,
          NODE_OPTIONS: `--permission --allow-fs-read=${project} --allow-fs-write=${project}`,
        },
      });
      assert.equal(result.status, 0, result.error?.message || result.stderr || result.stdout);
      const html = readFileSync(path.join(destination, 'posts/security-probe/index.html'), 'utf8');
      assert.ok(html.includes('8675309'), 'The malicious anchor must actually be rendered');
      // Minification may decode entities inside a safely quoted attribute. Consume
      // whole tags, including quoted values, so text inside an attribute is not
      // mistaken for a script element.
      const tags = html.match(/<(?:[^"'<>]|"[^"]*"|'[^']*')*>/g) || [];
      assert.ok(!tags.some(tag => /^<script(?:\s|>)/i.test(tag) && !/\bsrc=/.test(tag)),
        'The code fence must not introduce an inline script element');
      assert.equal(tags.filter(tag => /^<(?:span|a)\s/.test(tag) && tag.includes('8675309')).length, 2,
        'The payload must remain inside the span ID and anchor href attributes');
      if (!production) assert.ok(html.includes('&lt;script&gt;'), 'The script markup must be HTML-escaped');
      assert.match(html, /class=["']?[^<>]*?chroma/, 'Code highlighting must remain enabled');
      assert.ok(readFileSync(path.join(destination, 'posts/hello-hestia-clear/index.html'), 'utf8').includes('Hello'),
        'The regular sample article must still render');
    }
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
