import { Calculator, Formatter } from "@util/calculate";
import { beforeEach, describe, expect, test } from "vitest";

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

describe("calculate", () => {
  test("daily minutes", () => {
    expect(calculator.dailyMinutes).toBe(42);
  });

  test("weekly minutes", () => {
    expect(calculator.weeklyMinutes).toBe(294);
  });

  test("yearly minutes", () => {
    expect(calculator.yearlyMinutes).toBe(15330);
  });

  test("yearly hours", () => {
    expect(calculator.yearlyHours).toBe(256);

    calculator.years = 2;
    expect(calculator.yearlyHours).toBe(511);

    calculator.years = 20;
    expect(calculator.yearlyHours).toBe(5110);
  });
});

describe("format", () => {
  test("hours per week", () => {
    expect(formatter.hoursPerWeek).toBe("5 hours / week");
  });

  test("hours per year", () => {
    expect(formatter.hoursPerYear).toBe("256 hours");
  });

  test("liquid per week", () => {
    expect(formatter.liquidPerWeek).toBe("294mL");
  });

  test("liquid per year", () => {
    expect(formatter.liquidPerYear).toBe("15.3L");
  });
});
