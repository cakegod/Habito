import type { HabitStateData } from "@stores/habits";
import type React from "react";
import type { HabitData } from "./ModalForm";

type ChangeEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>;

export function FrequencyForm({
  value,
  handler,
}: {
  value: HabitStateData["frequency"]["value"];
  handler: (e: ChangeEvent, type: keyof HabitData) => void;
}) {
  return (
    <Container content="Frequency">
      <select
        className="select w-full bg-base-200"
        value={value}
        onChange={(e) => handler(e, "frequency")}
        name="value"
      >
        <option value={1}>1 time per week</option>
        <option value={2}>2 times per week</option>
        <option value={3}>3 times per week</option>
        <option value={4}>4 times per week</option>
        <option value={5}>5 times per week</option>
        <option value={6}>6 times per week</option>
        <option value={7}>Every day 🚀 </option>
      </select>
    </Container>
  );
}

export function LiquidForm({
  value,
  type,
  handler,
}: {
  type: HabitStateData["liquid"]["unit"];
  value: HabitStateData["liquid"]["value"];
  handler: (e: ChangeEvent, type: keyof HabitData) => void;
}) {
  return (
    <Container content="Liquid drank per day">
      <input
        type="number"
        required
        tabIndex={0}
        min="0"
        step="1"
        placeholder="50"
        value={value}
        className="input w-full bg-base-200 placeholder:text-base-content/50"
        onChange={(e) => handler(e, "liquid")}
        name="value"
      />
      <select
        className="select bg-base-300 uppercase"
        value={type}
        onChange={(e) => handler(e, "liquid")}
        name="type"
      >
        <option value="ml">ml</option>
        <option value="l">l</option>
      </select>
    </Container>
  );
}

export function TimeForm({
  value,
  type,
  handler,
}: {
  type: HabitStateData["time"]["unit"];
  value: HabitStateData["time"]["value"];
  handler: (e: ChangeEvent, type: keyof HabitData) => void;
}) {
  return (
    <Container content="Time spent">
      <input
        type="number"
        required
        tabIndex={0}
        min="0"
        step="1"
        placeholder="5"
        value={value}
        className="input w-full bg-base-200 placeholder:text-base-content/50"
        onChange={(e) => handler(e, "time")}
        name="value"
      />
      <select
        className="select bg-base-300 uppercase"
        value={type}
        onChange={(e) => handler(e, "time")}
        name="type"
      >
        <option value="minutes">minutes</option>
        <option value="hours">hours</option>
      </select>
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
}: {
  children: React.ReactNode;
  content: string;
}) {
  return (
    <div className="form-control">
      <Label content={content} />
      <label className="input-group">{children}</label>
    </div>
  );
}
