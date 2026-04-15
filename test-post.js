const http = require('http');
const req = http.request({
  hostname: 'localhost',
  port: 8080,
  path: '/listings/6945973306d87bbf2a2886f1/reviews',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': 0
  }
}, res => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', chunk => console.log(`BODY: ${chunk}`));
});

req.on('error', e => console.error(`problem with request: ${e.message}`));
req.end();
