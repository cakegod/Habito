import { atom, map } from "nanostores";
import type { Habit } from "@data/habits";

export const habits = map<Record<string, Habit>>({});

export const addHabit = (habit: Habit) => {
  habits.setKey(habit.id, habit);

  console.log(habits.get());
};