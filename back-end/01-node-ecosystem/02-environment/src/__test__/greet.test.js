'use strict';

const greet = require('../lib/greet');

describe('greet.test.js', () => {
  describe('greet.hi', () => {
    test('Should return Hello, NAME!', () => {
      expect(greet.hi('Gregor')).toEqual('Hello, Gregor!');
    });
    test('Should return -1 in case of error', () => {
      expect(greet.hi('')).toEqual(-1);
      expect(greet.hi()).toEqual(-1);
    });
    test('Should return Cute Cat', () => {
      expect(greet.hi('Hound')).toEqual('Cute Cat');
    });
  });
  describe('greet.bye', () => {
    test('Should return Hello, NAME!', () => {
      expect(greet.bye('Gregor')).toEqual('Bye, Gregor!');
    });
    test('Should return -1 in case of error', () => {
      expect(greet.bye('')).toEqual(-1);
      expect(greet.bye()).toEqual(-1);
    });
  });
});
