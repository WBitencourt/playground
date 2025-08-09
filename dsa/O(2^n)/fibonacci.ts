
function fibonacci(n: number) {
  const array = [0, 1];

  for(let i = 1; i < n; i++) {
    const sum = array[i] + array[i-1]
    array.push(sum);
  }

  return array
}

console.log(fibonacci(8));

// [0, 1, 1, 2, 3, 5, 8, 13, 21]

function fibonacci2(n: number): number {
  if (n <= 1) return n;

  console.log('n', n)

  const result = fibonacci2(n - 1) + fibonacci2(n - 2);

  return result;
}

console.log(fibonacci2(5));
