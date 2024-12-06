function parse(input: string): [number[], number[]] {
  const a: number[] = [];
  const b: number[] = [];
  input
    .trim()
    .split("\n")
    .forEach((line) => {
      const [col1, col2] = line.split(/\s+/).map(Number);
      a.push(col1);
      b.push(col2);
    });
  return [a, b];
}

export function p1(input: string): number {
  const [a, b] = parse(input);
  b.sort();
  return a.sort().reduce((acc, curr, i) => acc + Math.abs(curr - b[i]), 0);
}

export function p2(input: string): number {
  const [a, b] = parse(input);
  const sim: Record<number, number> = {};
  return a.reduce((acc, v) => {
    sim[v] ??= v * b.reduce((acc, curr) => (curr === v ? acc + 1 : acc), 0);
    return acc + sim[v];
  }, 0);
}
