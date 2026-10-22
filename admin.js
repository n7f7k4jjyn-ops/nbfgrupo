'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(__dirname, 'data'));
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');
const SESSION_COOKIE = 'verdant_admin';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const MAX_JSON_BYTES = 512 * 1024;
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES = Object.freeze({
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
});

const attempts = new Map();

function adminPassword() {
  return process.env.ADMIN_PASSWORD || '';
}

function secret() {
  return crypto.createHash('sha256').update(`verdant:${process.env.ADMIN_SECRET || adminPassword()}`).digest();
}

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function sign(value) {
  return crypto.createHmac('sha256', secret()).update(value).digest('base64url');
}

function createSession() {
  const payload = String(Date.now() + SESSION_TTL_MS);
  return `${payload}.${sign(payload)}`;
}

function parseCookies(header = '') {
  const out = {};
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}

function isAuthenticated(req) {
  if (!adminPassword()) return false;
  const token = parseCookies(req.headers.cookie)[SESSION_COOKIE];
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  return Number(payload) > Date.now();
}

function sendJson(res, status, data, extraHeaders = {}) {
  const body = Buffer.from(JSON.stringify(data), 'utf8');
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': body.length,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders,
  });
  res.end(body);
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(Object.assign(new Error('Conteúdo muito grande'), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function readJson(req) {
  const raw = await readBody(req, MAX_JSON_BYTES);
  try {
    return JSON.parse(raw.toString('utf8') || '{}');
  } catch {
    throw Object.assign(new Error('JSON inválido'), { status: 400 });
  }
}

function text(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function normalizeEvents(input) {
  if (!Array.isArray(input) || input.length > 200) {
    throw Object.assign(new Error('Lista de eventos inválida'), { status: 400 });
  }
  return input.map((e) => {
    const title = text(e && e.title, 120);
    if (!title) throw Object.assign(new Error('Todo evento precisa de título'), { status: 400 });
    const date = text(e.date, 10);
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw Object.assign(new Error('Data inválida (use AAAA-MM-DD)'), { status: 400 });
    }
    const image = text(e.image, 300);
    if (image && !/^(\/|https:\/\/)/.test(image)) {
      throw Object.assign(new Error('Imagem deve começar com / ou https://'), { status: 400 });
    }
    const link = text(e.link, 500);
    if (link && !/^(\/|https?:\/\/)/.test(link)) {
      throw Object.assign(new Error('Link deve começar com / ou http(s)://'), { status: 400 });
    }
    return {
      id: text(e.id, 60) || crypto.randomUUID(),
      title,
      date,
      time: text(e.time, 20),
      location: text(e.location, 120),
      description: text(e.description, 2000),
      image,
      link,
      published: e.published !== false,
    };
  });
}

function loadEvents() {
  try {
    return JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveEvents(events) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${EVENTS_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(events, null, 2));
  fs.renameSync(tmp, EVENTS_FILE);
}

function listMedia() {
  try {
    return fs
      .readdirSync(UPLOAD_DIR)
      .filter((n) => IMAGE_TYPES[path.extname(n).toLowerCase()])
      .map((n) => ({ name: n, url: `/uploads/${encodeURIComponent(n)}`, size: fs.statSync(path.join(UPLOAD_DIR, n)).size }));
  } catch {
    return [];
  }
}

function safeFileName(name) {
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, path.extname(name)).normalize('NFKD').replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'imagem';
  return { ext, file: `${base}${ext}` };
}

function tooManyAttempts(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.reset < now) return false;
  return entry.count >= 5;
}

function registerFailure(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.reset < now) attempts.set(ip, { count: 1, reset: now + 15 * 60 * 1000 });
  else entry.count += 1;
}

