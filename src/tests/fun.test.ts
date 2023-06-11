import { createHabit } from "@data/habits";
import { inputs } from "@data/inputs";
import { describe, expect, test } from "vitest";

describe("habits", () => {
  test("test", () => {
    const habit = createHabit("Meditate", "🧘‍♀️", [
      inputs.time,
      inputs.frequency,
    ]);
    expect(habit.rawData()).toMatchSnapshot({
      id: expect.any(String),
    });

		expect(habit.inputNames).toMatchSnapshot()

		expect(habit.unit).toMatchSnapshot()

  });
});
