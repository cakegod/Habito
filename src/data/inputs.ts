type InputBase = {
  name: string;
  label: string;
};

type SimpleInputArg = {
  placeholder: string;
  value: string;
  type: "number" | "text";
};

type SelectDropdownArg = {
  options: [number, string][];
  selectedOption: number;
};

type SelectGroupArg = {
  options: string[];
  selectedOption: string;
};

type Selects = SelectDropdownArg | SelectGroupArg;

function inputBase<T>(
  base: InputBase,
  ...inputs: (Selects | SimpleInputArg)[]
): InputBase & T {
  return Object.assign(base, ...inputs);
}

function inputGroup(input: SimpleInputArg, select: SelectGroupArg) {
  return {
    inputCategory: "inputGroup" as const,
    ...input,
    ...select,
  };
}

function inputDropdown(select: SelectDropdownArg) {
  return {
    inputCategory: "inputDropdown" as const,
    ...select,
  };
}

export type InputGroup = ReturnType<typeof inputGroup>;
export type InputDropdown = ReturnType<typeof inputDropdown>;
export type Input = ReturnType<typeof inputBase<InputGroup | InputDropdown>>;

const inputs = {
  liquid: inputBase<InputGroup>(
    { name: "liquid", label: "Liquid drank per day" },
    inputGroup(
      {
        value: "",
        type: "number",
        placeholder: "50",
      },
      { options: ["ml", "l"], selectedOption: "ml" }
    )
  ),

  time: inputBase<InputGroup>(
    { name: "time", label: "Time spent" },
    inputGroup(
      {
        value: "",
        type: "number",
        placeholder: "5",
      },
      { options: ["minutes", "hours"], selectedOption: "minutes" }
    )
  ),

  frequency: inputBase<InputDropdown>(
    { name: "frequency", label: "Frequency" },
    inputDropdown({
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
    })
  ),
  cigarettes: inputBase<InputGroup>(
    { name: "generic", label: "cigarettes per day" },
    inputGroup(
      {
        value: "",
        type: "number",
        placeholder: "1",
      },
      { options: ["cigarettes"], selectedOption: "cigarettes" }
    )
  ),
} satisfies Record<string, Input>;

export default inputs;
