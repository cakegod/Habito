import { inputs } from "./inputs";
import { nanoid } from 'nanoid'

export type HabitData = Readonly<{
  name: string;
  icon: string;
  id: string;
  inputs: ReadonlyArray<(typeof inputs)[keyof typeof inputs]>;
  avoid: boolean;
}>;

export type HabitsNames = (typeof habitsData)[number]["name"];

// TODO: add more habits
export const habitsData = [
  {
    name: "Meditate",
    icon: "🧘‍♀️",
    id: nanoid(),
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Exercise",
    icon: "🏋️‍♂️",
    id: nanoid(),
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Read",
    icon: "📖",
    id: nanoid(),
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Write",
    icon: "📝",
    id: nanoid(),
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Drink Water",
    icon: "💧",
    id: nanoid(),
    inputs: [inputs.liquid],
    avoid: false,
  },
  {
    name: "Code",
    icon: "👨‍💻",
    id: nanoid(),
    inputs: [inputs.time, inputs.frequency],
    avoid: false,
  },
  {
    name: "Smoke Addiction",
    icon: "🚬",
    id: nanoid(),
    inputs: [inputs.cigarettes],
    avoid: true,
  },
  {
    name: "Smartphone Addiction",
    icon: "📱",
    id: nanoid(),
    inputs: [inputs.smartphone],
    avoid: true,
  },
] as const satisfies Readonly<HabitData[]>;
