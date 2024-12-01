const input = Deno.readTextFileSync("./input/d1.in");

const a: number[] = [];
const b: number[] = [];

input.split("\n").forEach((line) => {
  const [col1, col2] = line.split(/\s+/).map(Number);
  a.push(col1);
  b.push(col2);
});

export function p1(a: number[], b: number[]): number {
  b.sort();
  return a.sort().reduce((acc, curr, i) => acc + Math.abs(curr - b[i]), 0);
}

function p2(a: number[], b: number[]): number {
  const occ: Record<number, number> = {};

  return a.reduce((acc, val) => {
    occ[val] ??= b.reduce((acc, curr) => (curr === val ? acc + 1 : acc), 0);
    return acc + val * occ[val];
  }, 0);
}

console.log("🎄 p1:", p1(a, b));
console.log("🎄 p2:", p2(a, b));
