function parse(input: string) {
  return input.split("\n\n").map((m) => m.match(/\d+/g)!.map(Number));
}

function token([a1, a2, b1, b2, c1, c2]: number[]): number[] {
  const d = a1 * b2 - a2 * b1;
  const x = (c1 * b2 - c2 * b1) / d;
  const y = (a1 * c2 - a2 * c1) / d;
  return [x, y];
}

function solve(machines: number[][]): number {
  console.log("machines", machines);
  let [a, b] = [0, 0];
  machines.forEach((machine) => {
    const [x, y] = token(machine);
    console.log("x", x, "y", y);
    if (Number.isInteger(x) && Number.isInteger(y)) {
      [a, b] = [a + x, b + y];
      console.log(x, y);
    }
  });
  return a * 3 + b;
}

function correct(machines: number[][]) {
  machines.forEach((m) => {
    m[4] = m[4] + Math.pow(10, 12);
    m[5] = m[5] + Math.pow(10, 12);
  });
  return machines;
}

export const p1 = (input: string): number => solve(parse(input));
export const p2 = (input: string): number => solve(correct(parse(input)));
