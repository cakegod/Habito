import type { Habit } from "@data/habits";
import { toggleModal, addHabit, deleteHabit, habits } from "@stores/habits";
import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { Inputs } from "./Inputs";
import type { InputCategory } from "@data/inputs";

function ModalForm({ habit }: { habit: Habit }) {
  const [state, setState] = useState<Habit>(habit);
  const $habits = useStore(habits);

  // Check if the current item exists in the added habits
  const isPresent = $habits.some((habit) => habit.id === state.id);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, habit: Habit) {
    e.preventDefault();

    // FIXME: Find a better way to handle this bug
    // Small timeout to prevent seeing the modal changing content
    setTimeout(() => addHabit({ ...habit, ...state }), 200);
    toggleModal();
  }

  function handleForm(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    category: InputCategory
  ) {
    const { name, value } = e.target;
    setState((habit) => ({
      ...habit,
      inputs: habit.inputs.map((input) =>
        input.inputCategory === category ? { ...input, [name]: value } : input
      ),
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
    <button
      className="btn-primary btn grow"
      type="submit"
      data-cy={"btn-submit"}
    >
      Add Habit
    </button>
  );
}

function UpdateButton() {
  return (
    <button
      className="btn-success btn grow"
      type="submit"
      data-cy={"btn-update"}
    >
      Update
    </button>
  );
}

function RemoveButton({ habit }: { habit: Habit }) {
  return (
    <button
      type="button"
      className="btn-ghost btn grow text-error"
      onClick={() => {
        toggleModal(), deleteHabit(habit);
      }}
      data-cy={"remove-btn"}
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
      data-cy={"cancel-btn"}
    >
      Cancel
    </button>
  );
}

export default ModalForm;
