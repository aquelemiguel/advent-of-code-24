function parse(input: string) {
  return input.split("\n\n").map((m) => m.match(/\d+/g)!.map(Number));
}

function token([a1, a2, b1, b2, c1, c2]: number[]) {
  const d = a1 * b2 - a2 * b1;
  const [a, b] = [(c1 * b2 - c2 * b1) / d, (a1 * c2 - a2 * c1) / d];
  return Number.isInteger(a) && Number.isInteger(b) ? a * 3 + b : 0;
}

function solve(machines: number[][], correct: boolean) {
  return machines.reduce((acc, machine) => {
    [4, 5].forEach((i) => correct && (machine[i] += Math.pow(10, 13)));
    return acc + token(machine);
  }, 0);
}

export const p1 = (input: string): number => solve(parse(input), false);
export const p2 = (input: string): number => solve(parse(input), true);
