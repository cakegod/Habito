import { createHabit } from "@data/habits";
import { inputs } from "@data/inputs";
import { funComparaisons } from "@util/funComparaison";
import { describe, expect, test } from "vitest";

describe("habits", () => {
  test("test", () => {
    const habit = createHabit("Meditate", "🧘‍♀️", [
      inputs.time(),
      inputs.frequency(),
    ]);
    expect(habit.rawData()).toMatchSnapshot({
      id: expect.any(String),
    });
    expect(habit.inputNames).toMatchSnapshot();
    expect(habit.unit).toMatchSnapshot();
  });
});

describe("fun comparaisons", () => {
  test("snapshots", () => {
    const args = [102, 798, 7890, 5555, 6666, 9999, 454554].map((value) => ({
      yearlyValue: value,
      years: 2,
    }));

    args.forEach((data) => {
      Object.values(funComparaisons).forEach((func) => {
        expect(func(data).value).toMatchSnapshot();
      });
    });
  });
});
