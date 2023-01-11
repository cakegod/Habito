import { useStore } from "@nanostores/react";
import { habits } from "@stores/habits";
import { useState } from "react";
import { calculateHoursPerYear } from "src/util/calculate";

import AddedHabits from "./AddedHabits";
import HabitsList from "./home/HabitsList";

function App() {
  const [index, setIndex] = useState<0 | 1>(0);
  const $habits = useStore(habits);

  function handleNext() {
    setIndex(1);
  }

  function handleBack() {
    setIndex(0);
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
              <div className="mt-10 flex w-full justify-center">
                <button className="btn btn-success btn-lg" onClick={handleNext}>
                  Calculate my habits!
                  <span className="m-1 text-xl">🤯</span>
                </button>
              </div>
            </main>
          </div>
          <AddedHabits />
        </>
      ) : (
        <div className="w-full max-w-xl grow">
          <main className="flex w-full max-w-3xl flex-col items-center">
            {/* // TODO: Habit grid here*/}
            <section className="grid w-full grid-cols-2 gap-2 ">
              {$habits.map((habit) => {
                return (
                  <div className="card cursor-pointer gap-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-4">
                    <div className="flex items-center gap-2 font-bold uppercase">
                      <span>{habit.icon}</span>
                      <p className="text-sm text-primary-content">
                        {habit.name}
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-primary-content">
                      {`${Math.round(
                        calculateHoursPerYear(
                          habit.frequency.value,
                          Number(habit.time.value),
                          habit.time.type
                        )
                      )} hours`}
                    </p>
                  </div>
                );
              })}
            </section>
            <div className="mt-10 flex w-full justify-center">
              <button className="btn btn-info btn-lg" onClick={handleBack}>
                <span className="m-1 rotate-180">➤</span>
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
