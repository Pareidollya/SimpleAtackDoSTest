const http = require('http');

const postData = new URLSearchParams({
  email: 'usuario1@example.com',
  senha: 'senha1',
}).toString();

const options = {
  hostname: 'localhost',
  port: 80,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(chunk);
  });
});

req.on('error', (error) => {
  console.error(`Erro na requisição: ${error.message}`);
});

req.write(postData);
// console.log(postData)
req.end();
