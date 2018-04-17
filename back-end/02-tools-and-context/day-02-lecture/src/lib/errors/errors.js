'use strict';

const greet = module.exports = {};

// Reference error
greet.hiReferenceError = name => `Hi there ${name} and ${otherName}`;

//Syntax error
greet.hiSyntaxError = name => `Hi there ${name} and ${otherName}`;)

//Type error
greet.hiTypeError = (name) => {
  try {
    if (typeof name !== 'string') {
      throw new TypeError(`${name} must be a string!`);
    }
  } catch (err) {
    console.error(err);
  }
};

console.log(greet.hiSyntaxError('judy'));
// greet.hiReferenceError('judy');
