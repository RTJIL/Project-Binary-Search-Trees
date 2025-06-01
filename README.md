# Balanced Binary Search Tree (BST) Implementation in JavaScript
## What’s this?
This project builds a balanced binary search tree (BST) from an array of numbers, using Node and Tree classes. It includes all the essential BST operations — insertion, deletion, searching, and multiple traversal methods — plus balance checking and automatic rebalancing when your tree gets lopsided.

You’ll get a solid, efficient tree structure with O(log n) insert/delete/search performance, instead of slow array operations.

## Features
Node class/factory
Stores data and references to left and right child nodes.

Tree class/factory
Initialized with an array, builds a balanced BST automatically (sorted & duplicates removed).

buildTree(array)
Converts an array into a balanced BST, returning the root node.

Insert(value)
Add a new value into the BST in the right spot.

deleteItem(value)
Remove a node by value, handling all cases (leaf, one child, two children).

find(value)
Search the tree for a node containing the value.

Traversals with callbacks

levelOrder(callback) — Breadth-first traversal

inOrder(callback) — Left, root, right

preOrder(callback) — Root, left, right

postOrder(callback) — Left, right, root
Throws an error if no callback is provided.

height(value)
Returns the height (max edges to a leaf) of the node with given value.

depth(value)
Returns the depth (edges from root) of the node with given value.

isBalanced()
Checks if the whole tree is balanced (height difference ≤ 1 for every node).

rebalance()
Rebalances the entire tree if it becomes unbalanced.

prettyPrint(node) (optional helper)
Prints the tree visually in your console for quick debugging.

## Why bother?
Binary search trees are way faster for insert/search/delete than arrays or linked lists — O(log n) instead of O(n) — but they get slow if they get unbalanced (like a linked list). This project keeps the tree balanced and gives you tools to handle all the complex edge cases.
