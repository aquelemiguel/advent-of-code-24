import { assertEquals } from "jsr:@std/assert";
import { p1, p2 } from "./d04.ts";

const input = Deno.readTextFileSync("./solutions/d04/d04.in");

Deno.test("🎄 P1", () => {
  assertEquals(p1(input), 18);
});

Deno.test("🎄 P2", () => {
  assertEquals(p2(input), 9);
});
