'use strict';

// CONTEXT: The "this" value of a currently called function 


//This is just reference code to compare regular constructors with ES6 classes
function OtherPerson(name, age, location) {
  this.name = name;
  this.age = age;
  this.location = location;
}

OtherPerson.prototype.speak = function() {
  return `Hi, my name is ${this.name}, I'm ${this.age} years old, and I live in ${this.location}`;
}

class Person {
  // constructor is initialization of our state
  constructor(name, age, location) {
    this.name = name;
    this.age = age;
    this.location = location;
  }

  speak(msg) {
    return `Hi, my name is ${this.name}, I'm ${this.age} years old, and I live in ${this.location}. ${msg}`;
  }
}

const randomPerson = {
  name: 'Vinicio',
  age: 29,
  location: 'Seattle',
}

const judy = new Person('Judy', 30, 'Seattle');
// CALL: can be used to change context of a function invocation
console.log(Person.prototype.speak.call(randomPerson, 'random message'), 'CALL METHOD');

// APPLY: similar to CALL except it takes an array of possible arguments
console.log(Person.prototype.speak.apply(randomPerson, ['random message']), 'APPLY METHOD');
const ints = [10, 1, 3, 4];

console.log(Math.max.apply(null, ints));
Math.max(...ints);

// BIND: returns a new function with specified context, basically resassigns that function to a new variable that will always get called with that specified context

const vinicioSpeaks = Person.prototype.speak.bind(randomPerson, 'random message for bind method');

console.log(vinicioSpeaks(), 'BIND METHOD');

