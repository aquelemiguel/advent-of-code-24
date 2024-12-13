function parse(input: string) {
  return input.split("\n").map((line) => line.split(""));
}

function fence(garden: string[][]) {
  const visited: Set<string> = new Set();

  function countCounters([i, j]: number[], label: string) {
    let corners = 0;
    // exterior corners

    // top left
    if (garden[i - 1]?.[j] !== label && garden[i]?.[j - 1] !== label) {
      corners++;
    }
    // top right
    if (garden[i - 1]?.[j] !== label && garden[i]?.[j + 1] !== label) {
      corners++;
    }
    // bottom left
    if (garden[i + 1]?.[j] !== label && garden[i]?.[j - 1] !== label) {
      corners++;
    }
    // bottom right
    if (garden[i + 1]?.[j] !== label && garden[i]?.[j + 1] !== label) {
      corners++;
    }

    // interior corners

    // top left
    if (
      garden[i]?.[j - 1] === label &&
      garden[i - 1]?.[j] === label &&
      garden[i - 1]?.[j - 1] !== label
    ) {
      corners++;
    }
    // top right
    if (
      garden[i]?.[j + 1] === label &&
      garden[i - 1]?.[j] === label &&
      garden[i - 1]?.[j + 1] !== label
    ) {
      corners++;
    }
    // bottom left
    if (
      garden[i]?.[j - 1] === label &&
      garden[i + 1]?.[j] === label &&
      garden[i + 1]?.[j - 1] !== label
    ) {
      corners++;
    }
    // bottom right
    if (
      garden[i]?.[j + 1] === label &&
      garden[i + 1]?.[j] === label &&
      garden[i + 1]?.[j + 1] !== label
    ) {
      corners++;
    }
    return corners;
  }

  function flood(
    [i, j]: number[],
    label: string,
    perimeter = 0,
    corners = 0,
    area = 1
  ) {
    visited.add(`${i},${j}`);

    const neighbors = [
      [i - 1, j],
      [i, j - 1],
      [i + 1, j],
      [i, j + 1],
    ];

    corners += countCounters([i, j], label);

    neighbors.forEach(([x, y]) => {
      if (garden[x]?.[y] !== label) {
        perimeter++;
      } else {
        if (!visited.has(`${x},${y}`)) {
          const f = flood([x, y], label, perimeter, corners, area);
          perimeter = f.perimeter;
          area = f.area + 1;
          corners = f.corners;
        }
      }
    });

    return { perimeter, corners, area };
  }

  const regions = [];

  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[i].length; j++) {
      if (!visited.has(`${i},${j}`)) {
        regions.push(flood([i, j], garden[i][j]));
      }
    }
  }
  return regions;
}

export function p1(input: string) {
  const regions = fence(parse(input));
  return regions.reduce(
    (acc, { perimeter, area }) => acc + perimeter * area,
    0
  );
}

export function p2(input: string) {
  const regions = fence(parse(input));
  return regions.reduce((acc, { corners, area }) => acc + corners * area, 0);
}
