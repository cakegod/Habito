export type InputCategories = "time" | "frequency" | "liquid" | "cigarettes";

export interface InputType {
  category: InputCategories;
  label: string;
  inputGroup?: {
    input: {
      type: "number";
      placeholder: string;
    };
    select: {
      options: string[];
    };
  };
  select?: {
    options: [number, string][];
  };
}

const inputs: {
  [key in InputCategories]: InputType;
} = {
  liquid: {
    category: "liquid",
    label: "Liquid drank per day",
    inputGroup: {
      input: {
        type: "number",
        placeholder: "50",
      },
      select: {
        options: ["ml", "l"],
      },
    },
  },
  frequency: {
    category: "time",
    label: "Time spent",
    inputGroup: {
      input: {
        type: "number",
        placeholder: "5",
      },
      select: {
        options: ["minutes", "hours"],
      },
    },
  },
  time: {
    category: "frequency",
    label: "Frequency",
    select: {
      options: [
        [1, "1 time per week"],
        [2, "2 times per week"],
        [3, "3 times per week"],
        [4, "4 times per week"],
        [5, "5 times per week"],
        [6, "6 times per week"],
        [7, "Every day 🚀"],
      ],
    },
  },
  cigarettes: {
    category: "frequency",
    label: "frequency",
    inputGroup: {
      input: {
        type: "number",
        placeholder: "5",
      },
      select: {
        options: ["minutes", "hours"],
      },
    },
  },
};

export default inputs