import { assertEquals } from "jsr:@std/assert";
import { p1, p2 } from "./d06.ts";

const input = Deno.readTextFileSync("./solutions/d06/d06.in");

Deno.test("🎄 P1", () => {
  assertEquals(p1(input), 41);
});

Deno.test("🎄 P2", () => {
  assertEquals(p2(input), 6);
});
