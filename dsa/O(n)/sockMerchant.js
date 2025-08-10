function sockMerchant(n, ar) {
  const map = new Map();
  let pairs = 0;
  
  for (let i=0; i < ar.length; i++) {
    const sock = ar[i];
    
    if(map.has(sock)) {
      map.set(sock, (map.get(sock) ?? 0) + 1)
    } else {
      map.set(sock, 1)
    }
      
  }
  
  for(let item of map.values()) {
    pairs += Math.floor(item / 2);
  }
  
  return pairs;
}

console.log(sockMerchant(9, [10, 20, 20, 10, 10, 30, 50, 10, 20]))