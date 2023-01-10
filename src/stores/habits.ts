import { atom } from "nanostores";
import type { Habit } from "@data/habits";
import type { HabitData } from "@components/home/ModalForm";

export type HabitStateData = Habit & HabitData;
export const habits = atom<HabitStateData[]>([]);

// TODO: Refactor into two separated functions
export const addHabit = (habit: HabitStateData) => {
  const isPresent = !!habits.get().find((h) => h.id === habit.id);

  isPresent
    ? // Updating the object with the argument if is present in the array
      habits.set(habits.get().map((h) => (h.id === habit.id ? habit : h)))
    : habits.set([...habits.get(), habit]);

  console.log(habits.get());
};

export const deleteHabit = (habit: HabitStateData) => {
  habits.set(habits.get().filter((h) => h.id !== habit.id));

  console.log(habits);
};

export const currentHabit = atom<HabitStateData>({
  name: "",
  icon: "",
  id: "",
  forms: [],
  time: {
    value: 0,
    type: "minutes",
  },
  frequency: {
    value: 0,
  },
  liquid: {
    value: 0,
    type: "ml",
  },
});

export const isModalOpen = atom(false);

export const toggleModal = (habit?: HabitStateData) => {
  isModalOpen.set(!isModalOpen.get());
  if (habit) {
    currentHabit.set(habit);
  }
  console.table(habits);
};
