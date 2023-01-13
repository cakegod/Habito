import { atom } from "nanostores";
import type { CombinedHabitState } from "@components/modal/ModalForm";
import type { HabitData } from "@data/habits";

export const habits = atom<CombinedHabitState[]>([]);

// TODO: Refactor into two separated functions
export const addHabit = (habit: CombinedHabitState) => {
  const isPresent = !!habits.get().find((h) => h.id === habit.id);

  isPresent
    ? // Updating the object with the argument if is present in the array
      habits.set(habits.get().map((h) => (h.id === habit.id ? habit : h)))
    : habits.set([...habits.get(), habit]);

  console.log(habits.get());
};

export const deleteHabit = (habit: CombinedHabitState) => {
  habits.set(habits.get().filter((h) => h.id !== habit.id));

  console.log(habits);
};

export const currentHabit = atom<CombinedHabitState | HabitData>(
  {} as HabitData
);

export const isModalOpen = atom(false);

export const toggleModal = (habit?: CombinedHabitState | HabitData) => {
  isModalOpen.set(!isModalOpen.get());
  if (habit) {
    currentHabit.set(habit);
  }
  console.table(habits);
};
