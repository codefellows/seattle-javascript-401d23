'use strict';

// Vinicio - fs = file system
const fs = require('fs');
const logger = require('./logger');

const fileReader = module.exports = {};
// Vinicio : [] --> execution order
fileReader.readFirstNCharactersAsync = (filePath, characters, callback) => {
  logger.log(logger.VERBOSE, `Reading ${filePath}`); // [1]

  // Vinicio - (error, data) is a very common pattern for Node callbacks
  // [2]
  return fs.readFile( // Vinicio - readFile is an async operation
    filePath,
    (error, fileBuffer) => { // [?]
      if (error) {
        throw error;
      }
      return callback(fileBuffer.toString('utf8', 0, characters));
    },
  );
  // [3]
};

