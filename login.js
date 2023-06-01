const http = require('http');
const jwt = require('jsonwebtoken');

const postData = {
  'username': 'USER',
  'password': 'senha123'
};

const token = jwt.sign(postData, 'secret_key');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(token)
  },
//   ca: fs.readFileSync('server-cert.pem')
};

const req = http.request(options, (res) => {
  let data = '';
  console.log(`Status code: ${res.statusCode}`);
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(token);
req.end();