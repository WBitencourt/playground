// Estrutura básica do nó da árvore
class Node {
  constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
  }
}

// DFS - Pré-ordem - RED
function dfsPreOrder(node) {
  if (!node) return;
  console.log(node.val);
  dfsPreOrder(node.left);
  dfsPreOrder(node.right);
}

// DFS - Em-ordem - ERD
function dfsInOrder(node) {
  if (!node) return;
  dfsInOrder(node.left);
  console.log(node.val);
  dfsInOrder(node.right);
}

// DFS - Pós-ordem - EDR
function dfsPostOrder(node) {
  if (!node) return;
  dfsPostOrder(node.left);
  dfsPostOrder(node.right);
  console.log(node.val);
}

// Criando a árvore de exemplo:
//        1
//       / \
//      2   3
//     / \  / \
//    4   5 9  6
//   / \        \
//  7   8        10

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(9);
root.right.right = new Node(6);
root.right.right.right = new Node(10);
root.left.left.left = new Node(7);
root.left.left.right = new Node(8);

// Testando:
console.log("DFS Pré-ordem:");
dfsPreOrder(root);  // 1 2 4 7 8 5 3 9 6 10

console.log("DFS Em-ordem:");
dfsInOrder(root);   // 7 4 8 2 5 1 9 3 10 6

console.log("DFS Pós-ordem:");
dfsPostOrder(root); // 7 8 4 5 2 9 10 6 3 1