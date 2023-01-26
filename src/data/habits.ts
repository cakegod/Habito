import { inputs as input } from "./inputs";
import { nanoid } from "nanoid";

export type HabitsNames = (typeof habitsData)[number]["name"];

function createHabit<Name extends string>(
  name: Name,
  icon: string,
  inputs: ReadonlyArray<(typeof input)[keyof typeof input]>,
  avoid: boolean = false
) {
  return { name, icon, inputs, avoid, id: nanoid() };
}

export type HabitData = ReturnType<typeof createHabit>;
export type Habit = (typeof habitsData)[number];

// TODO: add more habits
export const habitsData = [
  createHabit("Meditate", "🧘‍♀️", [input.time, input.frequency]),
  createHabit("Exercise", "🏋️‍♂️", [input.time, input.frequency]),
  createHabit("Read", "📖", [input.time, input.frequency]),
  createHabit("Write", "📝", [input.time, input.frequency]),
  createHabit("Drink Water", "💧", [input.liquid]),
  createHabit("Code", "👨‍💻", [input.time, input.frequency]),
  createHabit("Smoke", "🚬", [input.cigarettes], true),
  createHabit("Smartphone", "📱", [input.smartphone], true),
  createHabit("Learn Language", "🌎", [input.time, input.frequency]),
].sort((a) => (a.avoid ? 1 : -1)) satisfies Readonly<HabitData[]>;
