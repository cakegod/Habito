export type InputCategories = "time" | "frequency" | "liquid" | "cigarettes";

export interface InputBase {
  category: InputCategories;
  label: string;
}

export interface InputGroup extends InputBase {
  type: "input-group";
  data: {
    input: {
      type: "number";
      placeholder: string;
    };
    select: {
      options: string[];
    };
  };
}

export interface SelectDropdown extends InputBase {
  type: "select-dropdown";
  data: {
    select: {
      options: [number, string][];
    };
  };
}

export type InputType = InputGroup | SelectDropdown;

const inputs: {
  [key in InputCategories]: InputType;
} = {
  liquid: {
    category: "liquid",
    label: "Liquid drank per day",
    type: "input-group",
    data: {
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
    type: "input-group",
    data: {
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
    type: "select-dropdown",
    data: {
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
  },
  cigarettes: {
    category: "cigarettes",
    label: "Time spent",
    type: "input-group",
    data: {
      input: {
        type: "number",
        placeholder: "50",
      },
      select: {
        options: ["ml", "l"],
      },
    },
  },
};

export default inputs;
