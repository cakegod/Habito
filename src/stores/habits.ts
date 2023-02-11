import type { Habit } from "@data/habits";
import { writable } from "svelte/store";

export const habits = writable<Habit[]>([]);

// TODO: Refactor into two separated functions
export const addHabit = (habit: Habit) => {
  habits.update((habits) => {
    const isPresent = habits.some((h) => h.id === habit.id);

    // Updating the object with the argument if is present in the array
    return isPresent
      ? habits.map((h) => (h.id === habit.id ? habit : h))
      : [...habits, habit];
  });
};

export const deleteHabit = (habit: Habit) => {
  habits.update((habits) => habits.filter((h) => h.id !== habit.id));
};

export const currentHabit = writable<Habit>({} as Habit);

export const isModalOpen = writable(false);

export const toggleModal = (habit?: Habit) => {
  isModalOpen.update((isModalOpen) => !isModalOpen);
  if (habit) {
    currentHabit.update((_) => habit);
  }
};
