import { Input, InputNames, inputs as input } from "./inputs";
import { nanoid } from "nanoid";

export function createHabit(
  name: string,
  icon: string,
  inputs: Input[],
  avoid: boolean = false
) {
  return new Habit({ name, icon, inputs, avoid, id: nanoid() });
}

type Data = {
  name: string;
  icon: string;
  inputs: Input[];
  avoid: boolean;
  id: string;
};

export class Habit {
  data: Data;

  constructor(data: Data) {
    this.data = data;
  }

  rawData() {
    return this.data;
  }

  get name() {
    return this.data.name;
  }

  get inputNames() {
    return this.data.inputs.reduce((acc, curr) => {
      acc[curr.name as InputNames] = curr;
      return acc;
    }, {} as { [key in InputNames]: Input });
  }

  get unit() {
    return this.data.inputs[0]!.selectedOption;
  }

  get icon() {
    return this.data.icon;
  }

  get id() {
    return this.data.id;
  }

  get inputs() {
    return this.data.inputs;
  }

  set inputs(value: Input[]) {
    this.inputs = value;
  }

  get avoid() {
    return this.data.avoid;
  }
}

// TODO: add more habits
export const habitsData = [
  createHabit("Meditate", "🧘‍♀️", [input.time(), input.frequency()]),
  createHabit("Exercise", "🏋️‍♂️", [input.time(), input.frequency()]),
  createHabit("Read", "📖", [input.time(), input.frequency()]),
  createHabit("Write", "📝", [input.time(), input.frequency()]),
  createHabit("Drink Water", "💧", [input.liquid()]),
  createHabit("Code", "👨‍💻", [input.time(), input.frequency()]),
  createHabit("Smoke", "🚬", [input.cigarettes()], true),
  createHabit("Smartphone", "📱", [input.smartphone()], true),
  createHabit("Learn Language", "🌎", [input.time(), input.frequency()]),
].sort((a) => (a.avoid ? 1 : -1)) satisfies Habit[];
