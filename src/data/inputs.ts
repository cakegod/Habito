type Categories = "time" | "frequency" | "liquid" | "cigarettes";

export interface Input {
  category: Categories;
  label: string;
  inputGroup?: {
    input: {
      type: "number";
      placeholder: number;
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
  [key in Categories]: Input;
} = {
  liquid: {
    category: "liquid",
    label: "Liquid drank per day",
    inputGroup: {
      input: {
        type: "number",
        placeholder: 50,
      },
      select: {
        options: ["ml", "l"],
      },
    },
  },
  frequency: {
    category: "frequency",
    label: "frequency",
    inputGroup: {
      input: {
        type: "number",
        placeholder: 5,
      },
      select: {
        options: ["minutes", "hours"],
      },
    },
  },
  time: {
    category: "time",
    label: "Time spent",
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
        placeholder: 5,
      },
      select: {
        options: ["minutes", "hours"],
      },
    },
  },
};

export default inputs