import { assertEquals } from "jsr:@std/assert";
import { describe, it, beforeAll } from "jsr:@std/testing/bdd";

import s from "./solutions.json" with { type: "json" };
const solution = s as Solution;
type Solution = {
  [key: string]: {
    title: string;
    example: {
      p1: number;
      p2: number;
    };
    custom: {
      p1: number;
      p2: number;
    };
  };
};

function readInputFiles(day: string) {
  let example = "";
  let custom = "";
  try {
    example = Deno.readTextFileSync(`./solutions/${day}/${day}.example`);
  } catch {
    console.warn(
      `Warning: File ${day}.example does not exist. Tests are skipped.`
    );
  }
  try {
    custom = Deno.readTextFileSync(`./solutions/${day}/${day}.in`);
  } catch {
    console.warn(`Warning: File ${day}.in does not exist. Tests are skipped.`);
  }
  return { example, custom };
}

function runSuite(day: string) {
  describe(solution[day].title, () => {
    let p1: (input: string) => number;
    let p2: (input: string) => number;
    const { example, custom } = readInputFiles(day);
    
    beforeAll(async () => {
      ({ p1, p2 } = await import(`../solutions/${day}/${day}.ts`));
    });
  
    describe("🌲 Example", { ignore: !example }, () => {
      it("p1", () => assertEquals(p1(example), solution[day].example.p1));
      it("p2", () => assertEquals(p2(example), solution[day].example.p2));
    });
    describe("🎄 Input", { ignore: !custom }, () => {
      it("p1", () => assertEquals(p1(custom), solution[day].custom.p1));
      it("p2", () => assertEquals(p2(custom), solution[day].custom.p2));
    });
  });

}

export { runSuite };
