import assert from "node:assert/strict";
import test from "node:test";
import formatCompactNumber from "./formatCompactNumber.js";

test("formats thousands and millions with compact suffixes", () => {
  assert.equal(formatCompactNumber(1000), "1k");
  assert.equal(formatCompactNumber(1500), "1.5k");
  assert.equal(formatCompactNumber(1_000_000), "1m");
  assert.equal(formatCompactNumber(999_999), "1m");
});

test("preserves small, negative, and missing values", () => {
  assert.equal(formatCompactNumber(950), "950");
  assert.equal(formatCompactNumber(-1500), "-1.5k");
  assert.equal(formatCompactNumber(null), "0");
});
