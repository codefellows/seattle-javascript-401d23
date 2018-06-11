'use strict';

import BinaryTree from './lib/binary-tree';
import Node from './lib/node';

const one = new Node(1);
const two = new Node(2);
const three = new Node(3);
const four = new Node(4);
const five = new Node(5);
const six = new Node(6);
const seven = new Node(7);
const eight = new Node(8);
const nine = new Node(9);
const ten = new Node(10);
const tree = new BinaryTree(five);

five.left = three;
five.right = nine;

three.left = two;
three.right = four;

nine.left = six;
nine.right = ten;

six.right = seven;


const findCLosestNode = (inputTree, target) => {
  // TODO : Add Input Validation
  let closestNodeSoFar = inputTree.root;
  let currentNode = inputTree.root;

  while (currentNode !== null) {
    // if (currentNode.value === target) {
    //   return currentNode;
    // }
    //--------------------------------------------------------------
    // UPDATE CLOSEST VALUE
    //--------------------------------------------------------------
    const currentNodeDifference = Math.abs(target - currentNode.value);
    const closestElementDifference = Math.abs(target - closestNodeSoFar.value);

    // Vinicio - THis code would not be as easy to read
    // if (Math.abs(target - currentNode.value) < Math.abs(target - closestNodeSoFar.value)) {
    //   closestNodeSoFar = currentNode;
    // }

    if (currentNodeDifference <= closestElementDifference) {
      closestNodeSoFar = currentNode;
    }

    //--------------------------------------------------------------
    // MOVE DOWN THE TREE
    //--------------------------------------------------------------
    if (currentNode.value > target) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
  }
  return closestNodeSoFar;
};

console.log(findCLosestNode(tree, 5).value);
