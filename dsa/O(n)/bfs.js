// Estrutura básica do nó da árvore
class Node {
  constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
  }
}

// function bfs(root) {
//   if (!root) return;
//   const queue = [root];
//   let i = 0;
//   while (i < queue.length) {
//     const current = queue[i++];
//     console.log(current.val);

//     if (current.left) queue.push(current.left);
//     if (current.right) queue.push(current.right);
//   }
// }

function bfs(root) {
  if (!root) return;
  const queue = [root];
  const result = [];

  for (let i = 0; i < queue.length; i++) {
    const current = queue[i];
    result.push(current.val);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  console.log(result);
}

function bfsSwapNodes(root) {
  if (!root) return;
  const queue = [root];
  const result = [];

  for (let i = 0; i < queue.length; i++) {
    const current = queue[i];

    const temp = current.left;
    current.left = current.right;
    current.right = temp;

    result.push(current.val);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  console.log(result);
}

function bfsSaveLevels(root) {
  if (!root) return;

  const queue = [{ node: root, level: 1 }];
  const result = [];

  for (let i = 0; i < queue.length; i++) {
    const { node, level } = queue[i];

    result.push({ node: node.val, level });

    if (node.left) queue.push({ node: node.left, level: level + 1 });
    if (node.right) queue.push({ node: node.right, level: level + 1 });
  }

  console.log(result);
}

// Criando a árvore de exemplo:
//        1
//       / \
//      2   3
//     / \   \
//    4   5   6
//   / \
//  7   8

// Criando com swap
  //      1
  //     / \
  //    3   2
  //   /   / \
  //  6   5   4
  //         / \
  //        8   7

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.right = new Node(6);
root.left.left.left = new Node(7);
root.left.left.right = new Node(8);

console.log("BFS:");
bfs(root);          // 1 2 3 4 5 6 7 8

console.log("BFS com swap:");
bfsSwapNodes(root); // [ 1, 3, 2, 6, 5, 4, 8, 7 ]

console.log("BFS com save Levels:");
bfsSaveLevels(root);
// [
//   { node: 1, level: 1 },
//   { node: 3, level: 2 },
//   { node: 2, level: 2 },
//   { node: 6, level: 3 },
//   { node: 5, level: 3 },
//   { node: 4, level: 3 },
//   { node: 8, level: 4 },
//   { node: 7, level: 4 }
// ]