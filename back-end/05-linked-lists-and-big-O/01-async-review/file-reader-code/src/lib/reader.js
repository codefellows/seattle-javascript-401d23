'use strict';

const fs = require('fs');

const reader = module.exports = {};

reader.readFiles = (paths, callback) => {
  // console.log(paths, 'PATHS');
  if (!Array.isArray(paths) || !paths.length) {
    throw new Error(`${paths} is not an array`);
  }
  fs.readFile(paths[0], 'utf8', (err1, data1) => {
    if (err1) {
      const customError = {
        cause: err1.code,
      };
      return callback(customError);
    }
    callback(data1);
    return fs.readFile(paths[1], 'utf8', (err2, data2) => {
      if (err2) {
        return callback(err2);
      }
      callback(data2);
      return fs.readFile(paths[2], 'utf8', (err3, data3) => {
        if (err3) {
          return callback(err3);
        }
        callback(data3);
        return undefined;
      });
    });
  });
};
