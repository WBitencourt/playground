
function sumArray(arr: number[]): number {
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  
  return total;
}

console.log(sumArray([1, 2, 3, 4, 5]));