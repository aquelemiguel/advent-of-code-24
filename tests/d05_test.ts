import { assertEquals } from "jsr:@std/assert";
import { p1, p2 } from "../solutions/d05.ts";

const input = Deno.readTextFileSync("./input/d05.in");

Deno.test("🎄 P1", () => {
  assertEquals(p1(input), 143);
});

Deno.test("🎄 P2", () => {
  assertEquals(p2(input), 123);
});
