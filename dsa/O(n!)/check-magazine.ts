function checkMagazine(magazine: string[], note: string[]): void {
  const magazineMap = new Map();
  
  for (const word of magazine) {
    magazineMap.set(word, (magazineMap.get(word) || 0) + 1);
  }
  
  for(let i = 0; i < note.length; i++){
    const word = note[i];
    const countWord = magazineMap.get(word);
    
    if(!countWord) {
      console.log("No")
      return;
    }
      
    if(countWord === 1) {
      magazineMap.delete(word);
    } else {
      magazineMap.set(word, countWord - 1);
    }
  }
  
  console.log("Yes")
}

const magazine = ["give", "me", "one", "grand", "today", "night"];
const note = ["give", "one", "grand", "today"];

checkMagazine(magazine, note);