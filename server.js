'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

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
});
const SHORT_LINKS = Object.freeze({
  '/lovers': 'https://connect.verdantcwb.com/lista/lover',
  '/aniversario': 'https://connect.verdantcwb.com/lista/aniversario',
  '/djs': 'https://connect.verdantcwb.com/lista/djs',
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
  try {
    pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
  } catch {
    return sendText(res, 400, 'Requisição inválida', headOnly);
  }

  const shortLinkPath = pathname.replace(/\/+$/, '') || '/';
  const shortLinkTarget = SHORT_LINKS[shortLinkPath];
  if (shortLinkTarget) {
    const location = new URL(shortLinkTarget);
    location.search = new URL(req.url || '/', 'http://localhost').search;
    res.writeHead(301, {
      Location: location.toString(),
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    });
    return res.end();
  }

  if (pathname === '/') pathname = '/index.html';
  if (pathname === '/listas' || pathname === '/listas/') pathname = '/listas/index.html';
  if (pathname.endsWith('/')) pathname += 'index.html';

  const filePath = path.resolve(PUBLIC_ROOT, `.${pathname}`);
  if (filePath !== PUBLIC_ROOT && !filePath.startsWith(`${PUBLIC_ROOT}${path.sep}`)) {
    return sendText(res, 403, 'Acesso negado', headOnly);
  }

  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) return sendText(res, 404, 'Página não encontrada', headOnly);

    const extension = path.extname(filePath).toLowerCase();
    const isHtml = extension === '.html';
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[extension] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': isHtml ? 'no-cache' : 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'SAMEORIGIN',
    });

    if (headOnly) return res.end();

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) sendText(res, 500, 'Erro interno do servidor');
      else res.destroy();
    });
    stream.pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Verdant pronta na porta ${PORT}`);
  });
}

module.exports = server;
