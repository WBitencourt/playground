function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap
      i++;
    }
  }

  [arr[i], arr[high]] = [arr[high], arr[i]]; // Place pivot in correct position
  return i;
}

// Exemplo de uso:
const arr = [3, 6, 8, 10, 1, 2, 1];
quickSort(arr);
console.log(arr);  // [1, 1, 2, 3, 6, 8, 10]