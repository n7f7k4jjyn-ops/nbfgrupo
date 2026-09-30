'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'public');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon','.mp4':'video/mp4','.webp':'image/webp'};
const server = http.createServer((req,res)=>{
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  let file = path.resolve(root, '.' + pathname);
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  if (pathname === '/' || pathname.endsWith('/')) file = path.join(root,'index.html');
  fs.stat(file, (err,stat)=>{
    if (err || !stat.isFile()) file = path.join(root,'index.html');
    fs.readFile(file,(readErr,data)=>{
      if(readErr){res.writeHead(500);return res.end('Erro interno');}
      res.writeHead(200, {'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':path.extname(file)==='.html'?'no-cache':'public, max-age=604800'});
      res.end(data);
    });
  });
});
const port = Number(process.env.PORT) || 3000;
if (require.main === module) {
  server.listen(port, '0.0.0.0', ()=>console.log(`Verdant app ouvindo na porta ${port}`));
}
module.exports = server;
