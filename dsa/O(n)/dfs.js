// Estrutura básica do nó da árvore
class Node {
  constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
  }
}


//ways store and save levels
const mapRED = new Map();
const mapERD = new Map();
const mapEDR = new Map();

// DFS - Pré-ordem - RED
function dfsPreOrder(node, level = 1) {
  if (!node) return;

  if (mapRED.has(node.val)) {
    mapRED.get(node.val).push(level);
  } else {
    mapRED.set(node.val, [level]);
  }

  dfsPreOrder(node.left, level + 1);
  dfsPreOrder(node.right, level + 1);
}

// DFS - Em-ordem - ERD
function dfsInOrder(node, level = 1) {
  if (!node) return;

  dfsInOrder(node.left, level + 1);

  if (mapERD.has(node.val)) {
    mapERD.get(node.val).push(level);
  } else {
    mapERD.set(node.val, [level]);
  }

  dfsInOrder(node.right, level + 1);
}

// DFS - Pós-ordem - EDR
function dfsPostOrder(node, level = 1) {
  if (!node) return;
  dfsPostOrder(node.left, level + 1);
  dfsPostOrder(node.right, level + 1);

  if (mapEDR.has(node.val)) {
    mapEDR.get(node.val).push(level);
  } else {
    mapEDR.set(node.val, [level]);
  }
}

function buildTreeLevelOrder(arr) {
  if (!arr || arr.length === 0 || arr[0] == null) return null;

  const root = new Node(arr[0]);
  const queue = [root];
  let head = 0;
  let i = 1;

  while (head < queue.length && i < arr.length) {
    const cur = queue[head++];

    // esquerda
    const leftVal = arr[i++];
    if (leftVal != null) {
      cur.left = new Node(leftVal);
      queue.push(cur.left);
    }

    // direita
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal != null) {
        cur.right = new Node(rightVal);
        queue.push(cur.right);
      }
    }
  }

  return root;
}

// Criando a árvore de exemplo:
//        1
//       / \
//      2   3
//     / \  / \
//    4   5 9  6
//   / \        \
//  7   8        10

// let root = new Node(1);
// root.left = new Node(2);
// root.right = new Node(3);
// root.left.left = new Node(4);
// root.left.right = new Node(5);
// root.right.left = new Node(9);
// root.right.right = new Node(6);
// root.right.right.right = new Node(10);
// root.left.left.left = new Node(7);
// root.left.left.right = new Node(8);

const root = buildTreeLevelOrder([
  1,
  2, 3,
  4, 5, 9, 6,
  7, 8, null, null, null, null, null, 10
]);

// Testando:
console.log("DFS Pré-ordem:");
dfsPreOrder(root);  // 1 2 4 7 8 5 3 9 6 10
console.log('DFS Pré-ordem map:', mapRED);

console.log("DFS Em-ordem:");
dfsInOrder(root);   // 7 4 8 2 5 1 9 3 6 10
console.log('DFS Em-ordem map:', mapERD);

console.log("DFS Pós-ordem:");
dfsPostOrder(root); // 7 8 4 5 2 9 10 6 3 1
console.log('DFS Pós-ordem map:', mapEDR);