const dirs = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
];

function parse(input: string): string[][] {
  return input.split("\n").map((line) => line.split(""));
}

function getLetter(grid: string[][], x: number, y: number): string | undefined {
  if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
    return grid[x][y];
  }
}

function search(
  grid: string[][],
  x: number,
  y: number,
  stage: number,
  dir: number
): boolean {
  if (stage >= "XMAS".length) {
    return true;
  }
  const [nx, ny] = [x + dirs[dir][0], y + dirs[dir][1]];
  if (getLetter(grid, nx, ny) === "XMAS"[stage]) {
    return search(grid, x + dirs[dir][0], y + dirs[dir][1], stage + 1, dir);
  }
  return false;
}

export function p1(input: string): number {
  const grid = parse(input);

  let x = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "XMAS"[0]) {
        for (let d = 0; d < dirs.length; d++) {
          x += search(grid, i, j, 1, d) ? 1 : 0;
        }
      }
    }
  }
  return x;
}

export function p2(input: string): number {
  const grid = parse(input);
  let x = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "A") {
        const a = [
          getLetter(grid, i - 1, j - 1),
          getLetter(grid, i + 1, j + 1)
        ].join("");
        const b = [
          getLetter(grid, i - 1, j + 1),
          getLetter(grid, i + 1, j - 1)
        ].join("");

        if ((a === "MS" || a === "SM") && (b === "MS" || b === "SM")) {
          x += 1;
        }
      }
    }
  }
  return x;
}
