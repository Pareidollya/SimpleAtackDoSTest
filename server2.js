const http = require('http');
const url = require('url');
const querystring = require('querystring');
const users = require('./users');

function isValidUser(username, password) {
  return users.some(user => user.username === username && user.password === password);
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
    
  if (pathname === '/login' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const formData = querystring.parse(body);
      console.log(formData)
      const username = formData.username;
      const password = formData.password;

      if (isValidUser(username, password)) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Login bem-sucedido!');
      } else {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Usuário ou senha inválidos!');
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Página não encontrada!');
  }
});

const port = 3000;
const hostname = 'localhost';

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

server.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`);
});
