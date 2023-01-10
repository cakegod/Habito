import { atom, map } from "nanostores";
import type { Habit } from "@data/habits";
import type { HabitData } from "@components/home/ModalForm";

export type HabitStateData = Habit & HabitData;
export const habits = atom<HabitStateData[]>([]);

export const addHabit = (habit: HabitStateData) => {
  habits.set([...habits.get(), habit]);

  console.log(habits.get());
};

export const deleteHabit = (habit: HabitStateData) => {
  habits.set(habits.get().filter((h) => h.id !== habit.id));

  console.log(habits);
};

// Bad temporary fix :/
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
