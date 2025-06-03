import { mergeSort } from './mergeSort.js';

function Node(data = null, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function Tree(arr) {
  let sortedArr = [...new Set(mergeSort(arr))];

  function buildTree(sortedArr, start = 0, end = sortedArr.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = Node(sortedArr[mid]);

    node.left = buildTree(sortedArr, start, mid - 1);
    node.right = buildTree(sortedArr, mid + 1, end);

    return node;
  }

  let root = buildTree(sortedArr);

  function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  function insertRecursive(value, node = root) {
    if (!node) return Node(value);

    if (value < node.data) {
      node.left = insertRecursive(value, node.left);
    } else if (value > node.data) {
      node.right = insertRecursive(value, node.right);
    } else {
      throw new Error('Value is already in a tree');
    }

    return node;
  }

  function deleteItem(value) {
    let currentRoot = root;
    let prev = null;

    while (currentRoot && currentRoot.data !== value) {
      prev = currentRoot;
      if (value < currentRoot.data) {
        currentRoot = currentRoot.left;
      } else {
        currentRoot = currentRoot.right;
      }
    }

    if (!currentRoot) {
      console.log('No such value in the tree!!!');
      return;
    }

    if (currentRoot.left && currentRoot.right) {
      let nextBiggest = currentRoot.right;
      while (nextBiggest.left) nextBiggest = nextBiggest.left;
      const temp = nextBiggest.data;
      deleteItem(nextBiggest.data);
      currentRoot.data = temp;
      return;
    }

    const child = currentRoot.left ? currentRoot.left : currentRoot.right;

    if (!prev) {
      currentRoot = child;
    } else if (prev.left === current) {
      prev.left = child;
    } else if (prev.right === current) {
      prev.right = child;
    }
  }

  function find(value, node = root, depth = 1) {
    const indent = '  '.repeat(depth);

    if (!node) {
      console.log(`${indent}🔙 null`);
      return null;
    }

    console.log(`${indent}🔍 Checking node: ${node.data}`);

    if (node.data === value) {
      console.log(`${indent}🎯 Found: ${node.data}`);
      return node;
    }

    console.log(`${indent}↘️ Going left...`);
    const leftResult = find(value, node.left, depth + 1);
    if (leftResult) return leftResult;

    console.log(`${indent}↘️ Going right...`);
    const rightResult = find(value, node.right, depth + 1);
    if (rightResult) return rightResult;

    console.log(`${indent}❌ No such element in this branch`);
    return null;
  }

  function levelOrder(callback) {
    if (typeof callback !== 'function')
      throw new Error('Please add appropriate callback func!!!');

    let queue = [root];

    while (queue.length > 0) {
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);

      callback(queue.shift());
    }
  }

  /* function recursiveLevelOrder(callback) {
    function getHeight(node) {
      if (!node) return 0;
      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    function visitLevel(node, level, callback) {
      if (!node) return;

      if (level === 1) {
        callback(node);
      } else {
        visitLevel(node.left, level - 1, callback);
        visitLevel(node.right, level - 1, callback);
      }
    }

    if (typeof callback !== 'function')
      throw new Error('Please add appropriate callback func!!!');

    const height = getHeight(root);

    for (let i = 1; i <= height; i++) {
      visitLevel(root, i, callback);
    }
  } */ // in pipeline

  function preOrder(callback, currentRoot = root) {
    if (typeof callback !== 'function')
      throw new Error('Please add appropriate callback func!!!');

    if (!currentRoot) return;

    if (!currentRoot) return;
    callback(currentRoot);
    preOrder(callback, currentRoot.left);
    preOrder(callback, currentRoot.right);
  }

  function inOrder(callback, currentRoot = root) {
    if (typeof callback !== 'function')
      throw new Error('Please add appropriate callback func!!!');

    if (!currentRoot) return;

    if (!currentRoot) return;
    inOrder(callback, currentRoot.left);
    callback(currentRoot);
    inOrder(callback, currentRoot.right);
  }

  function postOrder(callback, currentRoot = root) {
    if (typeof callback !== 'function')
      throw new Error('Please add appropriate callback func!!!');

    if (!currentRoot) {
      console.log('→ null, return');
      return;
    }

    console.log(`→ Enter ${currentRoot.data}`);
    postOrder(callback, currentRoot.left);
    postOrder(callback, currentRoot.right);
    console.log(`→ Visit ${currentRoot.data}`);
    callback(currentRoot);
    console.log('return');
  }

  function depth(value, currentNode = root) {
    if (!currentNode) return -1;
    if (currentNode.data === value) return currentDepth;

    const left = depth(value, currentNode.left, currentDepth + 1);
    if (left !== -1) return left;

    return depth(value, currentNode.right, currentDepth + 1);
  }

  function heightFromNode(node) {
    if (!node) return -1;

    const leftHeight = heightFromNode(node.left);
    const rightHeight = heightFromNode(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  function height(value) {
    const node = find(value);
    return heightFromNode(node);
  }

  function isBalanced() {
    function dfs(root) {
      if (!root) return [true, 0];

      const [leftBalanced, leftHeight] = dfs(root.left);
      const [rightBalanced, rightHeight] = dfs(root.right);

      const currentBalanced =
        leftBalanced &&
        rightBalanced &&
        Math.abs(leftHeight - rightHeight) <= 1;

      return [currentBalanced, 1 + Math.max(leftHeight, rightHeight)];
    }
    return dfs(root)[0];
  }

  function rebalance() {
    if (!root) return null;

    let queue = [root];
    let currentArray = [];

    while (queue.length > 0) {
      const node = queue.shift();
      currentArray.push(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    const sortedCurrentArray = [...new Set(mergeSort(currentArray))]

    root = buildTree(sortedCurrentArray);
  }

  return {
    getRoot() {
      return root;
    },

    prettyPrint(node = root) {
      prettyPrint(node);
    },

    insertRecursive,

    deleteItem,

    find,

    levelOrder,

    preOrder,

    inOrder,

    postOrder,

    depth,

    height,

    isBalanced,

    rebalance,
  };
}

export { Tree }