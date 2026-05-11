const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 8000;
const rootDir = path.resolve(__dirname);

const proxyTargets = {
  '/proxy/wayback': 'http://127.0.0.1:3000',
  '/proxy/xuat': 'http://127.0.0.1:5000',
  '/proxy/screenshot': 'http://127.0.0.1:7000'
};

function sendError(res, code) {
  res.writeHead(code, { 'Content-Type': 'text/plain' });
  res.end(http.STATUS_CODES[code]);
}

function serveStatic(req, res) {
  let requestPath = url.parse(req.url).pathname;
  if (requestPath === '/') requestPath = '/index.html';

  const filePath = path.join(rootDir, requestPath);
  if (!filePath.startsWith(rootDir)) {
    return sendError(res, 403);
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return sendError(res, 404);
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

function proxyRequest(req, res, targetUrl) {
  const parsedTarget = url.parse(targetUrl);
  const parsedReq = url.parse(req.url);
  const proxyPath = parsedReq.path.replace(/^\/(proxy\/(wayback|xuat|screenshot))/, '');
  const options = {
    protocol: parsedTarget.protocol,
    hostname: parsedTarget.hostname,
    port: parsedTarget.port,
    path: proxyPath || '/',
    method: req.method,
    headers: Object.assign({}, req.headers, {
      host: parsedTarget.host
    })
  };

  const proxy = http.request(options, (proxyRes) => {
    const headers = Object.assign({}, proxyRes.headers, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.writeHead(proxyRes.statusCode, headers);
    proxyRes.pipe(res);
  });

  proxy.on('error', () => {
    sendError(res, 502);
  });

  req.pipe(proxy);
}

const server = http.createServer((req, res) => {
  const requestPath = url.parse(req.url).pathname;

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  if (requestPath.startsWith('/proxy/wayback') || requestPath.startsWith('/proxy/xuat') || requestPath.startsWith('/proxy/screenshot')) {
    let target;
    if (requestPath.startsWith('/proxy/wayback')) {
      target = proxyTargets['/proxy/wayback'];
    } else if (requestPath.startsWith('/proxy/xuat')) {
      target = proxyTargets['/proxy/xuat'];
    } else {
      target = proxyTargets['/proxy/screenshot'];
    }
    return proxyRequest(req, res, target);
  }

  serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`GENO TOOL server running at http://localhost:${port}`);
});
