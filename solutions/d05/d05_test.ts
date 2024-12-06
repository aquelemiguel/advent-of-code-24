import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { p1, p2 } from "./d05.ts";
import { readInputFiles, Solution } from "../../tests/index.ts";

import s from "../../tests/solution.json" with { type: "json" };
const solution = s as Solution;

const { example, custom } = readInputFiles("d05");

describe(solution["d05"].title, () => {
  describe("🌲 Example", { ignore: !example }, () => {
    it("p1", () => assertEquals(p1(example), solution["d05"].example.p1));
    it("p2", () => assertEquals(p2(example), solution["d05"].example.p2));
  });
  describe("🎄 Input", { ignore: !custom }, () => {
    it("p1", () => assertEquals(p1(custom), solution["d05"].custom.p1));
    it("p2", () => assertEquals(p2(custom), solution["d05"].custom.p2));
  });
});
