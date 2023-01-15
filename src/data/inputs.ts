type InputBase = {
  name: string;
  label: string;
};

type SimpleInput = {
  placeholder: string;
  value: string;
  type: "number" | "text";
};

type SelectDropdown = {
  options: [number, string][];
  selectedOption: number;
};

type SelectGroup = {
  options: string[];
  selectedOption: string;
};

type Selects = SelectDropdown | SelectGroup;

function inputBase(
  base: InputBase,
  ...inputs: (Selects | SimpleInput)[]
): InputBase & (SimpleInput | Selects) {
  return Object.assign(base, ...inputs);
}

function inputGroup(input: SimpleInput, select: SelectGroup) {
  return {
    inputCategory: "inputGroup" as const,
    ...input,
    ...select,
  };
}

function inputDropdown(select: SelectDropdown) {
  return {
    inputCategory: "inputDropdown",
    ...select,
  };
}

export type Inputs = ReturnType<typeof inputBase>;

const inputs = {
  liquid: inputBase(
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

  time: inputBase(
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

  frequency: inputBase(
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
      selectedOption: 1,
    })
  ),
  cigarettes: inputBase(
    { name: "generic", label: "Time spent" },
    inputGroup(
      {
        value: "",
        type: "number",
        placeholder: "1",
      },
      { options: ["minutes", "hours"], selectedOption: "minutes" }
    )
  ),
} satisfies Record<string, Inputs>;

export default inputs;
