import { useStore } from "@nanostores/react";
import { habits, HabitStateData } from "@stores/habits";
import { calculateHoursPerYear } from "@util/calculate";

const gradients = [
  "bg-gradient-to-r from-sky-400 to-blue-500",
  "bg-gradient-to-r from-emerald-500 to-lime-600",
  "bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500",
];

function pickGradient(index: number) {
  if (index % 3 === 0) {
    return `${gradients[2]} col-span-2`;
  } else if (index % 2 === 0) {
    return gradients[1];
  } else return gradients[0];
}

// TODO add logic for liquid and custom calculation (like drops of rain)
export default function HabitsGrid({ year }: { year: number }) {
  const $habits = useStore(habits);
  return (
    <section className="grid w-full grid-cols-2 gap-2 ">
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
    <div className={`card cursor-pointer gap-1 p-4 ${pickGradient(index + 1)}`}>
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
    <p className="text-2xl font-bold text-primary-content">
      {`${
        Math.round(
          calculateHoursPerYear(frequency.value, Number(time.value), time.type)
        ) * year
      } hours`}
    </p>
  );
}
