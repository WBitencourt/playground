// Estrutura básica do nó da árvore
class Node {
  constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
  }
}

// BFS
// function bfs(root) {
//   if (!root) return;
//   let queue = [root];
//   while (queue.length > 0) {
//       let current = queue.shift();
//       console.log(current.val);
//       if (current.left) queue.push(current.left);
//       if (current.right) queue.push(current.right);
//   }
// }

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

// Criando a árvore de exemplo:
//        1
//       / \
//      2   3
//     / \   \
//    4   5   6
//   / \
//  7   8

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