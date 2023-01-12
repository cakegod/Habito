import { useStore } from "@nanostores/react";
import { habits, HabitStateData } from "@stores/habits";
import { composeTimePerYear } from "@util/calculate";

const gradients = [
  "bg-gradient-to-r from-sky-400 to-blue-500",
  "bg-gradient-to-r from-emerald-500 to-lime-600",
  "bg-gradient-to-r from-red-500 to-red-800",
  "bg-gradient-to-r from-orange-600 to-orange-500",
];

// TODO add logic for liquid and custom calculation (like drops of rain)
export default function HabitsGrid({ year }: { year: number }) {
  const $habits = useStore(habits);
  return (
    <section className="grid w-full grid-cols-[repeat(2,_minmax(150px,_200px))] gap-2">
      {$habits.map((habit, index) => (
        <HabitCard habit={habit} year={year} index={index} />
      ))}
    </section>
  );
}

function HabitCard({
  habit,
  year,
  index,
}: {
  habit: HabitStateData;
  year: number;
  index: number;
}) {
  return (
    <div className={`card cursor-pointer gap-1 p-4 ${gradients[index % 4]}`}>
      <Title name={habit.name} icon={habit.icon} />
      <HoursPerYear habit={habit} year={year} />
    </div>
  );
}

function Title({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="flex items-center gap-2 font-bold uppercase">
      <span>{icon}</span>
      <p className="text-sm text-primary-content">{name}</p>
    </div>
  );
}

function HoursPerYear({
  habit,
  year,
}: {
  habit: HabitStateData;
  year: number;
}) {
  const { frequency, time } = habit;
  return (
    <p className="text-3xl font-bold text-primary-content">
      {composeTimePerYear(frequency.value, Number(time.value), time.unit, year)}
    </p>
  );
}
