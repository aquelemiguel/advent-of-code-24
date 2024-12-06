import * as _ from "jsr:@es-toolkit/es-toolkit";

function parse(input: string) {
  const [rawRules, rawUpdates] = input.split("\n\n");
  const rules = new Map<string, Set<string>>();
  const updates = rawUpdates.split("\n").map((line) => line.split(","));

  rawRules.split("\n").forEach((rule) => {
    const [a, b] = rule.split("|");
    rules.set(a, rules.get(a)?.add(b) || new Set([b]));
  });
  return { rules, updates };
}

function sort(rules: Map<string, Set<string>>, update: string[]) {
  return [...update].sort((a, b) => (rules.get(a)?.has(b) ? -1 : 1));
}

function classify(rules: Map<string, Set<string>>, updates: string[][]) {
  return _.groupBy(updates, (update) =>
    _.isEqual(sort(rules, update), update) ? "right" : "wrong"
  );
}

function sumMiddle(updates: string[][]) {
  return _.sum(updates.map((update) => Number(update[update.length >> 1])));
}

function p1(input: string) {
  const { rules, updates } = parse(input);
  const { right } = classify(rules, updates);
  return sumMiddle(right);
}

function p2(input: string) {
  const { rules, updates } = parse(input);
  const { wrong } = classify(rules, updates);
  const sorted = wrong.map((update) => sort(rules, update));
  return sumMiddle(sorted);
}

export { p1, p2 };
