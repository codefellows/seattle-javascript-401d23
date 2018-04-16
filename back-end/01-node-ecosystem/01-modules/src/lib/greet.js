'use strict';

const greet = module.exports = {};

greet.hi = (name) => {
  if (name === '' || typeof name !== 'string')
    return -1;

  // Vinicio - This is called 'Template Strings'
  return `Hello, ${name}!`;
};

greet.bye = (name) => {
  if (name === '' || typeof name !== 'string')
    return -1;

  return `Bye!, ${name}`;
};

