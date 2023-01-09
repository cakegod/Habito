import Button from "@components/Button";
import ModalLabel from "@components/home/ModalLabel";
import type { Habit } from "@data/habits";
import { toggleModal, addHabit } from "@stores/habits";
import React, { useState } from "react";

function ModalForm({ habit }: { habit: Habit }) {
  const [data, setData] = useState({
    time: {
      value: "",
      type: "minutes",
    },
    frequency: {
      value: 3,
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, habit: Habit) {
    e.preventDefault();
    addHabit(habit);
    console.log(habit);
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

  return (
    <form onSubmit={(e) => handleSubmit(e, habit)}>
      <div className="form-control">
        <ModalLabel content="Time spent per day" />
        <label className="input-group">
          <input
            type="number"
            required
            tabIndex={0}
            min="0"
            step="5"
            placeholder="5"
            value={data.time.value}
            className="input-bordered input w-full placeholder:text-base-content/50"
            onChange={handleTime}
            name="value"
          />
          <select
            className="select bg-base-300 uppercase"
            value={data.time.type}
            onChange={handleTime}
            name="type"
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
          </select>
        </label>
      </div>
      <div className="form-control">
        <ModalLabel content="Frequency" />
        <select
          className="select-bordered select w-full"
          value={data.frequency.value}
          onChange={handleFrequency}
          name="value"
        >
          <option value={1}>x1 times per week</option>
          <option value={2}>x2 times per week</option>
          <option value={3}>x3 times per week</option>
          <option value={4}>x4 times per week</option>
          <option value={5}>x5 times per week</option>
          <option value={6}>x6 times per week</option>
          <option value={7}>Every day</option>
        </select>
      </div>
      <div className="modal-action">
        <Button intent="ghost" handler={() => toggleModal()}>
          Cancel
        </Button>
        <Button type="submit" intent="primary">
          Add habit
        </Button>
      </div>
    </form>
  );
}

export default ModalForm;
