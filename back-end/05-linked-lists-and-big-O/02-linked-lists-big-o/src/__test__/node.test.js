'use strict';

const Node = require('../lib/node');

describe('node.js', () => {
  test('default constructor', () => {
    const node = new Node('Hound');

    expect(node.value).toEqual('Hound');
    expect(node.next).toBeNull();
  });
});
