const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let adminConnected = false;

io.on('connection', (socket) => {
    if (socket.handshake.query.role === 'admin') {
        adminConnected = true;
        io.emit('adminStatus', true);
    }
    socket.on('audio', (data) => {
        if (adminConnected) socket.broadcast.emit('audio', data);
    });
    socket.on('disconnect', () => {
        if (socket.handshake.query.role === 'admin') {
            adminConnected = false;
            io.emit('adminStatus', false);
        }
    });
});

server.listen(process.env.PORT || 3000, '0.0.0.0', () => console.log('Server on port'));
