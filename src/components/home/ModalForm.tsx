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
        handler={handleTime}
        value={data.time.value}
        type={data.time.type}
        key={0}
      />
    ),
    frequency: (
      <FrequencyForm
        handler={handleFrequency}
        value={data.frequency.value}
        key={1}
      />
    ),
    liquid: (
      <LiquidForm
        handler={handleLiquid}
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

  function handleTime(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { value, name } = e.target;
    setData({ ...data, time: { ...data.time, [name]: value } });
  }

  function handleFrequency(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { value, name } = e.target;
    setData({ ...data, frequency: { ...data.frequency, [name]: value } });
  }

  function handleLiquid(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { value, name } = e.target;
    setData({ ...data, liquid: { ...data.liquid, [name]: value } });
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, habit)}>
      {habit.forms.map((form) => forms[form])}
      <div className="modal-action">
        {isPresent ? (
          <Button intent="ghost" handler={() => deleteHabit(habit)}>
            Remove
          </Button>
        ) : (
          <Button intent="ghost" handler={() => toggleModal()}>
            Cancel
          </Button>
        )}
        <Button type="submit" intent="primary">
          {isPresent ? "Update" : "Add habit"}
        </Button>
      </div>
    </form>
  );
}

export default ModalForm;
