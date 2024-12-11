import * as _ from "jsr:@es-toolkit/es-toolkit";

function parse(input: string) {
  return input
    .split("\n")
    .map((line) => line.split("").map((n) => parseInt(n)));
}

function _hike(
  map: number[][],
  [i, j]: [number, number],
  h = 0,
  visited: number[][] = []
) {
  if (map[i][j] === 9) {
    visited.push([i, j]);
    return visited;
  }
  const neighbors = [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1]
  ];
  for (const [x, y] of neighbors) {
    if (map[x]?.[y] === h + 1) {
      _hike(map, [x, y], h + 1, visited);
    }
  }
  return visited;
}

function hike(map: number[][]) {
  const paths: number[][][] = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        paths.push(_hike(map, [i, j]));
      }
    }
  }
  return paths;
}

function score(visited: number[][][]) {
  return _.sumBy(
    visited,
    (head: number[][]) => _.uniqBy(head, ([x, y]) => `${x},${y}`).length
  );
}

function rating(visited: number[][][]) {
  return _.sumBy(visited, (head: number[][]) => head.length);
}

export const p1 = (input: string): number => score(hike(parse(input)));
export const p2 = (input: string): number => rating(hike(parse(input)));
