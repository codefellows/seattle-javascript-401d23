'use strict';
//-------------------------------------------------------------------------------
// FRONTEND SERVER
//-------------------------------------------------------------------------------
const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
require('dotenv').config();

app.use(express.static('./public'));


httpServer.listen(process.env.PORT, () => {
  console.log('__FRONTEND_SERVER_UP__', process.env.PORT);
});