async function handleApi(req, res, pathname) {
  const method = req.method;
  const route = pathname.slice('/admin/api'.length);

  if (!adminPassword()) {
    return sendJson(res, 503, { error: 'Painel desativado: defina ADMIN_PASSWORD no servidor.' });
  }

  if (method !== 'GET' && req.headers['x-requested-with'] !== 'verdant-admin') {
    return sendJson(res, 403, { error: 'Requisição não autorizada' });
  }

  if (route === '/login' && method === 'POST') {
    const ip = req.socket.remoteAddress || 'unknown';
    if (tooManyAttempts(ip)) return sendJson(res, 429, { error: 'Muitas tentativas. Aguarde 15 minutos.' });
    const body = await readJson(req);
    if (!safeEqual(body.password || '', adminPassword())) {
      registerFailure(ip);
      return sendJson(res, 401, { error: 'Senha incorreta' });
    }
    attempts.delete(ip);
    const secure = req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '';
    return sendJson(res, 200, { ok: true }, {
      'Set-Cookie': `${SESSION_COOKIE}=${createSession()}; HttpOnly; SameSite=Strict; Path=/admin; Max-Age=${SESSION_TTL_MS / 1000}${secure}`,
    });
  }

  if (route === '/logout' && method === 'POST') {
    return sendJson(res, 200, { ok: true }, { 'Set-Cookie': `${SESSION_COOKIE}=; HttpOnly; SameSite=Strict; Path=/admin; Max-Age=0` });
  }

  if (!isAuthenticated(req)) return sendJson(res, 401, { error: 'Não autenticado' });

  if (route === '/me' && method === 'GET') return sendJson(res, 200, { ok: true });

  if (route === '/overview' && method === 'GET') {
    const events = loadEvents();
    return sendJson(res, 200, {
      events: events.length,
      published: events.filter((e) => e.published).length,
      media: listMedia().length,
      node: process.version,
      uptimeSeconds: Math.round(process.uptime()),
    });
  }

  if (route === '/events' && method === 'GET') return sendJson(res, 200, loadEvents());
  if (route === '/events' && method === 'PUT') {
    const events = normalizeEvents(await readJson(req));
    saveEvents(events);
    return sendJson(res, 200, events);
  }

  if (route === '/media' && method === 'GET') return sendJson(res, 200, listMedia());
  if (route === '/media' && method === 'POST') {
    const original = decodeURIComponent(String(req.headers['x-file-name'] || ''));
    const { ext, file } = safeFileName(original);
    if (!IMAGE_TYPES[ext]) return sendJson(res, 400, { error: 'Formato não suportado (jpg, png, webp, svg)' });
    const data = await readBody(req, MAX_UPLOAD_BYTES);
    if (!data.length) return sendJson(res, 400, { error: 'Arquivo vazio' });
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    const finalName = fs.existsSync(path.join(UPLOAD_DIR, file)) ? `${path.basename(file, ext)}-${Date.now()}${ext}` : file;
    fs.writeFileSync(path.join(UPLOAD_DIR, finalName), data);
    return sendJson(res, 201, { name: finalName, url: `/uploads/${encodeURIComponent(finalName)}` });
  }
  if (route.startsWith('/media/') && method === 'DELETE') {
    const name = path.basename(decodeURIComponent(route.slice('/media/'.length)));
    if (!IMAGE_TYPES[path.extname(name).toLowerCase()]) return sendJson(res, 400, { error: 'Arquivo inválido' });
    try {
      fs.unlinkSync(path.join(UPLOAD_DIR, name));
    } catch {
      return sendJson(res, 404, { error: 'Arquivo não encontrado' });
    }
    return sendJson(res, 200, { ok: true });
  }

  return sendJson(res, 404, { error: 'Rota não encontrada' });
}

// Retorna true quando a requisição foi tratada aqui.
function handle(req, res, pathname) {
  if (pathname.startsWith('/admin/api/')) {
    handleApi(req, res, pathname).catch((error) => {
      if (!res.headersSent) sendJson(res, error.status || 500, { error: error.status ? error.message : 'Erro interno' });
    });
    return true;
  }

  if (pathname === '/api/events.json' && (req.method === 'GET' || req.method === 'HEAD')) {
    const events = loadEvents().filter((e) => e.published);
    const body = Buffer.from(JSON.stringify(events), 'utf8');
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': body.length,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(req.method === 'HEAD' ? undefined : body);
    return true;
  }

  if (pathname.startsWith('/uploads/') && (req.method === 'GET' || req.method === 'HEAD')) {
    const name = path.basename(pathname);
    const type = IMAGE_TYPES[path.extname(name).toLowerCase()];
    const file = path.join(UPLOAD_DIR, name);
    if (!type || !fs.existsSync(file)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Arquivo não encontrado');
      return true;
    }
    const headers = {
      'Content-Type': type,
      'Content-Length': fs.statSync(file).size,
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'",
    };
    res.writeHead(200, headers);
    if (req.method === 'HEAD') res.end();
    else fs.createReadStream(file).pipe(res);
    return true;
  }

  return false;
}

module.exports = { handle };
