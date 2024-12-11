import * as _ from "jsr:@es-toolkit/es-toolkit";

type Point = [number, number];

function parse(input: string) {
  return input.split("\n").map((line) => line.split("").map(Number));
}

function score(visited: Point[][]) {
  return _.sumBy(
    visited,
    (head: Point[]) => _.uniqBy(head, ([x, y]) => `${x},${y}`).length
  );
}

function rating(visited: Point[][]) {
  return _.sumBy(visited, (head: Point[]) => head.length);
}

function hike(map: number[][]) {
  const paths: Point[][] = [];

  function explore([i, j]: Point, h = 0, visited: Point[] = []) {
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
        explore([x, y], h + 1, visited);
      }
    }
    return visited;
  }

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        paths.push(explore([i, j]));
      }
    }
  }
  return paths;
}

export const p1 = (input: string): number => score(hike(parse(input)));
export const p2 = (input: string): number => rating(hike(parse(input)));
