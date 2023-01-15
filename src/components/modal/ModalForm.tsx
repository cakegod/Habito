import type { HabitData } from "@data/habits";
import { toggleModal, addHabit, deleteHabit, habits } from "@stores/habits";
import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { Inputs } from "./Inputs";
import type { Input } from "@data/inputs";

function ModalForm({ habit }: { habit: HabitData }) {
  const [state, setState] = useState<HabitData>(habit);
  const $habits = useStore(habits);

  // Check if the current item exists in the added habits
  const isPresent = $habits.some((habit) => habit.id === state.id);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, habit: HabitData) {
    e.preventDefault();

    // FIXME: Find a better way to handle this bug
    // Small timeout to prevent seeing the modal changing content
    setTimeout(() => addHabit({ ...habit, ...state }), 200);
    toggleModal();
  }

  function handleForm(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    category: Input["inputCategory"]
  ) {
    const { name, value } = e.target;
    setState((habit) => ({
      ...habit,
      inputs: habit.inputs.map((input) => {
        console.log(name, input.inputCategory);

        return input.inputCategory === category
          ? { ...input, [name]: value }
          : input;
      }),
    }));
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, habit)}>
      {state.inputs.map((input) => (
        <Inputs key={input.name} handler={handleForm} input={input} />
      ))}
      <div className="modal-action">
        {isPresent ? (
          <>
            <RemoveButton habit={habit} />
            <UpdateButton />
          </>
        ) : (
          <>
            <CancelButton />
            <AddButton />
          </>
        )}
      </div>
    </form>
  );
}

function AddButton() {
  return (
    <button className="btn-primary btn grow" type="submit">
      Add Habit
    </button>
  );
}

function UpdateButton() {
  return (
    <button className="btn-success btn grow" type="submit">
      Update
    </button>
  );
}

function RemoveButton({ habit }: { habit: HabitData }) {
  return (
    <button
      type="button"
      className="btn-ghost btn grow text-error"
      onClick={() => {
        toggleModal(), deleteHabit(habit);
      }}
    >
      Remove
    </button>
  );
}

function CancelButton() {
  return (
    <button
      type="button"
      className="btn-ghost btn grow"
      onClick={() => toggleModal()}
    >
      Cancel
    </button>
  );
}

export default ModalForm;
