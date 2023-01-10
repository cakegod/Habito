export type Habit = {
  name: string;
  icon: string;
  id: string;
  forms: Forms[];
};

export const habitsData: Habit[] = [
  { name: "Meditate", icon: "🧘‍♀️", id: "1", forms: ["time", "frequency"] },
  { name: "Exercise", icon: "🏋️‍♂️", id: "2", forms: ["time", "frequency"] },
  { name: "Read", icon: "📖", id: "3", forms: ["time", "frequency"] },
  { name: "Write", icon: "📝", id: "4", forms: ["time", "frequency"] },
  { name: "Drink Water", icon: "💧", id: "5", forms: ["liquid"] },
  { name: "Sleep Well", icon: "🛌", id: "6", forms: ["time", "frequency"] },
  { name: "Code", icon: "👨‍💻", id: "7", forms: ["time", "frequency"] },
];

type Forms = "time" | "frequency" | "liquid";
