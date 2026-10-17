'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('node:stream');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { createPixelInjection } = require('../lib/meta-pixel.cjs');

test('inserts one script across arbitrary byte boundaries and preserves the HTML', async () => {
  const html = '<html><head><title>Verdant — São Francisco</title></HEAD><body>Olá! 🌈</body></html>';
  const bytes = Buffer.from(html);
  for (const size of [1, 2, 7, 64, 65536]) {
    const chunks = [];
    for (let i = 0; i < bytes.length; i += size) chunks.push(bytes.subarray(i, i + size));
    const output = [];
    for await (const chunk of Readable.from(chunks).pipe(createPixelInjection())) output.push(chunk);
    const result = Buffer.concat(output).toString();
    const tag = '<script defer src="/assets/meta-pixel.js?v=4208900759401820"></script>';
    assert.equal(result.split(tag).length, 2);
    assert.equal(result.replace(tag, ''), html);
    assert.ok(result.indexOf(tag) < result.indexOf('</HEAD>'));
  }
});

test('leaves responses without an HTML head unchanged', async () => {
  const output = [];
  for await (const chunk of Readable.from(['sem ', 'cabeçalho']).pipe(createPixelInjection())) output.push(chunk);
  assert.equal(Buffer.concat(output).toString(), 'sem cabeçalho');
});

test('queues only init and PageView once even if the website script is loaded twice', () => {
  const inserted = [];
  const window = {};
  const document = {
    createElement: () => ({}),
    getElementsByTagName: () => [{ parentNode: { insertBefore: (script) => inserted.push(script) } }],
  };
  const script = readFileSync(require.resolve('../public/assets/meta-pixel.js'), 'utf8');
  runInNewContext(script, { window, document });
  runInNewContext(script, { window, document });
  assert.equal(inserted.length, 1);
  assert.equal(inserted[0].src, 'https://connect.facebook.net/en_US/fbevents.js');
  assert.deepEqual(Array.from(window.fbq.queue, (args) => Array.from(args)), [
    ['init', '4208900759401820'], ['track', 'PageView'],
  ]);
});
