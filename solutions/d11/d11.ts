import * as _ from "jsr:@es-toolkit/es-toolkit";

class StoneList<T> {
  map = new Map<T, number>();
  constructor(stones: T[] = []) {
    stones.forEach((stone) => this.add(stone, 1));
  }
  add(stone: T, count: number): void {
    this.map.set(stone, (this.map.get(stone) || 0) + count);
  }
  count(): number {
    return _.sum([...this.map.values()]);
  }
}

function parse(input: string): StoneList<number> {
  return new StoneList(input.split(" ").map((n) => Number(n)));
}

function cutString(str: string): number[] {
  return _.chunk(str.split(""), str.length / 2).map((n: string[]) =>
    Number(n.join(""))
  );
}

function blink(stones: StoneList<number>, n: number): number {
  while (n--) {
    const newStones = new StoneList<number>();

    for (const [stone, count] of stones.map) {
      const str = stone.toString();
      if (stone === 0) {
        newStones.add(1, count);
      } else if (str.length % 2 === 0) {
        const [left, right] = cutString(str);
        newStones.add(left, count);
        newStones.add(right, count);
      } else {
        newStones.add(stone * 2024, count);
      }
    }
    stones = newStones;
  }
  return stones.count();
}

export const p1 = (input: string) => blink(parse(input), 25);
export const p2 = (input: string) => blink(parse(input), 75);
