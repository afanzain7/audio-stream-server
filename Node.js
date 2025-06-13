const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 9000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  const fileStream = fs.createWriteStream('mic_audio.raw');

  ws.on('message', function incoming(data) {
    fileStream.write(data);
  });

  ws.on('close', () => {
    fileStream.end();
    console.log('Client disconnected');
  });
});

