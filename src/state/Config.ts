import { Vector3 } from "three";

const SCENE = {
  CAMERA_POSITION: new Vector3(0, 12.5, 35),
  DISPLAY_RADIUS: 70,
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
