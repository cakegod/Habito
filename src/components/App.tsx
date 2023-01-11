import { useState } from "react";
import AddedHabits from "./AddedHabits";
import HabitsList from "./home/HabitsList";
import Button from '@components/Button'

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
      <div className="w-full max-w-xl grow">
        <main className="flex w-full max-w-3xl flex-col items-center">
          <section className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            <HabitsList />
          </section>
          <div className="mt-10 flex w-full justify-center">
            {index === 0 ? (
              <Button intent="success" size="large">
								Calculate my habits!
							</Button>
            ) : (
              <button className="btn btn-info btn-lg" onClick={handleBack}>
                <span className="m-1 rotate-180">➤</span>
                Back to habit selection
              </button>
            )}
          </div>
        </main>
      </div>
      <AddedHabits />
    </>
  );
}

export default App;
