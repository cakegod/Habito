import { useState } from "react";
import AddedHabits from "./AddedHabits";
import HabitsList from "./home/HabitsList";

function App() {
  const [index, setIndex] = useState<0 | 1>(0);

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
        <>
          <div className="w-full max-w-xl grow">
            <main className="flex w-full max-w-3xl flex-col items-center">
              // TODO: Habit grid here
              <div className="mt-10 flex w-full justify-center">
                <button className="btn btn-info btn-lg" onClick={handleBack}>
                  <span className="m-1 rotate-180">➤</span>
                  Back to habit selection
                </button>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default App;
