function parse(input: string): string[][] {
  return [
    ...input
      .matchAll(/mul\((\d+),(\d+)\)|(do\(\))|(don't\(\))/g)
      .map(([cmd, a, b]) => [cmd.replace(/\(.*\)/, ""), a, b]),
  ];
}

function solve(input: string[][], cnds: boolean): number {
  let doing = true;
  return input.reduce((acc, [cmd, a, b]) => {
    if (doing && cmd === "mul") {
      return acc + Number(a) * Number(b);
    }
    doing = !cnds || cmd === "do";
    return acc;
  }, 0);
}

export function p1(input: string): number {
  return solve(parse(input), false);
}

export function p2(input: string): number {
  return solve(parse(input), true);
}
