import { Vector3 } from "three";

const SCENE = {
  CAMERA_POSITION: new Vector3(0, 45, 140),
  DISPLAY_RADIUS: 70,
  SEGMENTS: 6,
  CYLINDER_SLOTS: 12,
};

export type ExpenseItem = {
  label: string;
};

export type Expense = {
  item: string;
  amount: number;
  category: string;
  date: string;
};

export type ExpenseTotals = {
  [key: string]: number;
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export { SCENE };
