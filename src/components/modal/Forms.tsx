import type { InputCategories, InputType } from "@data/inputs";
import type React from "react";

type ChangeHandler = (
  e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  category: InputCategories
) => void;

export function Inputs({
  data,
  handler,
  value,
}: {
  data: InputType;
  handler: ChangeHandler;
  value: string;
}) {
  return (
    <Container content={data.label}>
      {data.select !== undefined && (
        <DropdownSelect data={data} handler={handler} value={value} />
      )}
      {data.inputGroup !== undefined && (
        <>
          <Input data={data} handler={handler} value={value} />
          <SelectInput data={data} handler={handler} value={value} />
        </>
      )}
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
  content: InputType["label"];
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
  data,
  handler,
  value,
}: {
  data: InputType;
  handler: ChangeHandler;
  value: string;
}) {
  return (
    <input
      type="number"
      required
      tabIndex={0}
      min="0"
      step="1"
      placeholder={data.inputGroup!.input.placeholder}
      value={value}
      className="input w-full bg-base-200 placeholder:text-base-content/50"
      onChange={(e) => handler(e, data.category)}
      name="value"
    />
  );
}

function SelectInput({
  data,
  handler,
  value,
}: {
  data: InputType;
  handler: ChangeHandler;
  value: string;
}) {
  return (
    <select
      className="select bg-base-300 uppercase"
      value={value}
      onChange={(e) => handler(e, data.category)}
      name="unit"
    >
      {data.inputGroup!.select.options.map((option) => (
        <option key={option[1]} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function DropdownSelect({
  data,
  handler,
  value,
}: {
  data: InputType;
  handler: ChangeHandler;
  value: string;
}) {
  return (
    <select
      className="select w-full bg-base-200"
      value={value}
      onChange={(e) => handler(e, data.category)}
      name="value"
    >
      {data.select!.options.map((option) => (
        <option key={option[1]} value={option[0]}>
          {option[1]}
        </option>
      ))}
    </select>
  );
}
