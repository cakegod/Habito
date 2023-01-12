import type { HabitStateData } from "@stores/habits";
import type React from "react";
import type { HabitData } from "./ModalForm";

type ChangeEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>;

export function FrequencyForm({
  value,
  handler,
}: {
  value: HabitStateData["frequency"]["value"];
  handler: (e: ChangeEvent, unit: keyof HabitData) => void;
}) {
  return (
    <Container group={false} content="Frequency">
      <DropdownSelect
        type="frequency"
        value={value}
        options={[
          [1, "1 time per week"],
          [2, "2 times per week"],
          [3, "3 times per week"],
          [4, "4 times per week"],
          [5, "5 times per week"],
          [6, "6 times per week"],
          [7, "Every day 🚀"],
        ]}
        handler={handler}
      />
    </Container>
  );
}

export function LiquidForm({
  value,
  unit,
  handler,
}: {
  unit: HabitStateData["liquid"]["unit"];
  value: HabitStateData["liquid"]["value"];
  handler: (e: ChangeEvent, unit: keyof HabitData) => void;
}) {
  return (
    <Container content="Liquid drank per day">
      <Input type="liquid" value={value} handler={handler} placeholder="50" />
      <SelectInput
        type="liquid"
        unit={unit}
        handler={handler}
        options={["ml", "l"]}
      />
    </Container>
  );
}

export function TimeForm({
  value,
  unit,
  handler,
}: {
  unit: HabitStateData["time"]["unit"];
  value: HabitStateData["time"]["value"];
  handler: (e: ChangeEvent, unit: keyof HabitData) => void;
}) {
  return (
    <Container content="Time spent">
      <Input type="time" value={value} handler={handler} placeholder="5" />
      <SelectInput
        type="time"
        unit={unit}
        handler={handler}
        options={["minutes", "hours"]}
      />
    </Container>
  );
}

function SelectInput({
  type,
  unit,
  handler,
  options,
}: {
  type: keyof Omit<HabitData, "frequency">;
  unit: Omit<HabitData, "frequency">[typeof type]["unit"];
  handler: (e: ChangeEvent, unit: keyof HabitData) => void;
  options: (typeof unit)[];
}) {
  return (
    <select
      className="select bg-base-300 uppercase"
      value={unit}
      onChange={(e) => handler(e, type)}
      name="type"
    >
      {options.map((option) => (
        <option key={option[1]} value={option}>{option}</option>
      ))}
    </select>
  );
}

function DropdownSelect({
  type,
  value,
  options,
  handler,
}: {
  type: keyof HabitData;
  value: HabitStateData[typeof type]["value"];
  options: [typeof value, string][];
  handler: (e: ChangeEvent, unit: keyof HabitData) => void;
}) {
  return (
    <select
      className="select w-full bg-base-200"
      value={value}
      onChange={(e) => handler(e, type)}
      name="value"
    >
      {options.map((option) => (
        <option key={option[1]} value={option[0]}>{option[1]}</option>
      ))}
    </select>
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
  type,
  value,
  handler,
  placeholder,
}: {
  type: keyof HabitData;
  value: HabitStateData[typeof type]["value"];
  handler: (e: ChangeEvent, unit: keyof HabitData) => void;
  placeholder: string;
}) {
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
