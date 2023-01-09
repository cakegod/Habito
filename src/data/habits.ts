export type Habit = {
  name: string;
  icon: string;
  id: string;
};

export const habitsData: Habit[] = [
  { name: "Meditate", icon: "🙏", id: "1" },
  { name: "Exercise", icon: "🏋️‍♂️", id: "2" },
  { name: "Read", icon: "📖", id: "3" },
  { name: "Write", icon: "📝", id: "4" },
  { name: "Drink Water", icon: "💧", id: "5" },
  { name: "Sleep Well", icon: "🛌", id: "6" },
];
