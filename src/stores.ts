import type { Habit } from "@data/habits";
import { writable } from "svelte/store";

function createHabitsStore() {
  const { subscribe, update } = writable<Habit[]>([]);

  return {
    subscribe,
    add: (habit: Habit) =>
      update((habits) => {
        const isPresent = habits.some((h) => h.id === habit.id);

        // Updating the object with the argument if is present in the array
        return isPresent
          ? habits.map((h) => (h.id === habit.id ? habit : h))
          : [...habits, habit];
      }),
    delete: (habit: Habit) =>
      update((habits) => habits.filter((h) => h.id !== habit.id)),
  };
}

function createModalStore() {
  const { subscribe, update } = writable(false);

  return { subscribe, toggleOpen: () => update((isModalOpen) => !isModalOpen) };
}

function createCurrentHabitStore() {
  const { subscribe, update } = writable<Habit>({} as Habit);

  return { subscribe, set: (habit: Habit) => update((_) => habit) };
}

// EXPORT STORES
export const habits = createHabitsStore();
export const modal = createModalStore();
export const currentHabit = createCurrentHabitStore();
