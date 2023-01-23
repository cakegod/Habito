import { inputs } from "./inputs";
import { nanoid } from "nanoid";

export type HabitData = Readonly<{
  name: string;
  icon: string;
  id: string;
  inputs: ReadonlyArray<(typeof inputs)[keyof typeof inputs]>;
  avoid: boolean;
}>;

export type HabitsNames = (typeof habitsData)[number]["name"];

function createHabit<Name extends string>(
  name: Name,
  icon: HabitData["icon"],
  inputs: HabitData["inputs"],
  avoid: HabitData["avoid"] = false
): Omit<HabitData, "name"> & { name: Name } {
  return { name, icon, inputs, avoid, id: nanoid() };
}

// TODO: add more habits
export const habitsData = [
  createHabit("Meditate", "🧘‍♀️", [inputs.time, inputs.frequency]),
  createHabit("Exercise", "🏋️‍♂️", [inputs.time, inputs.frequency]),
  createHabit("Read", "📖", [inputs.time, inputs.frequency]),
  createHabit("Write", "📝", [inputs.time, inputs.frequency]),
  createHabit("Drink Water", "💧", [inputs.liquid]),
  createHabit("Code", "👨‍💻", [inputs.time, inputs.frequency]),
  createHabit("Smoke Addiction", "🚬", [inputs.cigarettes], true),
  createHabit("Smartphone Addiction", "📱", [inputs.smartphone], true),
  createHabit("Learn Language", "🌎", [inputs.time, inputs.frequency]),
].sort((a) => (a.avoid ? 1 : -1)) satisfies Readonly<HabitData[]>;
