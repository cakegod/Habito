import inputs, { InputType } from "./inputs";

export type HabitData = {
  name: string;
  icon: string;
  id: string;
  inputs: InputType[];
  avoid: boolean;
};

// TODO: add more habits
export const habitsData: HabitData[] = [
  {
    name: "Meditate",
    icon: "🧘‍♀️",
    id: "1",
    inputs: [inputs.frequency, inputs.time],
    avoid: false,
  },
  {
    name: "Exercise",
    icon: "🏋️‍♂️",
    id: "2",
    inputs: [inputs.frequency, inputs.time],
    avoid: false,
  },
  {
    name: "Read",
    icon: "📖",
    id: "3",
    inputs: [inputs.frequency, inputs.time],
    avoid: false,
  },
  {
    name: "Write",
    icon: "📝",
    id: "4",
    inputs: [inputs.frequency, inputs.time],
    avoid: false,
  },
  {
    name: "Drink Water",
    icon: "💧",
    id: "5",
    inputs: [inputs.liquid],
    avoid: false,
  },
  {
    name: "Sleep Well",
    icon: "🛌",
    id: "6",
    inputs: [inputs.frequency, inputs.time],
    avoid: false,
  },
  {
    name: "Code",
    icon: "👨‍💻",
    id: "7",
    inputs: [inputs.frequency, inputs.time],
    avoid: false,
  },
  {
    name: "Smoke",
    icon: "🚬",
    id: "8",
    inputs: [inputs.cigarettes, inputs.time],
    avoid: true,
  },
];
