'use strict';

// Scope: set of rules that defines how variables are declared and assigned
const a = 2;

// const a;
// a = 2;

/* eslint-disable-next-line */
const add = num => num + a;

const foodBugetAdder = (midMorningSnack) => {
  // const midMorningSnack = whatever we pass in when we call this function
  // these are scoped to foodBudgetAdder
  const bagels = 10;
  // const bagels; // compilation/hoisting (STEP 1)
  // bagels = 10; // interpretation/execution (STEP 2)
  let coffee = 5;

  const breakfastFoodPrice = (price) => {
    const item = price;
    coffee = 2;
    return item + bagels;
  };

  const doughnut = breakfastFoodPrice(20);

  /* eslint-disable-next-line */
  // currying refers to the process of taking a function with n arguments and transforming it into n functions that each take a single argument. It essentially creates a chain of partially applied functions that eventually resolves with a value.

  // closure, where an inner scope can still access an outer scope
  return anotherFoodPrice => `I spent ${anotherFoodPrice + coffee + doughnut + midMorningSnack} dollars on food today`;
};

const initialFood = foodBugetAdder(2);
console.log(initialFood);
console.log(initialFood(6));
