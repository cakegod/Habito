import HabitCard from "@components/HabitCard";
import Modal from "@components/Modal";
import { habitsData } from "@data/habits";
import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";

function HabitsList() {
  const $habits = useStore(habits);
  const filteredHabits = habitsData.filter(
    (habitData) => !$habits.find((habit) => habitData.id === habit.id)
  );

  return (
    <section className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredHabits.map((habit) => (
        <HabitCard habit={habit} key={habit.id} />
      ))}
      <Modal />
    </section>
  );
}

export default HabitsList;
