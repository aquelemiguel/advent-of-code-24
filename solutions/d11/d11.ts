import * as _ from "jsr:@es-toolkit/es-toolkit";

function parse(input: string) {
  return input.split(" ").map(Number);
}

function blink(stones: number[], n: number): number {
  while (n--) {
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] === 0) {
        stones[i] = 1;
      } else {
        const str = stones[i].toString();
        if (str.length % 2 === 0) {
          const [left, right] = _.chunk(str.split(""), str.length / 2).map(
            (n: string[]) => Number(n.join(""))
          );
          stones.splice(i++, 1, ...[left, right]);
        } else {
          stones[i] *= 2024;
        }
      }
    }
    console.log(n);
  }
  return stones.length;
}

export const p1 = (input: string) => blink(parse(input), 25);
export const p2 = (input: string) => blink(parse(input), 75);
