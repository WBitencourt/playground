class Node {
  constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
  }
}

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);

// Criando a árvore de exemplo:
//        1
//       / \
//      2   3
//     / 
//    4 

var maxDepth = function(root) {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
};

console.log('maxDepth: ', maxDepth(root));