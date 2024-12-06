function parse(input: string): number[][] {
  return input.split("\n").map((line) => line.split(" ").map(Number));
}

function safe(arr: number[]): boolean {
  if (arr[0] < arr[arr.length - 1]) {
    arr.reverse();
  }
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] - arr[i + 1] < 1 || arr[i] - arr[i + 1] > 3) {
      return false;
    }
  }
  return true;
}

export function p1(input: string): number {
  return parse(input).reduce((acc, curr) => (safe(curr) ? acc + 1 : acc), 0);
}

export function p2(input: string): number {
  return parse(input).reduce((acc, curr) => {
    for (let i = 0; i < curr.length; i++) {
      if (safe(curr.slice(0, i).concat(curr.slice(i + 1)))) {
        return acc + 1;
      }
    }
    return acc;
  }, 0);
}
