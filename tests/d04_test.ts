import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { p1, p2 } from "../solutions/d04/d04.ts";
import { readInputFiles, Solution } from "./index.ts";

import s from "./solution.json" with { type: "json" };
const solution = s as Solution;

const { example, custom } = readInputFiles("d04");

describe(solution["d04"].title, () => {
  describe("🌲 Example", { ignore: !example }, () => {
    it("p1", () => assertEquals(p1(example), solution["d04"].example.p1));
    it("p2", () => assertEquals(p2(example), solution["d04"].example.p2));
  });
  describe("🎄 Input", { ignore: !custom }, () => {
    it("p1", () => assertEquals(p1(custom), solution["d04"].custom.p1));
    it("p2", () => assertEquals(p2(custom), solution["d04"].custom.p2));
  });
});
