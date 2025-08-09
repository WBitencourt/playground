function main() {
  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const m = parseInt(firstMultipleInput[0], 10);

  const n = parseInt(firstMultipleInput[1], 10);

  const magazine = readLine().replace(/\s+$/g, '').split(' ');

  const note = readLine().replace(/\s+$/g, '').split(' ');

  checkMagazine(magazine, note);
}