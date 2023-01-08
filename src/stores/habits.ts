import { atom } from "nanostores";
import type { Habit } from "@data/habits";

export const habits = atom<Habit[]>([]);
