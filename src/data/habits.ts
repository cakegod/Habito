export type Habit = {
  name: string;
  icon: string;
  id: string;
  forms: Forms[];
  avoid: boolean;
};

// TODO: add more habits
export const habitsData: Habit[] = [
  {
    name: "Meditate",
    icon: "🧘‍♀️",
    id: "1",
    forms: ["time", "frequency"],
    avoid: false,
  },
  {
    name: "Exercise",
    icon: "🏋️‍♂️",
    id: "2",
    forms: ["time", "frequency"],
    avoid: false,
  },
  {
    name: "Read",
    icon: "📖",
    id: "3",
    forms: ["time", "frequency"],
    avoid: false,
  },
  {
    name: "Write",
    icon: "📝",
    id: "4",
    forms: ["time", "frequency"],
    avoid: false,
  },
  { name: "Drink Water", icon: "💧", id: "5", forms: ["liquid"], avoid: false },
  {
    name: "Sleep Well",
    icon: "🛌",
    id: "6",
    forms: ["time", "frequency"],
    avoid: false,
  },
  {
    name: "Code",
    icon: "👨‍💻",
    id: "7",
    forms: ["time", "frequency"],
    avoid: false,
  },
  {
    name: "Smoke",
    icon: "🚬",
    id: "8",
    forms: ["cigarettes"],
    avoid: true,
  },
];

type Forms = "time" | "frequency" | "liquid" | "cigarettes";
