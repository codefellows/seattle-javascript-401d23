'use strict';

class Queue {
  constructor() {
    // Vinicio - in your implementation, this will be a Linked list
    this._storage = [];
  }

  enqueue(value) {
    // Vinicio - putting elements at the end of the array
    this._storage.push(value);
  }

  dequeue() {
    return this._storage.shift();
  }

  peek() {
    return this._storage[0];
  }
  //
  // isEmpty() {
  //
  // }
}

module.exports = Queue;
