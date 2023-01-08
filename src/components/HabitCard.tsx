import { useStore } from "@nanostores/react";
import type { Habit } from "@data/habits";
import { addHabit, habits } from "@stores/habits";

interface Props {
  habit: Habit;
}

function HabitCard({ habit }: Props) {
  const $habits = useStore(habits);

  return (
    <div
      className="card flex h-24 items-center justify-center bg-base-300 p-4 transition-colors hover:bg-base-200"
      onClick={() => addHabit(habit)}
    >
      <span className="flex basis-full items-center text-lg">
        {habit?.icon}
      </span>
      <h2 className="flex basis-full items-start text-center">{habit?.name}</h2>
    </div>
  );
}
export default HabitCard;
