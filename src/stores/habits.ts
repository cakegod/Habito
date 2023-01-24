import { atom } from "nanostores";
import type { Habit } from "@data/habits";

export const habits = atom<Habit[]>([]);

// TODO: Refactor into two separated functions
export const addHabit = (habit: Habit) => {
  const isPresent = habits.get().some((h) => h.id === habit.id);

  // Updating the object with the argument if is present in the array
  isPresent
    ? habits.set(habits.get().map((h) => (h.id === habit.id ? habit : h)))
    : habits.set([...habits.get(), habit]);
};

export const deleteHabit = (habit: Habit) => {
  habits.set(habits.get().filter((h) => h.id !== habit.id));
};

export const currentHabit = atom<Habit>({} as Habit);

export const isModalOpen = atom(false);

export const toggleModal = (habit?: Habit) => {
  isModalOpen.set(!isModalOpen.get());
  if (habit) {
    currentHabit.set(habit);
  }
};
