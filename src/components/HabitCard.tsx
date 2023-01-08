import { useStore } from "@nanostores/react";
import type { Habit } from "@data/habits";
import { habits } from "@stores/habits";

interface Props {
  habit: Habit;
}

export default function HabitCard({ habit }: Props) {
  const { name, icon } = habit;
  const $habits = useStore(habits);

  const handleHabit = (habit: Habit) => {
    habits.set([...$habits, habit]);
    console.log($habits);
  };

  return (
    <div
      className="card flex h-24 items-center justify-center bg-base-300 p-4 transition-colors hover:bg-base-200"
      onClick={() => handleHabit(habit)}
    >
      <span className="flex basis-full items-center text-lg">{icon}</span>
      <h2 className="flex basis-full items-start text-center">{name}</h2>
    </div>
  );
}
