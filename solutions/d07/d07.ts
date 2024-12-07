import * as _ from "jsr:@es-toolkit/es-toolkit";

function parse(input: string) {
  return input
    .split("\n")
    .map((line) => line.replace(":", "").split(" ").map(Number));
}

function permutate(chars: string[], n: number): string[][] {
  const perms: string[][] = [];
  const generate = (curr: string[] = []) => {
    if (curr.length === n) {
      perms.push(curr);
      return;
    }
    for (const char of chars) {
      generate([...curr, char]);
    }
  };
  generate();
  return perms;
}

function combine(result: number, operands: number[], operators: string[]) {
  const perms = permutate(operators, operands.length - 1);
  return perms.filter(
    (perm) =>
      perm.reduce((acc, op, i) => {
        if (op === "+") {
          return acc + operands[i + 1];
        }
        if (op === "*") {
          return acc * operands[i + 1];
        }
        if (op === "||") {
          const bDigits = Math.floor(Math.log10(operands[i + 1])) + 1;
          return acc * Math.pow(10, bDigits) + operands[i + 1];
        }
        return acc;
      }, operands[0]) === result
  );
}

function calibrate(equations: number[][], operators: string[]) {
  let sum = 0;
  for (const [result, ...operands] of equations) {
    const perms = combine(result, operands, operators);
    if (perms.length > 0) {
      sum += result;
    }
  }
  return sum;
}

function p1(input: string) {
  const equations = parse(input);
  return calibrate(equations, ["+", "*"]);
}

function p2(input: string) {
  const equations = parse(input);
  return calibrate(equations, ["+", "*", "||"]);
}

export { p1, p2 };
