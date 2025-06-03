import { Tree } from './Tree.js';

function randArr() {
  let numberOfElem = Math.floor(Math.random() * 50);
  let arr = [];

  for (let i = 0; i < numberOfElem; i++) {
    let randomNumber = Math.floor(Math.random() * 50);
    arr.push(randomNumber);
  }

  return {
    arr,
    numberOfElem,
  };
}
const rand = randArr();

const myTree = Tree(rand.arr);

myTree.preOrder((node) => {
  console.log(node.value);
});

myTree.postOrder((node) => {
  console.log(node.value);
});

myTree.inOrder((node) => {
  console.log(node.value);
});

console.log(myTree.isBalanced());

for (let i = 0; i < rand.numberOfElem; i++) {
  myTree.insertRecursive(Math.floor(Math.random() * 50) + 100);
}

console.log(myTree.isBalanced());

myTree.rebalance();

console.log(myTree.isBalanced());

myTree.preOrder((node) => {
  console.log(node.value);
});

myTree.postOrder((node) => {
  console.log(node.value);
});

myTree.inOrder((node) => {
  console.log(node.value);
});
