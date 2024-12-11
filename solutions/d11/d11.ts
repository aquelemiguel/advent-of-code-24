import * as _ from "jsr:@es-toolkit/es-toolkit";

function addStone(map: Map<number, number>, key: number, count: number) {
  map.set(key, (map.get(key) || 0) + count);
}

function parse(input: string) {
  const map = new Map<number, number>();
  input.split(" ").forEach((n) => addStone(map, Number(n), 1));
  return map;
}

function blink(stones: Map<number, number>, n: number) {
  while (n--) {
    const newStones = new Map<number, number>();

    for (const [stone, count] of stones) {
      const str = stone.toString();
      if (stone === 0) {
        addStone(newStones, 1, count);
      } else if (str.length % 2 === 0) {
        const [left, right] = _.chunk(str.split(""), str.length / 2).map(
          (n: string[]) => Number(n.join(""))
        );
        addStone(newStones, left, count);
        addStone(newStones, right, count);
      } else {
        addStone(newStones, stone * 2024, count);
      }
    }
    stones = newStones;
  }
  return _.sum([...stones.values()]);
}

export const p1 = (input: string) => blink(parse(input), 25);
export const p2 = (input: string) => blink(parse(input), 75);
