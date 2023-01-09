import HabitCard from "@components/HabitCard";
import Modal from "@components/Modal";
import { habitsData } from "@data/habits";
import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";

function HabitsList() {
  const $habits = useStore(habits);
  const filteredHabits = habitsData.filter(
    (habitData) =>
      !Object.values($habits).find((habit) => habitData.id === habit.id)
  );

  return (
    <>
      {filteredHabits.map((habit) => (
        <HabitCard habit={habit} key={habit.id} />
      ))}
      <Modal />
    </>
  );
}

export default HabitsList;
