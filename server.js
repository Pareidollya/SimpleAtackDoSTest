const http = require('http');

// Lista de usuários válidos
let acessos = 0
let success = 0
let fail = 0
const users = [
  {
    email: 'usuario1@example.com',
    senha: 'senha1 ',
  },
  {
    email: 'email@email.com',
    senha: 'senhasegura123',
  },
];

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      acessos++
      const formData = new URLSearchParams(body);
      console.log(formData)
      const email = formData.get('email');
      const senha = formData.get('senha');

      const user = users.find((user) => user.email === email && user.senha === senha);

      if (user) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        console.log('login bem sucedido! ', user)
        res.end('Login bem-sucedido!');
        success++
      } else {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Falha no login: email ou senha inválidos');
        console.log('Login inválido! ', user)
        fail++
      }
      console.log('Acessos: ', acessos, 'Sucessos: ', success, 'Falhas: ', fail)
    });
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Requisição inválida');
  }
});

const port = 80;
server.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
server.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`);
});