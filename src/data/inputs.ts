import type { UNITS } from "@util/constants";

// HELPER

export class InputBase {
  name: string;
  label: string;
  value: string;
  type: "number" | "text";
  options: [string | number, string][];
  selectedOption: keyof typeof UNITS | number;
  inputCategory: InputCategory;

  constructor({
    name,
    label,
    value = "",
    type = "number",
    options,
    selectedOption,
    inputCategory = "inputSelect",
  }: {
    name: string;
    label: string;
    value?: string;
    type?: "number" | "text";
    options: [string | number, string][];
    selectedOption: keyof typeof UNITS | number;
    inputCategory?: InputCategory;
  }) {
    this.name = name;
    this.label = label;
    this.value = value;
    this.type = type;
    this.options = options;
    this.selectedOption = selectedOption;
    this.inputCategory = inputCategory;
  }

  // get unit() {
  //   return this.selectedOption;
  // }
}

export class InputGroup extends InputBase {
  placeholder: string;

  constructor(
    name: string,
    label: string,
    placeholder: string,
    options: [string, string][],
    selectedOption: keyof typeof UNITS
  ) {
    super({
      name,
      label,
      options,
      selectedOption,
      inputCategory: "inputGroup",
    });
    this.placeholder = placeholder;
  }
}

export type Input = InputGroup | InputBase;
export type Inputs = typeof inputs;
export type InputCategory = "inputSelect" | "inputGroup";

export const inputs = {
  liquid: () =>
    new InputGroup(
      "liquid",
      "Liquid Drank per day",
      "50",
      [
        ["ml", "ml"],
        ["l", "l"],
      ],
      "ml"
    ),
  time: () =>
    new InputGroup(
      "time",
      "Time spent",
      "5",
      [
        ["minutes", "minutes"],
        ["hours", "hours"],
      ],
      "minutes"
    ),
  frequency: () =>
    new InputBase({
      name: "frequency",
      label: "Time spent",
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
    }),
  cigarettes: () =>
    new InputGroup(
      "generic",
      "Cigarettes you want to avoid per day",
      "1",
      [["generic", "cigarettes"]],
      "generic"
    ),
  smartphone: () =>
    new InputGroup(
      "generic",
      "Hours to avoid per day",
      "1",
      [["generic", "hours"]],
      "generic"
    ),
};
