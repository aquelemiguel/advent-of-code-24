import * as _ from "jsr:@es-toolkit/es-toolkit";

function parse(input: string): string[][] {
  const arr = input.split("\n").map((line) => ["", ...line.split(""), ""]);
  return [Array(arr.length).fill(""), ...arr, Array(arr.length).fill("")];
}

function search(
  soup: string[][],
  word: string,
  x: number,
  y: number,
  stage: number,
  [dx, dy]: number[],
  visited = [[x, y]]
): number[][] {
  if (visited.length === word.length) {
    return visited;
  }
  if (soup[x + dx][y + dy] === word[stage]) {
    return search(
      soup,
      word,
      x + dx,
      y + dy,
      stage + 1,
      [dx, dy],
      [...visited, [x + dx, y + dy]]
    );
  }
  return [];
}

export function p1(input: string): number {
  const pattern = [-1, 0, 1].flatMap((dx) =>
    [-1, 0, 1].map((dy) => [dx, dy]).filter(([dx, dy]) => dx !== 0 || dy !== 0)
  );
  const soup = parse(input);
  return soup.flatMap((row, i) =>
    row.flatMap((cell, j) =>
      cell === "X"
        ? pattern
            .map((dir) => search(soup, "XMAS", i, j, 1, dir))
            .filter((res) => res.length !== 0)
        : []
    )
  ).length;
}

export function p2(input: string): number {
  const pattern = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
  ];
  const soup = parse(input);
  const res = soup.flatMap((row, i) =>
    row.flatMap((cell, j) =>
      cell === "M"
        ? pattern
            .map((dir) => search(soup, "MAS", i, j, 1, dir))
            .filter((res) => res.length !== 0)
        : []
    )
  );
  return Object.values(_.countBy(res, (r) => r[1].join(" "))).filter(
    (v) => v === 2
  ).length;
}
