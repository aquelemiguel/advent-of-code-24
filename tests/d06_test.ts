import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { p1, p2 } from "../solutions/d06/d06.ts";
import { readInputFiles, Solution } from "./index.ts";

import s from "./solution.json" with { type: "json" };
const solution = s as Solution;

const { example, custom } = readInputFiles("d06");

describe(solution["d06"].title, () => {
  describe("🌲 Example", { ignore: !example }, () => {
    it("p1", () => assertEquals(p1(example), solution["d06"].example.p1));
    it("p2", () => assertEquals(p2(example), solution["d06"].example.p2));
  });
  describe("🎄 Input", { ignore: !custom }, () => {
    it("p1", () => assertEquals(p1(custom), solution["d06"].custom.p1));
    it("p2", () => assertEquals(p2(custom), solution["d06"].custom.p2));
  });
});
