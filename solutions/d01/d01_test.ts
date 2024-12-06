import { assertEquals } from "jsr:@std/assert";
import { p1, p2 } from "./d01.ts";

const example = Deno.readTextFileSync("./solutions/d01/d01.in");

Deno.test("🎄 P1", () => {
  assertEquals(p1(example), 11);
});

Deno.test("🎄 P2", () => {
  assertEquals(p2(example), 31);
});
