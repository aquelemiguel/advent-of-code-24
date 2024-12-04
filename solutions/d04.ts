function parse(input: string): string[][] {
  return [
    [],
    ...input.split("\n").map((line) => ["", ...line.split(""), ""]),
    []
  ];
}

function search(
  soup: string[][],
  word: string,
  x: number,
  y: number,
  stage: number,
  [dx, dy]: number[]
): boolean {
  return (
    stage >= word.length ||
    (soup[x + dx][y + dy] === word[stage] &&
      search(soup, word, x + dx, y + dy, stage + 1, [dx, dy]))
  );
}

export function p1(input: string): number {
  const neighbours = [-1, 0, 1].flatMap((dx) =>
    [-1, 0, 1].map((dy) => [dx, dy]).filter(([dx, dy]) => dx !== 0 || dy !== 0)
  );
  const soup = parse(input);
  return soup
    .flatMap((row, i) =>
      row.flatMap((cell, j) =>
        cell === "X"
          ? neighbours.filter(([dx, dy]) =>
              search(soup, "XMAS", i, j, 1, [dx, dy])
            ).length
          : 0
      )
    )
    .reduce((acc, val) => acc + val, 0);
}

export function p2(input: string): number {
  const isDiagonal = (edges: [string?, string?]): boolean =>
    ["MS", "SM"].includes(edges.join(""));

  const soup = parse(input);
  return soup.flatMap((row, i) =>
    row.filter(
      (cell, j) =>
        cell === "A" &&
        isDiagonal([soup[i - 1][j - 1], soup[i + 1][j + 1]]) &&
        isDiagonal([soup[i - 1][j + 1], soup[i + 1][j - 1]])
    )
  ).length;
}
