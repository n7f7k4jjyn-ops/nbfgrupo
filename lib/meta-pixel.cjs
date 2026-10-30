'use strict';

const fs = require('node:fs');
const path = require('node:path');

const PIXEL_TAG = '<script defer src="/assets/meta-pixel.js?v=4208900759401820"></script>';

// Hostinger may serve .html files directly, bypassing Node. Prepare the deployed
// copies before listening, without changing the weekly HTML sources in GitHub.
function preparePixelHtml(publicRoot) {
  let updated = 0;
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(file);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        const html = fs.readFileSync(file, 'utf8');
        if (html.includes(PIXEL_TAG) || !/<\/head>/i.test(html)) continue;
        const output = html.replace(/<\/head>/i, (closingTag) => PIXEL_TAG + closingTag);
        const temporary = file + '.pixel-tmp';
        fs.writeFileSync(temporary, output);
        fs.renameSync(temporary, file);
        updated++;
      }
    }
  }
  visit(publicRoot);
  return updated;
}

module.exports = { preparePixelHtml, PIXEL_TAG };
