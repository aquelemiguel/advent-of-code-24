function parse(input: string) {
  return input.split("\n").map((line) => line.split(""));
}

function fence(garden: string[][]) {
  const visited: Set<string> = new Set();

  function countCorners([i, j]: number[], label: string) {
    let corners = 0;
    const same = (x: number, y: number) => garden[x]?.[y] === label;

    // prettier-ignore
    const exterior = [
      [[-1, 0], [0, -1]],
      [[-1, 0], [0, 1]],
      [[1, 0], [0, -1]],
      [[1, 0], [0, 1]],
    ];
    // prettier-ignore
    const interior = [
      [[0, -1], [-1, 0], [-1, -1]],
      [[0, 1], [-1, 0], [-1, 1]],
      [[0, -1], [1, 0], [1, -1]],
      [[0, 1], [1, 0], [1, 1]],
    ];

    exterior.forEach((neighbors) => {
      const [[ax, ay], [bx, by]] = neighbors;
      if (!same(i + ax, j + ay) && !same(i + bx, j + by)) {
        corners++;
      }
    });
    interior.forEach((neighbors) => {
      const [[ax, ay], [bx, by], [cx, cy]] = neighbors;
      if (
        same(i + ax, j + ay) &&
        same(i + bx, j + by) &&
        !same(i + cx, j + cy)
      ) {
        corners++;
      }
    });
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

    // prettier-ignore
    const neighbors = [[i - 1, j], [i, j - 1], [i + 1, j], [i, j + 1]];
    corners += countCorners([i, j], label);

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
  return fence(parse(input)).reduce(
    (acc, { perimeter, area }) => acc + perimeter * area,
    0
  );
}

export function p2(input: string) {
  return fence(parse(input)).reduce(
    (acc, { corners, area }) => acc + corners * area,
    0
  );
}
