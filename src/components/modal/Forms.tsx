import type { HabitStateData } from "@stores/habits";
import type React from "react";
import type { HabitData } from "./ModalForm";

type ChangeHandler = (
  e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  unit: keyof HabitData
) => void;

export function FrequencyForm({
  formData,
}: {
  formData: {
    value: HabitStateData["frequency"]["value"];
    handler: ChangeHandler;
  };
}) {
  const { value, handler } = formData;
  return (
    <Container group={false} content="Frequency">
      <DropdownSelect
        inputData={{
          type: "frequency",
          value,
          handler,
          options: [
            [1, "1 time per week"],
            [2, "2 times per week"],
            [3, "3 times per week"],
            [4, "4 times per week"],
            [5, "5 times per week"],
            [6, "6 times per week"],
            [7, "Every day 🚀"],
          ],
        }}
      />
    </Container>
  );
}

export function LiquidForm({
  formData,
}: {
  formData: {
    unit: HabitStateData["liquid"]["unit"];
    value: HabitStateData["liquid"]["value"];
    handler: ChangeHandler;
  };
}) {
  const { handler, value, unit } = formData;
  return (
    <Container content="Liquid drank per day">
      <Input
        inputData={{ type: "liquid", value, handler, placeholder: "50" }}
      />
      <SelectInput
        inputData={{ type: "liquid", unit, handler, options: ["ml", "l"] }}
      />
    </Container>
  );
}

export function TimeForm({
  formData,
}: {
  formData: {
    unit: HabitStateData["time"]["unit"];
    value: HabitStateData["time"]["value"];
    handler: ChangeHandler;
  };
}) {
  const { unit, value, handler } = formData;
  return (
    <Container content="Time spent">
      <Input inputData={{ type: "time", value, handler, placeholder: "5" }} />
      <SelectInput
        inputData={{
          type: "time",
          unit,
          handler,
          options: ["minutes", "hours"],
        }}
      />
    </Container>
  );
}

function Label({ content }: { content: string }) {
  return (
    <label className="label">
      <span className="label-text">{content}</span>
    </label>
  );
}

function Container({
  children,
  content,
  group = true,
}: {
  children: React.ReactNode;
  content: string;
  group?: boolean;
}) {
  return (
    <div className="form-control">
      <Label content={content} />
      <label className={group ? "input-group" : ""}>{children}</label>
    </div>
  );
}

function Input({
  inputData,
}: {
  inputData: {
    type: keyof HabitData;
    value: HabitStateData[typeof inputData.type]["value"];
    handler: ChangeHandler;
    placeholder: string;
  };
}) {
  const { type, value, handler, placeholder } = inputData;
  return (
    <input
      type="number"
      required
      tabIndex={0}
      min="0"
      step="1"
      placeholder={placeholder}
      value={value}
      className="input w-full bg-base-200 placeholder:text-base-content/50"
      onChange={(e) => handler(e, type)}
      name="value"
    />
  );
}

function SelectInput({
  inputData,
}: {
  inputData: {
    type: keyof Omit<HabitData, "frequency">;
    unit: Omit<HabitData, "frequency">[typeof inputData.type]["unit"];
    handler: ChangeHandler;
    options: (typeof inputData.unit)[];
  };
}) {
  const { type, unit, handler, options } = inputData;
  return (
    <select
      className="select bg-base-300 uppercase"
      value={unit}
      onChange={(e) => handler(e, type)}
      name="unit"
    >
      {options.map((option) => (
        <option key={option[1]} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function DropdownSelect({
  inputData,
}: {
  inputData: {
    type: keyof HabitData;
    value: HabitStateData[typeof inputData.type]["value"];
    options: [typeof inputData.value, string][];
    handler: ChangeHandler;
  };
}) {
  const { type, value, options, handler } = inputData;
  return (
    <select
      className="select w-full bg-base-200"
      value={value}
      onChange={(e) => handler(e, type)}
      name="value"
    >
      {options.map((option) => (
        <option key={option[1]} value={option[0]}>
          {option[1]}
        </option>
      ))}
    </select>
  );
}
