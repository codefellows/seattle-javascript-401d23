'use strict';

const Queue = require('./lib/queue');


const queue = new Queue();
queue.enqueue(10);
queue.enqueue(12);
queue.enqueue(14);
queue.enqueue('Gregor is better!');

queue.dequeue();
