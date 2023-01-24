// HELPER
type GetPropValues<T, B extends keyof T[keyof T]> = T[keyof T][B];

function createInputBase<Name extends string>(
  name: Name,
  label: string,
  value: string = "",
  type: "number" | "text" = "number"
) {
  return { name, label, value, type };
}

function createInputGroup<
  Name extends string,
  Option extends string,
  SelectedOption extends Option
>(
  name: Name,
  label: string,
  placeholder: string,
  options: [Option, string][],
  selectedOption: SelectedOption
) {
  return Object.assign({}, createInputBase(name, label), {
    inputCategory: "inputGroup" as const,
    placeholder,
    options,
    selectedOption,
  });
}

function createInputSelect<
  Name extends string,
  Option extends number,
  SelectedOption extends Option
>(
  name: Name,
  label: string,
  options: [Option, string][],
  selectedOption: SelectedOption
) {
  return Object.assign({}, createInputBase(name, label), {
    inputCategory: "inputSelect" as const,
    options,
    selectedOption,
  });
}

export type InputGroup = ReturnType<typeof createInputGroup>;
export type InputSelect = ReturnType<typeof createInputSelect>;
export type Input = InputGroup | InputSelect;
export type InputNames = GetPropValues<typeof inputs, "name">;
export type InputCategory = GetPropValues<typeof inputs, "inputCategory">;

export const inputs = {
  liquid: createInputGroup(
    "liquid",
    "Liquid Drank per day",
    "50",
    [
      ["ml", "ml"],
      ["l", "l"],
    ],
    "ml"
  ),
  time: createInputGroup(
    "time",
    "Time spent",
    "5",
    [
      ["minutes", "minutes"],
      ["hours", "hours"],
    ],
    "minutes"
  ),
  frequency: createInputSelect(
    "frequency",
    "Time spent",
    [
      [1, "1 time per week"],
      [2, "2 times per week"],
      [3, "3 times per week"],
      [4, "4 times per week"],
      [5, "5 times per week"],
      [6, "6 times per week"],
      [7, "Every day 🚀"],
    ],
    3
  ),
  cigarettes: createInputGroup(
    "generic",
    "Cigarettes you want to avoid per day",
    "1",
    [["generic", "cigarettes"]],
    "generic"
  ),
  smartphone: createInputGroup(
    "generic",
    "Hours to avoid per day",
    "1",
    [["generic", "hours"]],
    "generic"
  ),
};
