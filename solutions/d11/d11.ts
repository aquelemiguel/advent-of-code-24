import * as _ from "jsr:@es-toolkit/es-toolkit";

function addToMap<T>(map: Map<T, number>, key: T, count: number) {
  map.set(key, (map.get(key) || 0) + count);
}

function countMapValues<T>(map: Map<T, number>) {
  return _.sum([...map.values()]);
}

function parse(input: string) {
  const map = new Map<number, number>();
  input.split(" ").forEach((n) => addToMap(map, Number(n), 1));
  return map;
}

function blink(stones: Map<number, number>, n: number) {
  while (n--) {
    const newStones = new Map<number, number>();

    for (const [stone, count] of stones) {
      const str = stone.toString();
      if (stone === 0) {
        addToMap(newStones, 1, count);
      } else if (str.length % 2 === 0) {
        const [left, right] = _.chunk(str.split(""), str.length / 2).map(
          (n: string[]) => Number(n.join(""))
        );
        addToMap(newStones, left, count);
        addToMap(newStones, right, count);
      } else {
        addToMap(newStones, stone * 2024, count);
      }
    }
    stones = newStones;
  }
  return countMapValues(stones);
}

export const p1 = (input: string) => blink(parse(input), 25);
export const p2 = (input: string) => blink(parse(input), 75);
