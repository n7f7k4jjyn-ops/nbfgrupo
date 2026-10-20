'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { preparePixelHtml } = require('./lib/meta-pixel.cjs');

const PUBLIC_ROOT = path.resolve(__dirname, 'public');
const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const MIME_TYPES = Object.freeze({
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.gif': 'image/gif',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
});
const SHORT_LINKS = Object.freeze({
  '/lovers': 'https://connect.verdantcwb.com/lista/lover',
  '/aniversario': 'https://connect.verdantcwb.com/lista/aniversario',
  '/dj': 'https://connect.verdantcwb.com/lista/djs',
  '/influencers': 'https://connect.verdantcwb.com/lista/influencers',
  '/vip': 'https://connect.verdantcwb.com/lista/vip',
});

function sendText(res, status, message, headOnly = false) {
  const body = Buffer.from(message, 'utf8');
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': body.length,
    'Cache-Control': 'no-store',
  });
  res.end(headOnly ? undefined : body);
}

const server = http.createServer((req, res) => {
  const method = req.method || 'GET';
  const headOnly = method === 'HEAD';
  if (method !== 'GET' && !headOnly) {
    res.setHeader('Allow', 'GET, HEAD');
    return sendText(res, 405, 'Método não permitido', headOnly);
  }

  let pathname;
  let requestUrl;
  try {
    requestUrl = new URL(req.url || '/', 'http://localhost');
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    return sendText(res, 400, 'Requisição inválida', headOnly);
  }

  const OLD_PAGES = { '/politica-de-privacidade.html': '/privacidade.html', '/eventos': '/#eventos', '/modofunk': '/#eventos', '/frenetika': '/#eventos', '/gostoso': '/#eventos', '/ressaka': '/#eventos' };
  const oldTarget = OLD_PAGES[pathname.replace(/\/+$/, '')];
  if (oldTarget) {
    res.writeHead(301, { Location: oldTarget, 'Cache-Control': 'no-cache' });
    return res.end();
  }
  if (pathname === '/listas' || pathname === '/listas/') pathname = '/listas.html';

  const shortLinkPath = pathname.replace(/\/+$/, '') || '/';
  const shortLinkTarget = SHORT_LINKS[shortLinkPath];
  if (shortLinkTarget) {
    const location = new URL(shortLinkTarget);
    location.search = new URL(req.url || '/', 'http://localhost').search;
    res.writeHead(302, {
      Location: location.toString(),
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    return res.end();
  }

  const isPrivatePreview = pathname === '/' && requestUrl.searchParams.get('preview') === 'scopeconnect';
  if (isPrivatePreview) pathname = '/preview/index.html';
  else if (pathname === '/') pathname = '/index.html';
  if (pathname === '/scopeconnect' || pathname === '/scopeconnect/') pathname = '/scopeconnect/index.html';
  if (pathname.endsWith('/')) pathname += 'index.html';

  const filePath = path.resolve(PUBLIC_ROOT, `.${pathname}`);
  if (filePath !== PUBLIC_ROOT && !filePath.startsWith(`${PUBLIC_ROOT}${path.sep}`)) {
    return sendText(res, 403, 'Acesso negado', headOnly);
  }

  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) return sendText(res, 404, 'Página não encontrada', headOnly);

    const extension = path.extname(filePath).toLowerCase();
    const isHtml = extension === '.html';
    const headers = {
      'Content-Type': MIME_TYPES[extension] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': isHtml ? 'no-cache' : 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'SAMEORIGIN',
    };
    if (isPrivatePreview) headers['X-Robots-Tag'] = 'noindex, nofollow';
    headers['Accept-Ranges'] = 'bytes';
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    let start = 0;
    let end = stat.size - 1;
    let status = 200;
    if (range && (range[1] || range[2])) {
      if (range[1]) {
        start = Number(range[1]);
        if (range[2]) end = Math.min(Number(range[2]), end);
      } else {
        start = Math.max(stat.size - Number(range[2]), 0);
      }
      if (start > end || start >= stat.size) {
        res.writeHead(416, { 'Content-Range': 'bytes */' + stat.size });
        return res.end();
      }
      status = 206;
      headers['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size;
      headers['Content-Length'] = end - start + 1;
    }
    res.writeHead(status, headers);

    if (headOnly) return res.end();

    const stream = fs.createReadStream(filePath, { start, end });
    stream.on('error', () => {
      if (!res.headersSent) sendText(res, 500, 'Erro interno do servidor');
      else res.destroy();
    });
    stream.pipe(res);
  });
});

if (require.main === module) {
  preparePixelHtml(PUBLIC_ROOT);
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Verdant pronta na porta ${PORT}`);
  });
}

module.exports = server;

