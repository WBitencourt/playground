// Big O notation: O(log n)

// 📖 Motivo: Como você explicou, a cada passo do algoritmo, o tamanho da área de busca é dividido pela metade. Isso é o comportamento clássico de crescimento logarítmico.
// Se n = 8, o máximo de divisões até reduzir a busca a um único elemento é log₂(8) = 3 — ou seja, 3 iterações.

// 🔍 Esse é o motivo pelo qual a busca binária é tão eficiente, desde que o array esteja ordenado.

function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  console.log('target', target);
  console.log(arr);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    console.log('left', left, 'right', right, 'mid', mid, 'arr[mid]', arr[mid], 'target', target);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1; // não encontrado
}

const arraySize100 = Array.from({ length: 100 }, (_, index) => index + 1);

console.log('result-index', binarySearch(arraySize100, 23));