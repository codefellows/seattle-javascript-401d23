'use strict';

const functionA = () => {
  console.log('I am function a');
};

const functionB = () => {
  functionA();
  // ASYNC!!!!
  console.log('I am function b');
};

functionB();
