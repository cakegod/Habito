import Button from "@components/Button";
import type { Habit } from "@data/habits";
import {
  toggleModal,
  addHabit,
  deleteHabit,
  HabitStateData,
  habits,
} from "@stores/habits";
import React, { useState } from "react";
import FrequencyForm from "@components/home/forms/FrequencyForm";
import LiquidForm from "@components/home/forms/LiquidForm";
import TimeForm from "@components/home/forms/TimeForm";
import { useStore } from "@nanostores/react";

export interface HabitData {
  time: {
    value: "" | number;
    type: "minutes" | "hours";
  };
  frequency: {
    value: number;
  };
  liquid: {
    value: "" | number;
    type: "ml" | "l";
  };
}

const emptyData: HabitData = {
  time: {
    value: "",
    type: "minutes",
  },
  frequency: {
    value: 3,
  },
  liquid: {
    value: "",
    type: "ml",
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
        handler={handleForm}
        value={data.time.value}
        type={data.time.type}
        key={0}
      />
    ),
    frequency: (
      <FrequencyForm
        handler={handleForm}
        value={data.frequency.value}
        key={1}
      />
    ),
    liquid: (
      <LiquidForm
        handler={handleForm}
        value={data.liquid.value}
        type={data.liquid.type}
        key={2}
      />
    ),
  };

  // Frequency.value * 52 * time.value
  function handleSubmit(e: React.FormEvent<HTMLFormElement>, habit: Habit) {
    e.preventDefault();
    addHabit({ ...habit, ...data });
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
          <Button
            size="grow"
            intent="error"
            handler={() => {
              toggleModal(), deleteHabit(habit);
            }}
          >
            Remove
          </Button>
        ) : (
          <Button size="grow" intent="ghost" handler={() => toggleModal()}>
            Cancel
          </Button>
        )}
        {isPresent ? (
          <Button size="grow" intent="success" type="submit">
            Update
          </Button>
        ) : (
          <Button size="grow" intent="primary" type="submit">
            Add Habit
          </Button>
        )}
      </div>
    </form>
  );
}

export default ModalForm;
