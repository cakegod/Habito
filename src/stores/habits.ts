import { atom } from "nanostores";
import type { HabitData } from "@data/habits";

export const habits = atom<HabitData[]>([]);

// TODO: Refactor into two separated functions
export const addHabit = (habit: HabitData) => {
  const isPresent = habits.get().some((h) => h.id === habit.id);

  // Updating the object with the argument if is present in the array
  isPresent
    ? habits.set(habits.get().map((h) => (h.id === habit.id ? habit : h)))
    : habits.set([...habits.get(), habit]);
};

export const deleteHabit = (habit: HabitData) => {
  habits.set(habits.get().filter((h) => h.id !== habit.id));
};

export const currentHabit = atom<HabitData>({} as HabitData);

export const isModalOpen = atom(false);

export const toggleModal = (habit?: HabitData) => {
  isModalOpen.set(!isModalOpen.get());
  if (habit) {
    currentHabit.set(habit);
  }
  console.table(habits);
};
