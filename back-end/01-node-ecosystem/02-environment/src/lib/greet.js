'use strict';

const greet = module.exports = {};

greet.hi = (name) => {
  if (name === '' || typeof name !== 'string') {
    return -1;
  }
  // Vinicio - This code is not tested at the moment
  if (name === 'Hound') {
    return 'Cute Cat';
  }

  return `Hello, ${name}!`;
};

greet.bye = (name) => {
  if (name === '' || typeof name !== 'string') {
    return -1;
  }
  return `Bye, ${name}!`;
};
