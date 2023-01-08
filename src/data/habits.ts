import crypto from "crypto";

export type Habit = {
  name: string;
  icon: string;
  id: string;
};

export const habits: Habit[] = [
  { name: "Meditate", icon: "🙏", id: crypto.randomUUID() },
  { name: "Exercise", icon: "🏋️‍♂️", id: crypto.randomUUID() },
  { name: "Read", icon: "📖", id: crypto.randomUUID() },
  { name: "Write", icon: "📝", id: crypto.randomUUID() },
  { name: "Drink Water", icon: "💧", id: crypto.randomUUID() },
  { name: "Sleep Well", icon: "🛌", id: crypto.randomUUID() },
];
