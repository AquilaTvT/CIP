import {build} from 'esbuild';
import {readFile, writeFile, readdir} from 'node:fs/promises';
import {resolve} from 'node:path';

await build({entryPoints:['scripts/editor-entry.js'], bundle:true, minify:true,
  target:['safari15.4','chrome100'], format:'iife', outfile:'vendor/editor.js', legalComments:'eof'});
const names = ['codemirror', '@marijn/find-cluster-break', 'crelt', 'style-mod', 'w3c-keyname'];
for (const scope of ['@codemirror', '@lezer']) {
  for (const entry of await readdir(resolve('node_modules', scope))) names.push(`${scope}/${entry}`);
}
const licenses = [];
for (const name of names.sort()) {
  try {
    const info = JSON.parse(await readFile(resolve('node_modules', name, 'package.json'), 'utf8'));
    const license = await readFile(resolve('node_modules', name, 'LICENSE'), 'utf8');
    licenses.push(`${name} ${info.version}\n${'='.repeat(60)}\n${license}`);
  } catch (error) {if (error.code !== 'ENOENT') throw error;}
}
await writeFile('vendor/editor-LICENSES.txt', licenses.join('\n\n'));
console.log('Built local Python editor and third-party notices.');
