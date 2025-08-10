// Conta quantos grupos existem usando DFS (pilha)
function countGroups(related) {
  const n = related.length;
  const visited = Array(n).fill(false);

  // Considera conectados se houver 1 em qualquer direção i<->j
  const connected = (i, j) => {
    return related[i][j] === '1' || related[j][i] === '1';
  }

  let groups = 0;

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    groups++;
    const stack = [i]; //numero da pessoa
    visited[i] = true;

    while (stack.length) {
      const u = stack.pop();
      for (let v = 0; v < n; v++) {
        if (!visited[v] && connected(u, v)) {
          visited[v] = true;
          stack.push(v);
        }
      }
    }
  }

  return groups;
}

// --- teste rápido com seu exemplo:
const related = ['1100','1110','0110','0001'];
console.log(countGroups(related)); // 2



