import type { Habit } from "@data/habits";
import type { InputNames, Input, Inputs } from "@data/inputs";

export function transformToObj(inputs: Habit["inputs"]) {
  return inputs.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {} as { [key in InputNames]: key extends keyof Inputs ? Inputs[key] : Inputs[Exclude<keyof Inputs, InputNames>] });
}
