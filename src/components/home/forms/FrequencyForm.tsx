import ModalLabel from "@components/home/ModalLabel";
import type React from "react";
import type { HabitData } from "../ModalForm";

interface Props {
  value: number;
  handler: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    type: keyof HabitData
  ) => void;
}

function FrequencyForm({ value, handler }: Props) {
  return (
    <div className="form-control">
      <ModalLabel content="Frequency" />
      <select
        className="select-bordered select w-full"
        value={value}
        onChange={(e) => handler(e, "frequency")}
        name="value"
      >
        <option value={1}>x1 times per week</option>
        <option value={2}>x2 times per week</option>
        <option value={3}>x3 times per week</option>
        <option value={4}>x4 times per week</option>
        <option value={5}>x5 times per week</option>
        <option value={6}>x6 times per week</option>
        <option value={7}>Every day 🚀</option>
      </select>
    </div>
  );
}

export default FrequencyForm;
