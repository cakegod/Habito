import type { Habit } from "@data/habits";
import {
  toggleModal,
  addHabit,
  deleteHabit,
  HabitStateData,
  habits,
} from "@stores/habits";
import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { TimeForm, FrequencyForm, LiquidForm } from "@components/modal/Forms";

// TODO: file is too big, reduce size by extracting parts of it elsewhere

export interface HabitData {
  time: {
    value: "" | number;
    unit: "minutes" | "hours";
  };
  frequency: {
    value: number;
  };
  liquid: {
    value: "" | number;
    unit: "ml" | "l";
  };
  cigarettes: {
    value: "" | number;
  };
}

const emptyData: HabitData = {
  time: {
    value: "",
    unit: "minutes",
  },
  frequency: {
    value: 3,
  },
  liquid: {
    value: "",
    unit: "ml",
  },
  cigarettes: {
    value: "",
  },
};

function ModalForm({ habit }: { habit: HabitStateData | Habit }) {
  const [data, setData] = useState<HabitStateData>({ ...emptyData, ...habit });
  const $habits = useStore(habits);

  // Check if the current item exists in the added habits
  const isPresent = !!$habits.find((habit) => habit.id === data.id);

  const forms = {
    time: (
      <TimeForm
        formData={{
          handler: handleForm,
          value: data.time.value,
          unit: data.time.unit,
        }}
        key={0}
      />
    ),
    frequency: (
      <FrequencyForm
        formData={{
          handler: handleForm,
          value: data.frequency.value,
        }}
        key={1}
      />
    ),
    liquid: (
      <LiquidForm
        formData={{
          handler: handleForm,
          value: data.liquid.value,
          unit: data.liquid.unit,
        }}
        key={2}
      />
    ),
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, habit: Habit) {
    e.preventDefault();

    // FIXME: Find a better way to handle this bug
    // Small timeout to prevent seeing the modal changing content
    setTimeout(() => addHabit({ ...habit, ...data }), 200);
    toggleModal();
  }

  function handleForm(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    type: keyof HabitData
  ) {
    const { value, name } = e.target;
    setData({ ...data, [type]: { ...data[type], [name]: value } });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, habit)}>
      {habit.forms.map((form) => forms[form])}
      <div className="modal-action">
        {isPresent ? (
          //FIXME: Remove as...
          <RemoveButton habit={habit as HabitStateData} />
        ) : (
          <CancelButton />
        )}
        {isPresent ? <UpdateButton /> : <AddButton />}
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

function RemoveButton({ habit }: { habit: HabitStateData }) {
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
