import Modal from "@components/modal/Modal";
import { habitsData, type Habit } from "@data/habits";
import { useStore } from "@nanostores/react";
import { habits, toggleModal } from "@stores/habits";

export default function HabitsList() {
  const $habits = useStore(habits);
  const filteredHabits = habitsData.filter(
    (habitData) => !$habits.find((habit) => habitData.id === habit.id)
  );

  return (
    <section className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredHabits.map((habit) => (
        <Card habit={habit} key={habit.id} />
      ))}
      <Modal />
    </section>
  );
}

function Card({ habit }: { habit: Habit }) {
  return (
    <button
      className={`btn h-24 flex-col border-none ${
        habit.avoid ? "btn-error" : "bg-base-200"
      } normal-case`}
      onClick={() => toggleModal(habit)}
    >
      <span className="flex grow items-center text-lg">{habit.icon}</span>
      <h2 className="flex grow items-start text-center">{habit.name}</h2>
    </button>
  );
}
