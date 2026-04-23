const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'node_modules', 'connect-flash', 'lib', 'flash.js');

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace("var isArray = require('util').isArray;", "var isArray = Array.isArray;");
  fs.writeFileSync(file, content);
  console.log('Successfully patched connect-flash to fix util.isArray deprecation warning.');
}
