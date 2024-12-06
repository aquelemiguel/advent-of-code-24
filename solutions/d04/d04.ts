import * as _ from "jsr:@es-toolkit/es-toolkit";

function parse(input: string): string[][] {
  const arr = input.split("\n").map((line) => ["", ...line.split(""), ""]);
  return [Array(arr.length).fill(""), ...arr, Array(arr.length).fill("")];
}

function _search(
  soup: string[][],
  word: string,
  [x, y]: number[],
  [dx, dy]: number[],
  vis = [[x, y]]
): number[][] {
  if (word.length === 1) {
    return vis;
  }
  if (soup[x + dx][y + dy] !== word[1]) {
    return [];
  }
  return _search(
    soup,
    word.slice(1),
    [x + dx, y + dy],
    [dx, dy],
    [...vis, [x + dx, y + dy]]
  );
}

function search(
  soup: string[][],
  word: string,
  pattern: number[][]
): number[][][] {
  return soup.flatMap((row, i) =>
    row.flatMap((cell, j) =>
      cell === word[0]
        ? pattern
            .map((dir) => _search(soup, word, [i, j], dir))
            .filter((res) => res.length > 0)
        : []
    )
  );
}

export function p1(input: string): number {
  const pattern = [-1, 0, 1].flatMap((dx) =>
    [-1, 0, 1].map((dy) => [dx, dy]).filter(([dx, dy]) => dx !== 0 || dy !== 0)
  );
  return search(parse(input), "XMAS", pattern).length;
}

export function p2(input: string): number {
  const pattern = [-1, 1].flatMap((dx) => [-1, 1].map((dy) => [dx, dy]));
  const words = search(parse(input), "MAS", pattern);

  const centers = _.countBy(words, ([_, center]) => center.join(" "));
  return Object.values(centers).filter((count) => count === 2).length;
}
