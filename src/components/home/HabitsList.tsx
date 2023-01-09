import HabitCard from "@components/HabitCard";
import Modal from "@components/Modal";
import { habitsData } from "@data/habits";
import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";

function HabitsList() {
  const $habits = useStore(habits);
  const habitos = habitsData.filter(
    (habit) => !Object.values($habits).includes(habit)
  );

  console.log($habits, habitsData, habitos);

  return (
    <>
      {habitos.map((habit) => (
        <HabitCard habit={habit} key={habit.id} />
      ))}
      <Modal />
    </>
  );
}

export default HabitsList;
