'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'hourglassSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

// INPUT
// 1 1 1 0 0 0
// 0 1 0 0 0 0
// 1 1 1 0 0 0
// 0 0 2 4 4 0
// 0 0 0 2 0 0
// 0 0 1 2 4 0

// OUTPUT
//SUM hourglass

// THOUGHT
// I was writring and drawing in my note
// Big O(1), because n is always a 6x6

// LOGIC
// Go column by column until the limit hourglass, it's size column - 2 and row - 2; 
// while by while, save de values by coordenates ans sum at end.

function hourglassSum(arr) {
  let i = 0;
  let j = 0;
  let mostSumFound = -Infinity;
  
  const limitArray = arr.length - 3;
      
  while(j <= limitArray) {
    // The another is not create a const e put it ate sum inthe end of the while,
    // But this way, can i read better, and another SDE too.
    const topLeft = arr[i][j];
    const topCenter = arr[i][j+1];
    const topRight = arr[i][j+2];
    const mediumCenter = arr[i+1][j+1];
    const bottomLeft = arr[i+2][j];
    const bottomCenter = arr[i+2][j+1];
    const bottomRight = arr[i+2][j+2];
    
    const sum = topLeft + topCenter + topRight + mediumCenter + bottomLeft + bottomCenter + bottomRight;
    
    mostSumFound = sum > mostSumFound ? sum : mostSumFound;

    console.log('i', i)
    console.log('j', j)
    console.log('sum', sum)
    console.log('mostSumFound', mostSumFound)
    console.log('--------------------------------')
    
    if(j === limitArray && i < limitArray) {
      j = 0;
      i++;
      
      continue;
    }
    
    if(j === limitArray && i === limitArray) {
      return mostSumFound;
    }
      
    j++;
  }
  
  return mostSumFound;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result = hourglassSum(arr);

    console.log('result', result)

    ws.write(result + '\n');

    ws.end();
}

// const result = hourglassSum([
//   [1, 1, 1, 0, 0, 0],
//   [0, 1, 0, 0, 0, 0],
//   [1, 1, 1, 0, 0, 0],
//   [0, 0, 2, 4, 4, 0],
//   [0, 0, 0, 2, 0, 0],
//   [0, 0, 1, 2, 4, 0]
// ]);

const result = hourglassSum([
  [0, -4, -6, 0, -7, -6],
  [-1, -2, -6, -8, -3, -1],
  [-8, -4, -2, -8, -8, -6],
  [-3, -1, -2, -5, -7, -4],
  [-3, -5, -3, -6, -6, -6],
  [-3, -6, 0, -8, -6, -7]
]);



console.log('result', result);
