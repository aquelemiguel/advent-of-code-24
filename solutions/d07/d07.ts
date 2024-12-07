const opMap: any = {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
  "||": (a: number, b: number) => Number(`${a}${b}`),
};

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

function combine(result: number, oprs: number[], ops: string[]) {
  return permutate(ops, oprs.length - 1).filter(
    (perm) =>
      perm.reduce((acc, op, i) => opMap[op](acc, oprs[i + 1]), oprs[0]) ===
      result
  );
}

function calibrate(eqs: number[][], ops: string[]) {
  return eqs.reduce((acc, [res, ...oprs]) => {
    return combine(res, oprs, ops).length > 0 ? acc + res : acc;
  }, 0);
}

function p1(input: string) {
  const eqs = parse(input);
  return calibrate(eqs, ["+", "*"]);
}

function p2(input: string) {
  const eqs = parse(input);
  return calibrate(eqs, ["+", "*", "||"]);
}

export { p1, p2 };
