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
  options: readonly string[];
  selectedOption: string;
};

export type InputSelect = {
  inputCategory: "inputSelect";
  value: string;
  type: "number" | "text";
  placeholder: string;
  options: readonly string[];
  selectedOption: string;
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
    options: ["ml", "l"],
    selectedOption: "ml",
  },
  time: {
    inputCategory: "inputGroup",
    name: "time",
    label: "Time spent",
    value: "",
    placeholder: "5",
    type: "number",
    options: ["minutes", "hours"],
    selectedOption: "minutes",
  },
  frequency: {
    inputCategory: "inputSelect",
    name: "frequency",
    label: "Time spent",
    value: "",
    placeholder: "5",
    type: "number",
    options: ["minutes", "hours"],
    selectedOption: "minutes",
  },
  cigarettes: {
    inputCategory: "inputGroup",
    name: "generic",
    label: "Cigarettes per day",
    value: "",
    placeholder: "1",
    type: "number",
    options: ["cigarettes"],
    selectedOption: "cigarettes",
  },
} as const satisfies Record<string, Input>;
