import { useState } from "react";
import type { Habit } from "../data/habits";

interface Props {
  habit: Habit;
}

export default function HabitCard({ habit }: Props) {
  const { name, icon } = habit;
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleHabit = (habit: Habit) => {
    setHabits([...habits, habit]);
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
