import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";
import React, { useState } from "react";
import { calculateHoursPerYear } from "src/util/calculate";

import AddedHabits from "./AddedHabits";
import HabitsList from "./home/HabitsList";

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

function App() {
  const [index, setIndex] = useState<0 | 1>(0);
  const [year, setYear] = useState<number>(1);
  const $habits = useStore(habits);

  function handleNext() {
    setIndex(1);
  }

  function handleBack() {
    setIndex(0);
  }

  function handleYearChange(e: React.ChangeEvent<HTMLInputElement>) {
    setYear(Number(e.target.value));
  }

  return (
    <>
      {index === 0 ? (
        <>
          <div className="w-full max-w-xl grow">
            <main className="flex w-full max-w-3xl flex-col items-center">
              <section className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                <HabitsList />
              </section>
              {$habits.length !== 0 ? (
                <div className="mt-10 flex w-full justify-center">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={handleNext}
                  >
                    Calculate my habits!
                    <span className="m-1 text-xl">😎</span>
                  </button>
                </div>
              ) : (
                <h2 className="mt-10 text-xl bold">
                  Add an habit from the list to start!
                </h2>
              )}
            </main>
          </div>
          <AddedHabits />
        </>
      ) : (
        <div className="w-full max-w-xl grow">
          <main className="flex w-full max-w-3xl flex-col items-center">
            <h2 className="mb-4 flex items-center self-start text-lg">
              In
              <input
                type="number"
                onChange={handleYearChange}
                min={1}
                max={99}
                value={year}
                className="input mx-2 w-20 bg-neutral text-center font-bold"
              />
              year{year > 1 && "s"}, you will achieve:
            </h2>
            <section className="grid w-full grid-cols-2 gap-2 ">
              {$habits.map((habit, i) => {
                return (
                  <div
                    className={`card cursor-pointer gap-1 p-4 ${pickGradient(
                      i + 1
                    )} ${i % 2 === 0 && i !== 0 ? "col-span-2" : ""}`}
                  >
                    <div className="flex items-center gap-2 font-bold uppercase">
                      <span>{habit.icon}</span>
                      <p className="text-sm text-primary-content">
                        {habit.name}
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-primary-content">
                      {`${
                        Math.round(
                          calculateHoursPerYear(
                            habit.frequency.value,
                            Number(habit.time.value),
                            habit.time.type
                          )
                        ) * year
                      } hours`}
                    </p>
                  </div>
                );
              })}
            </section>
            <div className="mt-10 flex w-full items-center justify-center">
              <button
                className="btn btn-info btn-lg text-center"
                onClick={handleBack}
              >
                <span className="mx-1 rotate-180">➤</span>
                Back to habit selection
              </button>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
