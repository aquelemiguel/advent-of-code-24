import * as _ from "jsr:@es-toolkit/es-toolkit";

function parse(input: string): {
  rules: Map<string, Set<string>>;
  updates: string[][];
} {
  const [rawRules, rawUpdates] = input.split("\n\n");
  const rules = new Map<string, Set<string>>();

  rawRules
    .split("\n")
    .map((rule) => rule.split("|"))
    .forEach(([a, b]) => {
      rules.set(a, rules.get(a)?.add(b) || new Set([b]));
    });

  return {
    rules,
    updates: rawUpdates
      .trim()
      .split("\n")
      .map((update) => update.split(","))
  };
}

function sort(rules: Map<string, Set<string>>, update: string[]): string[] {
  return update.slice().sort((a, b) => {
    if (rules.get(a)?.has(b)) {
      return -1;
    }
    if (rules.get(b)?.has(a)) {
      return 1;
    }
    return 0;
  });
}

function print(
  rules: Map<string, Set<string>>,
  updates: string[][]
): { correct: string[][]; incorrect: string[][] } {
  return _.groupBy(updates, (update) => {
    const sorted = sort(rules, update);
    return _.isEqual(sorted, update) ? "correct" : "incorrect";
  });
}

function sumMiddlePages(updates: string[][]): number {
  return updates
    .map((update) => Number(update[Math.floor(update.length / 2)]))
    .reduce((acc, val) => acc + val, 0);
}

function p1(input: string): number {
  const { rules, updates } = parse(input);
  const { correct } = print(rules, updates);
  return sumMiddlePages(correct);
}

function p2(input: string): number {
  const { rules, updates } = parse(input);
  const { incorrect } = print(rules, updates);
  const sorted = incorrect.map((update) => sort(rules, update));
  return sumMiddlePages(sorted);
}

export { p1, p2 };
