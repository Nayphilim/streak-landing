import { describe, expect, it } from "vitest";
import { doneCount, toggleWalk } from "./habit";

describe("toggleWalk", () => {
  it("checks the walk and bumps the streak to 13", () => {
    expect(toggleWalk({ walkDone: false, streak: 12 })).toEqual({ walkDone: true, streak: 13 });
  });
  it("unchecks and resets the streak to 12", () => {
    expect(toggleWalk({ walkDone: true, streak: 13 })).toEqual({ walkDone: false, streak: 12 });
  });
});

describe("doneCount", () => {
  it("is 3 when the walk is done, else 2", () => {
    expect(doneCount(true)).toBe(3);
    expect(doneCount(false)).toBe(2);
  });
});
