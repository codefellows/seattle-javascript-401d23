'use strict';

const fileReader = require('../lib/reader'); // intellisense
const fs = require('fs');

const files = [
  `${__dirname}/src/../../data/1.txt`,
  `${__dirname}/src/../../data/2.txt`,
  `${__dirname}/src/../../data/3.txt`,
];

const badFiles = [
  `${__dirname}/src/../../data/1.txt`,
  `${__dirname}/src/../../data/NOTGOOD.txt`,
  `${__dirname}/src/../../data/3.txt`,
];

const compare1 = [];
const compare2 = [];

// runs before all it/test blocks
beforeAll((done) => {
  return fs.readFile(files[0], 'utf8', (err1, data1) => {
    compare1.push(data1);
    return fs.readFile(files[1], 'utf8', (err2, data2) => {
      compare1.push(data2);
      return fs.readFile(files[2], 'utf8', (err3, data3) => {
        compare1.push(data3);
        done();
      });
    });
  });
});

describe('testing file reader module', () => {
  it('should return an array of text equal to COMPARE1 array', () => {
    return fileReader.readFiles(files, (data) => {
      compare2.push(data);
      if (compare2.length === compare1.length) {
        expect(compare2).toEqual(compare1);
      }
    });
  });

  it('should err out for nonexistant first file', () => {
    return fileReader.readFiles(badFiles, (err) => {
      console.log(err);
      // expect(err).toHaveProperty('errno');
      expect(err.cause).toEqual('ENOENT');
    });
  });
});
