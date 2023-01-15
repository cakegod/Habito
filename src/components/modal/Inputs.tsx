import type { Input, InputGroup, InputSelect } from "@data/inputs";
import type React from "react";

type ChangeHandler = (
  e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  category: Input["inputCategory"]
) => void;

interface Props<T = Input> {
  input: T;
  handler: ChangeHandler;
}

export function Inputs({ input, handler }: Props) {
  return (
    <Container content={input.label}>
      {input.inputCategory === "inputSelect" && (
        <DropdownSelect input={input} handler={handler} />
      )}
      {input.inputCategory === "inputGroup" && (
        <>
          <Input input={input} handler={handler} />
          <SelectInput input={input} handler={handler} />
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
  content: Input["label"];
  group?: boolean;
}) {
  return (
    <div className="form-control">
      <Label content={content} />
      <label className={group ? "input-group" : ""}>{children}</label>
    </div>
  );
}

function Input({ input, handler }: Props<InputGroup>) {
  return (
    <input
      type="number"
      required
      tabIndex={0}
      min="0"
      step="1"
      placeholder={input.placeholder}
      value={input.value}
      className="input w-full bg-base-200 placeholder:text-base-content/50"
      onChange={(e) => handler(e, "inputGroup")}
      name="value"
    />
  );
}

function SelectInput({ input, handler }: Props<InputGroup>) {
  return (
    <select
      className="select bg-base-300 uppercase"
      value={input.selectedOption}
      onChange={(e) => handler(e, "inputGroup")}
      name="selectedOption"
    >
      {input.options.map((option) => (
        <option key={option[0]} value={option[0]}>
          {option[1]}
        </option>
      ))}
    </select>
  );
}

function DropdownSelect({ input, handler }: Props<InputSelect>) {
  return (
    <select
      className="select w-full bg-base-200"
      value={input.selectedOption}
      onChange={(e) => handler(e, "inputSelect")}
      name="selectedOption"
    >
      {input.options.map((option) => (
        <option key={option[1]} value={option[0]}>
          {option[1]}
        </option>
      ))}
    </select>
  );
}
