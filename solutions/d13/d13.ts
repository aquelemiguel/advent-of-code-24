function parse(input: string) {
  return input.split("\n\n").map((m) => m.match(/\d+/g)!.map(Number));
}

function tokens([a1, a2, b1, b2, c1, c2]: number[]) {
  const d = a1 * b2 - a2 * b1;
  const [a, b] = [(c1 * b2 - c2 * b1) / d, (a1 * c2 - a2 * c1) / d];
  return Number.isInteger(a) && Number.isInteger(b) ? a * 3 + b : 0;
}

function solve(machines: number[][], n: number) {
  return machines.reduce((acc, machine) => {
    [machine[4], machine[5]] = [machine[4] + n, machine[5] + n];
    return acc + tokens(machine);
  }, 0);
}

export const p1 = (input: string): number => solve(parse(input), 0);
export const p2 = (input: string): number => solve(parse(input), Math.pow(10, 13));
