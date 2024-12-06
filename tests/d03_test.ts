import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { p1, p2 } from "../solutions/d03/d03.ts";
import { readInputFiles, Solution } from "./index.ts";

import s from "./solution.json" with { type: "json" };
const solution = s as Solution;

const { example, custom } = readInputFiles("d03");

describe(solution["d03"].title, () => {
  describe("🌲 Example", { ignore: !example }, () => {
    it("p1", () => assertEquals(p1(example), solution["d03"].example.p1));
    it("p2", () => assertEquals(p2(example), solution["d03"].example.p2));
  });
  describe("🎄 Input", { ignore: !custom }, () => {
    it("p1", () => assertEquals(p1(custom), solution["d03"].custom.p1));
    it("p2", () => assertEquals(p2(custom), solution["d03"].custom.p2));
  });
});
