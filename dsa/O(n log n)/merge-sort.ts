function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  console.log('merge-params', left, right);
  const merged = merge(left, right);
  console.log('merge-result', merged);

  return merged
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    console.log('left[i]', left[i], 'right[j]', right[j]);
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([8, 7, 6, 5, 4, 3, 2, 1]));
