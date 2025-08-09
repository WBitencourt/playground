// Big O notation: O(n^2)

// 💯 Certíssimo!

// ✔️ Resposta correta: O(n²)
// 📖 Motivo: Bubble Sort tem dois loops aninhados que percorrem o array. No pior caso (quando o array está totalmente desordenado), ele realiza cerca de n * n comparações e trocas.

// Você explicou perfeitamente:

// Se o array tem 5 elementos, podem ocorrer até 5² = 25 operações.

// 🧠 E sim — se tivesse mais um for aninhado, o custo seria O(n³), o que é comum em algoritmos de força bruta com 3 níveis de decisão.

function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  console.log(arr);

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // troca os elementos
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      console.log(arr);
    }
  }
  return arr;
}

console.log(bubbleSort([5, 4,3, 2, 1]));


// [ 5, 4, 3, 2, 1 ]
// [ 4, 5, 3, 2, 1 ]
// [ 4, 3, 5, 2, 1 ]
// [ 4, 3, 2, 5, 1 ]
// [ 4, 3, 2, 1, 5 ]
// [ 3, 4, 2, 1, 5 ]
// [ 3, 2, 4, 1, 5 ]
// [ 3, 2, 1, 4, 5 ]
// [ 2, 3, 1, 4, 5 ]
// [ 2, 1, 3, 4, 5 ]
// [ 1, 2, 3, 4, 5 ]
// [ 1, 2, 3, 4, 5 ]





