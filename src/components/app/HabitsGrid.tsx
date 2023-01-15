import type { HabitData } from "@data/habits";
import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";
import { formatLiquidPerYear, formatTimePerYear } from "@util/calculate";

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
        <HabitCard key={habit.name} habit={habit} year={year} index={index} />
      ))}
    </section>
  );
}

function HabitCard({
  habit,
  year,
  index,
}: {
  habit: HabitData;
  year: number;
  index: number;
}) {
  const time = habit.inputs.find((input) => input.name === "time");
  const frequency = habit.inputs.find((input) => input.name === "frequency");
  const liquid = habit.inputs.find((input) => input.name === "liquid");
  const generic = habit.inputs.find((input) => input.name === "generic");
  return (
    <div className={`card cursor-pointer gap-1 p-4 ${gradients[index % 4]}`}>
      <Title name={habit.name} icon={habit.icon} />
      {
        <p className="text-3xl font-bold text-primary-content">
          {time &&
            frequency &&
            formatTimePerYear(
              Number(frequency.selectedOption),
              Number(time.value),
              time.selectedOption,
              year
            )}
          {liquid &&
            formatLiquidPerYear(
              Number(liquid.value),
              liquid.selectedOption,
              year
            )}
          {/* {habit.inputs.some((input) => input.name === "time") &&
            formatTimePerYear(
              Number(habit.frequency.value),
              Number(habit.time.value),
              habit.time.unit,
              year
            )}
          {habit.inputs.some((input) => input.name === "liquid") &&
            formatLiquidPerYear(
              Number(habit.liquid.value),
              habit.liquid.unit,
              year
            )}
          {habit.inputs.some((input) => input.name === "generic") &&
            formatGenericPerYear(Number(habit.generic.value), year)} */}
        </p>
      }
      {/* {habit.inputs.find((input) => input.category === "time") && (
        <HoursPerYear habit={habit} year={year} />
      )}
      {habit.inputs.find((input) => input.category === "liquid") && (
        <LiquidPerYear habit={habit} year={year} />
      )} */}
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

// function HoursPerYear({
//   habit,
//   year,
// }: {
//   habit: CombinedHabitState;
//   year: number;
// }) {
//   const { frequency, time } = habit;

//   return (
//     <p className="text-3xl font-bold text-primary-content">
//       {formatTimePerYear(frequency.value, Number(time.value), time.unit, year)}
//     </p>
//   );
// }

// function LiquidPerYear({ habit, year }) {
//   return (
//     <p className="text-3xl font-bold text-primary-content">
//       {formatLiquidPerYear(habit.liquid.value, habit.liquid.unit, year)}
//     </p>
//   );
// }
