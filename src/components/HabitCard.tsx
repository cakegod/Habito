import type { Habit } from "@data/habits";
import { toggleModal } from "@stores/habits";

interface Props {
  habit: Habit;
}

function HabitCard({ habit }: Props) {
  return (
    <>
      <button
        className="btn h-24 flex-col "
        onClick={() => toggleModal(habit)}
      >
        <span className="flex grow items-center text-lg">{habit.icon}</span>
        <h2 className="flex grow items-start text-center">{habit.name}</h2>
      </button>
    </>
  );
}
export default HabitCard;
