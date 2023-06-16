const ftpd = require('ftpd');
const fs = require('fs');

// Configurações do servidor FTP
const port = 21;
const hostname = 'localhost';
const root = __dirname; // Diretório raiz do servidor FTP

// Configurações de autenticação
const users = {
  'username': 'password', // Substitua com suas próprias credenciais
};

// Criação do servidor FTP
const server = new ftpd.FtpServer(hostname, {
  getInitialCwd: function () {
    return root;
  },
  getRoot: function () {
    return root;
  },
  pasvPortRangeStart: 1025,
  pasvPortRangeEnd: 1050,
  tlsOptions: null,
  allowUnauthorizedTls: true,
  useWriteFile: fs.writeFile,
});

// Configuração do evento de autenticação
server.on('client:connected', function (connection) {
  console.log('Client connected: ' + connection.socket.remoteAddress);
});

server.on('client:authenticated', function (connection) {
  console.log('Client authenticated: ' + connection.socket.remoteAddress);
});

server.on('client:disconnected', function (connection) {
  console.log('Client disconnected: ' + connection.socket.remoteAddress);
});

// Configuração do evento de verificação de autenticação
server.on('command:user', function (connection, username, password, callback) {
  if (users.hasOwnProperty(username) && users[username] === password) {
    callback(null, username);
  } else {
    callback(new Error('Authentication failed'));
  }
});

// Inicia o servidor FTP
server.listen(port);

console.log('Servidor FTP em execução em ' + hostname + ':' + port);
