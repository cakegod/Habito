import { Calculator, Formatter } from "@util/calculate";
import { beforeEach, describe, expect, test } from "vitest";

describe("calculate", () => {
  const calculator = new Calculator({
    frequency: 5,
    dailyValue: 60,
    unit: "generic",
  });
  test("daily minutes", () => {
    expect(calculator.dailyMinutes).toBe(42);
  });

  test("yearly minutes ", () => {
    expect(calculator.yearlyMinutes).toBe(15330);
  });

  test("yearly hours", () => {
    expect(calculator.yearlyHours).toBe(256);
  });
});

describe("format", () => {
  let calculator: Calculator;
  let formatter: Formatter;

  beforeEach(() => {
    calculator = new Calculator({
      frequency: 5,
      dailyValue: 60,
      unit: "generic",
    });
    formatter = new Formatter(calculator);
  });

  test("hours per week", () => {
    expect(formatter.hoursPerWeek).toBe("5 hours / week");
  });

  test("hours per year", () => {
    expect(formatter.hoursPerYear).toBe("256 hours");
  });
});
