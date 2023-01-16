type GetPropValues<T, B extends keyof T[keyof T]> = T[keyof T][B];

export type Base = Readonly<{
  name: string;
  label: string;
}>;

export type InputGroup = {
  inputCategory: "inputGroup";
  value: string;
  type: "number" | "text";
  placeholder: string;
  options: ReadonlyArray<readonly [string, string]>;
  selectedOption: string;
};

export type InputSelect = {
  inputCategory: "inputSelect";
  value: string;
  type: "number" | "text";
  placeholder: string;
  options: ReadonlyArray<readonly [number, string]>;
  selectedOption: string | number;
};

export type InputCategory = GetPropValues<typeof inputs, "inputCategory">;

export type InputType = InputGroup | InputSelect;
export type Input = Base & InputType;

export const inputs = {
  liquid: {
    inputCategory: "inputGroup",
    name: "liquid",
    label: "Liquid drank per day",
    value: "",
    placeholder: "50",
    type: "number",
    options: [
      ["ml", "ml"],
      ["l", "l"],
    ],
    selectedOption: "ml",
  },
  time: {
    inputCategory: "inputGroup",
    name: "time",
    label: "Time spent",
    value: "",
    placeholder: "5",
    type: "number",
    options: [
      ["minutes", "minutes"],
      ["hours", "hours"],
    ],
    selectedOption: "minutes",
  },
  frequency: {
    inputCategory: "inputSelect",
    name: "frequency",
    label: "Time spent",
    value: "",
    placeholder: "5",
    type: "number",
    options: [
      [1, "1 time per week"],
      [2, "2 times per week"],
      [3, "3 times per week"],
      [4, "4 times per week"],
      [5, "5 times per week"],
      [6, "6 times per week"],
      [7, "Every day 🚀"],
    ],
    selectedOption: 3,
  },
  cigarettes: {
    inputCategory: "inputGroup",
    name: "generic",
    label: "Cigarettes you want to avoid per day",
    value: "",
    placeholder: "1",
    type: "number",
    options: [["generic", "cigarettes"]],
    selectedOption: "generic",
  },
  smartphone: {
    inputCategory: "inputGroup",
    name: "generic",
    label: "Hours to avoid using per day",
    value: "",
    placeholder: "1",
    type: "number",
    options: [["generic", "hours"]],
    selectedOption: "generic",
  },
} satisfies Record<string, Input>;
