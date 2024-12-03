import { assertEquals } from "jsr:@std/assert";
import { p1, p2 } from "../solutions/d03.ts";

const input = Deno.readTextFileSync("./input/d03.in");

Deno.test("🎄 P1", () => {
  assertEquals(p1(input), 161);
});

Deno.test("🎄 P2", () => {
  assertEquals(p2(input), 48);
});
