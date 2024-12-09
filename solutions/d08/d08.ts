import * as _ from "jsr:@es-toolkit/es-toolkit";

type Point = [number, number];

function parse(input: string) {
  const antennas: Map<string, Point[]> = new Map();
  input.split("\n").forEach((row, i) =>
    row.split("").forEach((freq, j) => {
      if (freq !== ".") {
        antennas.set(freq, (antennas.get(freq) || []).concat([[i, j]]));
      }
    })
  );
  return { antennas, n: input.split("\n").length };
}

function permutate(points: Point[]) {
  return points.flatMap((_, i, arr) =>
    arr.slice(i + 1).map((point) => [points[i], point])
  );
}

function isInBounds([x, y]: Point, n: number) {
  return !(x < 0 || x >= n || y < 0 || y >= n);
}

function getAntinodes(
  [[x1, y1], [x2, y2]]: Point[],
  n: number,
  resonance: boolean
) {
  const antinodes = [];
  const [dx, dy] = [x2 - x1, y2 - y1];
  if (resonance) {
    antinodes.push([x1, y1], [x2, y2]);
  }
  function traverse([x, y]: Point, [dx, dy]: Point) {
    while (isInBounds([x, y], n)) {
      antinodes.push([x, y]);
      if (!resonance) break;
      [x, y] = [x + dx, y + dy];
    }
  }
  traverse([x1 - dx, y1 - dy], [-dx, -dy]);
  traverse([x2 + dx, y2 + dy], [dx, dy]);
  return antinodes;
}

function solve(input: string, resonance: boolean) {
  const { antennas, n } = parse(input);
  const antinodes = antennas
    .values()
    .flatMap((points) =>
      permutate(points).flatMap((perm) => getAntinodes(perm, n, resonance))
    );
  return _.uniqBy([...antinodes], ([x, y]) => `${x},${y}`).length;
}

export const p1 = (input: string) => solve(input, false);
export const p2 = (input: string) => solve(input, true);
