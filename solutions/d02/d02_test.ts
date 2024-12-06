import { assertEquals } from "jsr:@std/assert";
import { p1, p2 } from "./d02.ts";

const input = Deno.readTextFileSync("./solutions/d02/d02.in");

Deno.test("🎄 P1", () => {
  assertEquals(p1(input), 2);
});

Deno.test("🎄 P2", () => {
  assertEquals(p2(input), 4);
});
