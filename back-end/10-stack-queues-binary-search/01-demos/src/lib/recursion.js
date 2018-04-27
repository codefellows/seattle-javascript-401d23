'use strict';

const recursiveAddition = (a, b) => {
  if (b === 1) {
    return a + 1;
  }

  return recursiveAddition(a + 1, b - 1);
};


console.log(recursiveAddition(1000, 10));

