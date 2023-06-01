const http = require('http');
const url = require('url');

const jwt = require('jsonwebtoken');
const fs = require('fs');

const users = [
    {
        "username": "USER",
        "password": "senha123",
      },
      {
        "username": "USER2",
        "password": "senha1234"
      }
]

function isValidUser(username, password) { // Verifica se o usuário existe
    return users.some(user => user.username === username && user.password === password);
  }

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/login' && req.method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const decoded = jwt.verify(Buffer.concat(body).toString(), 'secret_key');
      console.log(decoded);
      if(isValidUser(decoded.username, decoded.password)){
        const credencial = jwt.sign({token : decoded.username}, 'secret_key');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`Login com sucesso! Credencial: ${credencial}\n`);
        res.end();
      } else{
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write('Dados inválidos!\n');
        res.end();
      } 
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Página não encontrada!\n');
    res.end();
  }
});

const port = 3000;
const hostname = 'localhost';

server.listen(port, hostname, () => {
  console.log(`Servidor rodando em https://${hostname}:${port}/`);
});

server.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`);
});
