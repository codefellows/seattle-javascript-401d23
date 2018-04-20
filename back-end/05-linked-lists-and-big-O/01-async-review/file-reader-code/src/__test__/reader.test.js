'use strict';

const fileReader = require('../lib/reader'); // intellisense
const fs = require('fs');

const files = [
  `${__dirname}/../../data/1.txt`,
  `${__dirname}/../../data/2.txt`,
  `${__dirname}/../../data/3.txt`,
];

const badFiles = [
  `${__dirname}/../../data/NOTGOOD.txt`,
  `${__dirname}/../../data/1.txt`,
  `${__dirname}/../../data/2.txt`,
];

const mockData = [];
const compare2 = [];

// runs before all it/test blocks
beforeAll((done) => {
  return fs.readFile(files[0], 'utf8', (err1, data1) => {
    mockData.push(data1);
    return fs.readFile(files[1], 'utf8', (err2, data2) => {
      mockData.push(data2);
      return fs.readFile(files[2], 'utf8', (err3, data3) => {
        mockData.push(data3);
        done();
      });
    });
  });
});

describe('testing file reader module', () => {
  it('should return an array of text equal to COMPARE1 array', () => {
    return fileReader.readFiles(files, (data) => {
      compare2.push(data);
      if (compare2.length === mockData.length) {
        expect(compare2).toEqual(mockData);
      }
    });
  });

  it('should err out for nonexistant first file', () => {
    return fileReader.readFiles(badFiles, (err) => {
      expect(err.cause).toEqual('ENOENT');
    });
  });

  it('should throw error for not receiving an array of paths', () => {
    const notArray = 'not an array';
    expect(() => {
      fileReader.readFiles(notArray, () => {});
    }).toThrow(`${notArray} is not an array`);
  });
});
