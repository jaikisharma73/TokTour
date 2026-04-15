const http = require('http');

const data = JSON.stringify({ review: null });

const req = http.request({
  hostname: 'localhost',
  port: 8080,
  path: '/listings/6945973306d87bbf2a2886f1/reviews',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  let body = "";
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => console.log(body));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
