const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const messageStructure = require('./others/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const bot = 'Admin';

//bring our static files to this server
app.use(express.static(path.join(__dirname, 'html_css')));

//to be executed when users connects

io.on('connection', socket => {

    //notifies that user is connected
    socket.emit('message', messageStructure(bot, 'you are connected.'));

    //notifies others that new users is connected now
    debugger;
    socket.broadcast.emit('message', messageStructure(bot, 'New user is connected now.'));

    //when user got disconnected
    socket.on('disconnect', () => {
        io.emit('message', messageStructure(bot, 'user disconnected.'));
    });


    //listen to incoming messages
    socket.on('chat-msg', msg => {
        socket.broadcast.emit('message', messageStructure('USER', msg));
    })

});

//asking server to listen on the said port
const port = 5500 || process.env.port;

server.listen(port, () =>
    console.log(`Server is running on ${port}`));