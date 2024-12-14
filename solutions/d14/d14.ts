function parse(input: string) {
  return input
    .split("\n")
    .map((line) => /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/.exec(line)?.slice(1, 5).map(Number)!);
}

function quadrants(robots: number[][], [w, h]: number[]) {
  const quadrants = [0, 0, 0, 0];

  for (const [x, y] of robots) {
    if (x === Math.floor(w / 2) || y === Math.floor(h / 2)) {
      continue;
    }

    if (x > w / 2) {
      if (y > h / 2) {
        quadrants[3]++;
      } else {
        quadrants[1]++;
      }
    } else {
      if (y > h / 2) {
        quadrants[2]++;
      } else {
        quadrants[0]++;
      }
    }
  }
  return quadrants;
}

function walk([x, y]: number[], [dx, dy]: number[], [w, h]: number[]): number[] {
  [x, y] = [x + dx, y + dy];
  if (x < 0) {
    x = x + w;
  }
  if (x >= w) {
    x = x - w;
  }
  if (y < 0) {
    y = y + h;
  }
  if (y >= h) {
    y = y - h;
  }
  return [x, y];
}

function safety(qs: number[]) {
  return qs.reduce((acc, q) => acc * q, 1);
}

function draw(robots: number[][], [w, h]: number[]) {}

export const p1 = (input: string): number => {
  const robots = parse(input);
  const [w, h] = [11, 7];
  let seconds = 100;

  while (seconds--) {
    for (let i = 0; i < robots.length; i++) {
      const [x, y, dx, dy] = robots[i];
      [robots[i][0], robots[i][1]] = walk([x, y], [dx, dy], [w, h]);
    }
  }

  const qs = quadrants(robots, [w, h]);
  return safety(qs);
};

export const p2 = (input: string): number => {
  const robots = [];
  const [w, h] = [11, 7];

  for (const [x, y, dx, dy] of parse(input)) {
    robots.push(walk([x, y], [dx, dy], [w, h]));
  }

  return -1;
};

// export const p2 = (input: string): number => parse(input);
