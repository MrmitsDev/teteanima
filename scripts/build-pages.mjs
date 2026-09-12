import { readFile, writeFile, mkdir, readdir, lstat, realpath, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = await realpath(fileURLToPath(new URL('../', import.meta.url)));
const source = path.join(root, 'dist');
const output = path.resolve(root, 'build');
const previousOrigin = 'https://teteanima-festas.mito1233712.chatgpt.site';
const productionUrl = new URL(process.env.PAGES_PRODUCTION_URL || 'https://teteanima.pages.dev');
if (productionUrl.protocol !== 'https:' || productionUrl.username || productionUrl.password ||
    productionUrl.pathname !== '/' || productionUrl.search || productionUrl.hash) {
  throw new Error('PAGES_PRODUCTION_URL must be an HTTPS origin without credentials, path, query or fragment.');
}
const origin = productionUrl.origin;
const extensions = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg', '.webp', '.png', '.jpg', '.jpeg', '.avif', '.ico', '.woff', '.woff2']);
const files = [];
async function inspect(directory, relative = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) throw new Error(`Hidden file is not publishable: ${entry.name}`);
    const name = path.join(relative, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symlink is not publishable: ${name}`);
    if (entry.isDirectory()) await inspect(path.join(directory, entry.name), name);
    else if (entry.isFile() && extensions.has(path.extname(name))) files.push(name);
    else throw new Error(`Unexpected public asset: ${name}`);
  }
}
await inspect(source);
const originalHtml = await readFile(path.join(source, 'index.html'), 'utf8');
const html = originalHtml.replaceAll(previousOrigin, origin);
if (html.slice(html.indexOf('<body>')) !== originalHtml.slice(originalHtml.indexOf('<body>'))) {
  throw new Error('The build must not change visible application content.');
}
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
for (const [, ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (ref.startsWith('#')) {
    if (!ids.has(ref.slice(1))) throw new Error(`Missing anchor: ${ref}`);
  } else if (!/^[a-z]+:/i.test(ref)) {
    const target = path.resolve(source, ref.replace(/^\//, '').split(/[?#]/)[0]);
    if (!target.startsWith(source + path.sep) || !(await lstat(target)).isFile()) throw new Error(`Missing asset: ${ref}`);
  }
}
JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);

// This path is fixed, resolved and checked before removing generated output.
if (path.relative(root, output) !== 'build') throw new Error('Unsafe output directory.');
const existing = await lstat(output).catch(error => { if (error.code !== 'ENOENT') throw error; });
if (existing) {
  if (!existing.isDirectory() || existing.isSymbolicLink() || await realpath(output) !== output) {
    throw new Error('Output must be a regular build directory inside this project.');
  }
  await rm(output, { recursive: true, force: true });
}
await mkdir(output, { recursive: true });
for (const name of files) {
  const target = path.join(output, name);
  await mkdir(path.dirname(target), { recursive: true });
  let contents = await readFile(path.join(source, name));
  if (['index.html', 'robots.txt', 'sitemap.xml'].includes(name)) {
    contents = Buffer.from(contents.toString('utf8').replaceAll(previousOrigin, origin));
  }
  await writeFile(target, contents);
}
console.log(`Cloudflare Pages: ${files.length} static files prepared in build/`);
console.log(`Production SEO origin: ${origin}`);
console.log('Design, visible content, CSS, JavaScript, fonts and images preserved.');
