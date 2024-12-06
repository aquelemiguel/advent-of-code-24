import { assertEquals } from "jsr:@std/assert";
import { p1, p2 } from "./d01.ts";

const example = Deno.readTextFileSync("./solutions/d01/d01.example");
const input = Deno.readTextFileSync("./solutions/d01/d01.input");

Deno.test("🎄 P1 Example", () => {
  assertEquals(p1(example), 11);
});

Deno.test("🎄 P1 Input", () => {
  assertEquals(p1(input), 1879048);
});

Deno.test("🎄 P2 Example", () => {
  assertEquals(p2(example), 31);
});

Deno.test("🎄 P2 Input", () => {
  assertEquals(p2(input), 21024792);
});
