'use strict';

// console.log(process.argv);
// //-------------------------------------------------------------
const fs = require('fs');
const parseBitmap = require('./lib/parse-bitmap');
// const testBuffer = Buffer.from('The hound');

// Vinicio - this is HEX
// console.log(testBuffer);
// // Vinicio - this is STRING
// console.log(testBuffer.toString());
// // Vinicio - this is DECIMAL
// console.log(testBuffer[0]);
// console.log(testBuffer.readUInt8(0));
// //-------------------------------------------------------------
// console.log(testBuffer.readUInt16LE(0));
// console.log(testBuffer.readUInt32BE(0));
//-------------------------------------------------------------
// Vinicio - Details to mind when reading from a buffer
// 1 - How many bits am I going to read? // depends on the docs
// 2 - Am I reading a signed or un-signed number? // un-signed
// 3 - Am I in a LE system or a BE system // LE
//-------------------------------------------------------------

// console.log(testBuffer.toString());
// testBuffer[0] = 100;
// console.log(testBuffer.toString());
// testBuffer.write('and');
// console.log(testBuffer.toString());

// fs.readFile(`${__dirname}/assets/litany.txt`, (error, buffer) => {
//   if (error) {
//     throw error;
//   }
//   console.log(buffer.toString());
//   buffer[0] = 50;
//   buffer[1] = 100;
//   buffer[2] = 64;
//   buffer[3] = 200;
//   console.log(buffer.toString());
//
//   for (let i = 0; i < buffer.length; i++) {
//     buffer[i] = i % 127;
//   }
//   console.log(buffer.toString());
//   console.log(buffer);
// });
//---------------------------------------------------------------------
// READING A BITMAP FILE
//---------------------------------------------------------------------
fs.readFile(`${__dirname}/assets/house.bmp`, (error, buffer) => {
  if (error) {
    throw error;
  }
  const parsedBitmap = parseBitmap.parse(buffer);
});
