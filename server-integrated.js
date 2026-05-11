const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 8000;

// Thư mục công cụ
const wayback20Dir = path.join(__dirname, '../wayback20');
const xuatdomainDir = path.join(__dirname, '../xuatdomain');

let waybackProcess = null;
let xuatdomainProcess = null;

// Khởi động Wayback20 (Next.js)
function startWayback20() {
  return new Promise((resolve) => {
    console.log('🚀 Khởi động Wayback20...');
    waybackProcess = spawn('npm', ['run', 'dev'], {
      cwd: wayback20Dir,
      stdio: 'pipe',
      shell: true
    });

    waybackProcess.stderr.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready in') || output.includes('compiled')) {
        console.log('✅ Wayback20 ready');
        resolve();
      }
    });

    waybackProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready in') || output.includes('compiled')) {
        console.log('✅ Wayback20 ready');
        resolve();
      }
    });

    setTimeout(() => {
      console.log('⏱️  Wayback20 timeout, nhưng tiếp tục...');
      resolve();
    }, 10000);
  });
}

// Khởi động Xuatdomain (Flask)
function startXuatdomain() {
  return new Promise((resolve) => {
    console.log('🚀 Khởi động Xuatdomain...');
    xuatdomainProcess = spawn('python3', ['app.py'], {
      cwd: xuatdomainDir,
      stdio: 'pipe',
      env: { ...process.env, FLASK_ENV: 'production' }
    });

    xuatdomainProcess.stderr.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Running on') || output.includes('werkzeug')) {
        console.log('✅ Xuatdomain ready');
        resolve();
      }
    });

    xuatdomainProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Running on') || output.includes('werkzeug')) {
        console.log('✅ Xuatdomain ready');
        resolve();
      }
    });

    setTimeout(() => {
      console.log('⏱️  Xuatdomain timeout, nhưng tiếp tục...');
      resolve();
    }, 5000);
  });
}

// Proxy helper
function proxyToLocalhost(fromPath, toPort) {
  app.use(fromPath, (req, res) => {
    const options = {
      hostname: 'localhost',
      port: toPort,
      path: req.url,
      method: req.method,
      headers: {
        ...req.headers,
        host: `localhost:${toPort}`
      }
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, {
        ...proxyRes.headers,
        'Access-Control-Allow-Origin': '*'
      });
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.error(`Proxy error to port ${toPort}:`, err.message);
      res.status(503).send('Service Unavailable');
    });

    req.pipe(proxyReq);
  });
}

// Serve static files
app.use(express.static(path.join(__dirname)));

// Proxy routes
proxyToLocalhost('/tools/wayback', 3000);
proxyToLocalhost('/tools/xuatdomain', 5000);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    tools: {
      wayback20: waybackProcess ? 'running' : 'stopped',
      xuatdomain: xuatdomainProcess ? 'running' : 'stopped'
    }
  });
});

// Start all services
async function start() {
  try {
    await Promise.all([
      startWayback20(),
      startXuatdomain()
    ]);

    app.listen(PORT, () => {
      console.log(`\n🎉 GENO TOOL máy chủ chính chạy: http://localhost:${PORT}`);
      console.log(`   📦 Wayback20: http://localhost:${PORT}/tools/wayback`);
      console.log(`   🔗 Xuatdomain: http://localhost:${PORT}/tools/xuatdomain`);
    });
  } catch (error) {
    console.error('Lỗi khởi động:', error);
    process.exit(1);
  }
}

// Xử lý tắt
process.on('SIGINT', () => {
  console.log('\n🛑 Đang tắt máy chủ...');
  if (waybackProcess) waybackProcess.kill();
  if (xuatdomainProcess) xuatdomainProcess.kill();
  process.exit(0);
});

start();
