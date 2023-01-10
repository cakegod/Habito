import { atom, map } from "nanostores";
import type { Habit } from "@data/habits";
import type { HabitData } from "@components/home/ModalForm";

export const habits = map<Record<string, Habit & HabitData>>({});

export const addHabit = (habit: Habit & HabitData) => {
  habits.setKey(habit.id, habit);

  console.log(habits.get());
};

// Bad temporary fix :/
export const currentHabit = atom<Habit>({} as Habit);

export const isModalOpen = atom(false);
export const toggleModal = (habit?: Habit) => {
  isModalOpen.set(!isModalOpen.get());
  if (habit) {
    currentHabit.set(habit);
  }
};
