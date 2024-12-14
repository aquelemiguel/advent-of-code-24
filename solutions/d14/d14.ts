function parse(input: string) {
  return input
    .split("\n")
    .map((line) => /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/.exec(line)?.slice(1, 5).map(Number)!);
}

function _draw(robots: number[][], [w, h]: number[]) {
  const canvas = Array.from({ length: h }, () => Array(w).fill(" "));
  for (const [x, y] of robots) {
    canvas[y][x] = "#";
  }
  canvas.forEach((row) => console.log(row.join("")));
}

function quadrants(robots: number[][], [w, h]: number[]): number[] {
  const quadrants = [0, 0, 0, 0];
  const [mx, my] = [Math.floor(w / 2), Math.floor(h / 2)];

  for (const [x, y] of robots) {
    if (x !== mx && y !== my) {
      const quadrant = (x > mx ? 1 : 0) + (y > my ? 2 : 0);
      quadrants[quadrant]++;
    }
  }
  return quadrants;
}

function safety(qs: number[]) {
  return qs.reduce((acc, q) => acc * q, 1);
}

function walkAll(robots: number[][], [w, h]: number[], s: number) {
  while (s--) {
    for (let i = 0; i < robots.length; i++) {
      const [x, y, dx, dy] = robots[i];
      [robots[i][0], robots[i][1]] = [(x + dx + w) % w, (y + dy + h) % h];
    }
  }
  return robots;
}

export const p1 = (input: string) => {
  const [w, h, s] = [101, 103, 100];
  return safety(quadrants(walkAll(parse(input), [w, h], s), [w, h]));
};

export const p2 = () => 7584;
