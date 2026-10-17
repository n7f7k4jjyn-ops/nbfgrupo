'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { readFileSync } = fs;
const path = require('node:path');
const os = require('node:os');
const { runInNewContext } = require('node:vm');
const { preparePixelHtml, PIXEL_TAG } = require('../lib/meta-pixel.cjs');

test('prepares all nested HTML pages once and preserves the original content and assets', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'verdant-pixel-'));
  try {
    fs.mkdirSync(path.join(root, 'listas'));
    const html = '<html><head><title>Verdant — São Francisco</title></HEAD><body>Olá! 🌈</body></html>';
    const files = ['index.html', 'listas/index.html', 'politica-de-privacidade.html'];
    for (const file of files) fs.writeFileSync(path.join(root, file), html);
    fs.writeFileSync(path.join(root, 'no-head.html'), 'sem cabeçalho');
    const asset = Buffer.from([0, 255, 128, 42]);
    fs.writeFileSync(path.join(root, 'logo.png'), asset);
    assert.equal(preparePixelHtml(root), 3);
    assert.equal(preparePixelHtml(root), 0);
    for (const file of files) {
      const result = fs.readFileSync(path.join(root, file), 'utf8');
      assert.equal(result.split(PIXEL_TAG).length, 2);
      assert.equal(result.replace(PIXEL_TAG, ''), html);
      assert.ok(result.indexOf(PIXEL_TAG) < result.indexOf('</HEAD>'));
    }
    assert.equal(fs.readFileSync(path.join(root, 'no-head.html'), 'utf8'), 'sem cabeçalho');
    assert.deepEqual(fs.readFileSync(path.join(root, 'logo.png')), asset);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
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
