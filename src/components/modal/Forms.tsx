import type { HabitStateData } from "@stores/habits";
import type React from "react";
import type { HabitData } from "./ModalForm";

type ChangeHandler = (
  e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  unit: keyof HabitData
) => void;

type PropsUnit<T> = {
  [K in keyof T]: T[K] extends { unit: any } ? T[K] : never;
}[keyof T]["unit"];

type PropsTypes<T> = {
  [K in keyof T]: T[K] extends { unit: any } ? K : never;
}[keyof T];

type HabitUnitType = PropsUnit<HabitData>;
type HabitTypes = PropsTypes<HabitData>;

export function FrequencyForm({
  formData,
}: {
  formData: {
    value: HabitStateData["frequency"]["value"];
    handler: ChangeHandler;
    type: "frequency";
    options: [number, string][];
  };
}) {
  return (
    <Container group={false} content="Frequency">
      <DropdownSelect inputData={formData} />
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
    placeholder: string;
    type: "liquid";
    options: (typeof formData.unit)[];
  };
}) {
  return (
    <Container content="Liquid drank per day">
      <Input inputData={formData} />
      <SelectInput inputData={formData} />
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
    options: (typeof formData.unit)[];
    type: "time";
  };
}) {
  const { unit, value, handler, type, options } = formData;
  return (
    <Container content="Time spent">
      <Input inputData={{ type: "time", value, handler, placeholder: "5" }} />
      <SelectInput inputData={{ type, handler, options, unit }} />
    </Container>
  );
}

export function CigaretteForm({
  formData,
}: {
  formData: {
    value: HabitStateData["cigarettes"]["value"];
    handler: ChangeHandler;
    type: "cigarettes";
    placeholder: string;
  };
}) {
  return (
    <Container content="Amount of cigarettes per day">
      <Input inputData={formData} />
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
    type: HabitTypes;
    unit: HabitUnitType;
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
