import * as _ from "jsr:@es-toolkit/es-toolkit";

function parse(input: string) {
  let guard = [-1, -1];
  const grid = input
    .trim()
    .split("\n")
    .map((line, i) =>
      line.split("").map((c, j) => {
        if (c === "^") guard = [i, j];
        return c;
      })
    );
  return { grid, guard };
}

function isOutOfBounds(grid: string[][], [x, y]: number[]) {
  return x < 0 || x >= grid.length || y < 0 || y >= grid[0].length;
}

function walk(grid: string[][], guard: number[]) {
  let [dx, dy] = [-1, 0];
  let [gx, gy] = guard;
  const visited = [[gx, gy]];
  const rotations = new Set<string>();

  while (!isOutOfBounds(grid, [gx + dx, gy + dy])) {
    if (grid[gx + dx][gy + dy] === "#") {
      const state = `${gx},${gy},${dx},${dy}`;
      if (rotations.has(state)) {
        return { loop: true, visited };
      }
      rotations.add(state);
      [dx, dy] = [dy, -dx];
    } else {
      [gx, gy] = [gx + dx, gy + dy];
      visited.push([gx, gy]);
    }
  }
  const dedup = _.uniqBy(visited, ([x, y]) => `${x},${y}`);
  return { loop: false, visited: dedup };
}

function p1(input: string) {
  const { grid, guard } = parse(input);
  return walk(grid, guard).visited.length;
}

function p2(input: string) {
  const { grid, guard } = parse(input);
  const { visited } = walk(grid, guard);

  return visited.reduce((acc: number, [x, y]) => {
    const newGrid = _.cloneDeep(grid);
    newGrid[x][y] = "#";
    return acc + (walk(newGrid, guard).loop ? 1 : 0);
  }, 0);
}

export { p1, p2 };
