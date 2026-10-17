'use strict';

const { Transform } = require('node:stream');

// Inject centrally so future weekly themes and every public HTML page are covered.
const PIXEL_TAG = Buffer.from('<script defer src="/assets/meta-pixel.js?v=4208900759401820"></script>');

function createPixelInjection() {
  let pending = Buffer.alloc(0);
  let inserted = false;
  return new Transform({
    transform(chunk, encoding, callback) {
      if (inserted) return callback(null, chunk);
      pending = Buffer.concat([pending, chunk]);
      const index = pending.toString('latin1').toLowerCase().indexOf('</head>');
      if (index !== -1) {
        inserted = true;
        return callback(null, Buffer.concat([pending.subarray(0, index), PIXEL_TAG, pending.subarray(index)]));
      }
      // Retain only the possible closing-tag prefix between chunks; keep UTF-8 bytes intact.
      const end = Math.max(0, pending.length - 6);
      const output = pending.subarray(0, end);
      pending = pending.subarray(end);
      callback(null, output);
    },
    flush(callback) {
      callback(null, inserted ? undefined : pending);
    },
  });
}

module.exports = { createPixelInjection };
