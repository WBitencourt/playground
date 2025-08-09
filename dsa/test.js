const map = new Map();
const result = map.set("banana", "amarela").set("maçã", "vermelha");

console.log(result); // Map(1) { 'banana' => 'amarela' }
console.log(result === map); // true (mesmo objeto)