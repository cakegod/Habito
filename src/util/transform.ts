import type { HabitData } from "@data/habits";
import type { InputNames, Input } from "@data/inputs";

export function transformToObj(inputs: HabitData["inputs"]) {
  return inputs.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {} as { [key in InputNames]: Input });
}