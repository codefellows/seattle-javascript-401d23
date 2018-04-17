'use strict';

const greet = module.exports = {};

// If you want to research strongly typed languages, research Typescript or Flow
// Code runner

greet.hi = (name) => {
  try {
    if (name === '' || typeof name !== 'string') {
      throw new Error('NAME MUST BE A STRING OR NOT EMPTY');
    }
    return `Hello there, ${name}.`;
  } catch (err) {
    console.error(err);
  }
  return undefined;
};

// greet.hi = (name) => {
//   if (name === '' || typeof name !== 'string') {
//     throw new Error('Name must be put in or name must be a string.');
//   }
//   return `Hello there, ${name}.`;
// };

greet.hi('');
