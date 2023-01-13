import type { InputCategories, InputType } from "@data/inputs";
import type React from "react";
import type { InputState } from "./ModalForm";

type ChangeHandler = (
  e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  category: InputCategories
) => void;

export function Inputs({
  input,
  handler,
  inputState,
}: {
  input: InputType;
  handler: ChangeHandler;
  inputState: InputState;
}) {
  return (
    <Container content={input.label}>
      {input.type === "select-dropdown" && (
        <DropdownSelect
          input={input}
          handler={handler}
          inputState={inputState}
        />
      )}
      {input.type === "input-group" && (
        <>
          <Input input={input} handler={handler} inputState={inputState} />
          <SelectInput
            input={input}
            handler={handler}
            inputState={inputState}
          />
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
  input,
  handler,
  inputState,
}: {
  input: InputType;
  handler: ChangeHandler;
  inputState: InputState;
}) {
  return (
    <input
      type="number"
      required
      tabIndex={0}
      min="0"
      step="1"
      placeholder={input.data.input.placeholder}
      value={inputState.value}
      className="input w-full bg-base-200 placeholder:text-base-content/50"
      onChange={(e) => handler(e, input.category)}
      name="value"
    />
  );
}

function SelectInput({
  input,
  handler,
  inputState,
}: {
  input: InputType;
  handler: ChangeHandler;
  inputState: InputState;
}) {
  return (
    <select
      className="select bg-base-300 uppercase"
      value={inputState.unit}
      onChange={(e) => handler(e, input.category)}
      name="unit"
    >
      {input.data.select.options.map((option) => (
        <option key={option as string} value={option as string}>
          {option}
        </option>
      ))}
    </select>
  );
}

function DropdownSelect({
  input,
  handler,
  inputState,
}: {
  input: InputType;
  handler: ChangeHandler;
  inputState: InputState;
}) {
  return (
    <select
      className="select w-full bg-base-200"
      value={inputState.value}
      onChange={(e) => handler(e, input.category)}
      name="value"
    >
      {input.data.select.options.map((option) => (
        <option key={option[1]} value={option[0]}>
          {option[1]}
        </option>
      ))}
    </select>
  );
}
