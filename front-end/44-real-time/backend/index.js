'use strict';

//--------------------------------------------------------------------
// BACKEND SERVER
//--------------------------------------------------------------------
const uuid = require('uuid/v4');
const express = require('express');
const app = express();
require('dotenv').config();
// Vinicio - HTTP comes from node
// Vinicio - creatin ga vanilla HTTP server that uses express behind the scenes
const httpServer = require('http').Server(app);
//--------------------------------------------------------------------
// SOCKET.IO SERVER
//--------------------------------------------------------------------
const realTimeServer = require('socket.io')(httpServer);

const SEND_MESSAGE = 'SEND_MESSAGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

realTimeServer.on('connection', socket => {
  console.log('__CONNECTION__', socket.id);
  // Vinicio here, I can add event listeners to that client

  // Vinicio - data will be whatever the client had in the input form
  socket.on(SEND_MESSAGE, data => {
    console.log('__SOCKET_EVENT__', SEND_MESSAGE);
    // Vinicio - this is beig sent to the original receiver
    socket.emit(RECEIVE_MESSAGE,'You have sent a message! Congrats!');
    realTimeServer.emit(RECEIVE_MESSAGE, {
      ...data,
      id: uuid(),
      timestamp: new Date(),
    });
  });
});

realTimeServer.on('disconnect', () => {
  console.log('__SOCKET_DISCONNECT__', realTimeServer.id);
});


realTimeServer.on('error', error => {
  // TODO: Refactor this process to add logs
  console.log('__ERROR__', error);
});


httpServer.listen(process.env.PORT, () => {
  console.log('__BACKED_SERVER_UP__',process.env.PORT);
});
