import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  const files = {
    '/': ['index.html', 'text/html'],
    '/index.html': ['index.html', 'text/html'],
    '/script.js': ['script.js', 'text/javascript'],
  };
  const file = files[new URL(req.url, 'http://localhost').pathname];

  if (!file) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  fs.readFile(path.join(__dirname, 'public', file[0]), (error, content) => {
    if (error) {
      console.error(`Failed to read ${file[0]}:`, error);
      res.writeHead(500);
      res.end('Internal Server Error');
      return;
    }

    res.writeHead(200, { 'Content-Type': file[1] });
    res.end(content);
  });
});

const wss = new WebSocketServer({ server });

function broadcast(message) {
  const serializedMessage = JSON.stringify(message);
  wss.clients.forEach((client) => client.send(serializedMessage));
}

wss.on('connection', (socket, req) => {
  const username = new URL(req.url, "http://localhost").searchParams.get(
    "username",
  );

  broadcast({ type: 'system', text: `${username} joined` });

  socket.on('message', (msg) => {
    const { username, text } = JSON.parse(msg.toString());
    broadcast({ type: 'chat', username, text });
  });

  socket.on('close', () => {
    broadcast({ type: 'system', text: `${username} left` });
  });
});

server.listen(PORT, () => {
  console.log('Chat server running at http://localhost:3001');
});