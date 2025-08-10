
    //     4
    //    / \
    //   2   7
    //  / \  /
    // 1  3 6

// 1️⃣ Ambos menores → vai para a esquerda
// 📌 Exemplo: v1 = 1, v2 = 3

// root = 4

// 1 < 4 e 3 < 4 → ambos menores

// Então o LCA está na subárvore esquerda (raiz 2).

// Nova root = 2

// Agora 1 < 2 e 3 > 2 → estão em lados diferentes → LCA = 2.

// 2️⃣ Ambos maiores → vai para a direita
// 📌 Exemplo: v1 = 6, v2 = 7

// root = 4

// 6 > 4 e 7 > 4 → ambos maiores

// Então o LCA está na subárvore direita (raiz 7).

// Nova root = 7

// Agora 6 < 7 e 7 = 7 → lados diferentes → LCA = 7.

// 3️⃣ Caso contrário → root atual é o LCA
// 📌 Exemplo: v1 = 1, v2 = 7

// root = 4

// 1 < 4 e 7 > 4 → estão em lados diferentes

// Então o próprio root (4) é o LCA.


function lca(root, v1, v2) {
  if (v1 > v2) [v1, v2] = [v2, v1]; // garante v1 <= v2

  while (root) {
    if (v2 < root.data) {
      root = root.left;
    } else if (v1 > root.data) {
      root = root.right;
    } else {
      return root; // v1 <= root.data <= v2 -> achou o LCA
    }
  }
  return null; // se não encontrar (não deve ocorrer se v1 e v2 existem)
}


function lca(root, v1, v2) {
  if (!root) return null;
  if (v1 > v2) [v1, v2] = [v2, v1];

  if (v2 < root.data) return lca(root.left, v1, v2);
  if (v1 > root.data) return lca(root.right, v1, v2);
  return root;
}

function lcaBinaryTree(root, v1, v2) {
  let found1 = false, found2 = false;

  function dfs(node) {
    if (!node) return null;

    const left = dfs(node.left);
    const right = dfs(node.right);

    if (node.data === v1) { found1 = true; return node; }
    if (node.data === v2) { found2 = true; return node; }

    if (left && right) return node;        // v1 e v2 em lados diferentes
    return left ?? right;                  // propaga quem achou (ou null)
  }

  const lca = dfs(root);
  return (found1 && found2) ? lca : null;  // garante que ambos existem
}

// 1) Ambos menores → esquerda (v1=1, v2=3)
// root = 4

// v2 < 4? 3 < 4 ✅ ⇒ root = root.left (vai para 2)

// root = 2

// v2 < 2? 3 < 2 ❌

// v1 > 2? 1 > 2 ❌

// caso contrário: v1 <= root.data <= v2 ⇒ 1 <= 2 <= 3 ✅ ⇒ retorna 2 (LCA = 2)

// 2) Ambos maiores → direita (v1=6, v2=7)
// root = 4

// v2 < 4? 7 < 4 ❌

// v1 > 4? 6 > 4 ✅ ⇒ root = root.right (vai para 7)

// root = 7

// v2 < 7? 7 < 7 ❌

// v1 > 7? 6 > 7 ❌

// caso contrário: v1 <= root.data <= v2 ⇒ 6 <= 7 <= 7 ✅ ⇒ retorna 7 (LCA = 7)

// (note que “um é igual ao root” também cai no caso do meio e já retorna o root como LCA)

// 3) Lados diferentes → root atual é o LCA (v1=1, v2=7)
// root = 4

// v2 < 4? 7 < 4 ❌

// v1 > 4? 1 > 4 ❌

// caso contrário: 1 <= 4 <= 7 ✅ ⇒ retorna 4 (LCA = 4)

// prontinho — é exatamente assim que a função caminha pela árvore em cada cenário. quer que eu faça o mesmo “trace” para outros pares?