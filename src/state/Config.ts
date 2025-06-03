import { Vector3 } from "three";

const SCENE = {
  CAMERA_POSITION: new Vector3(0, 12.5, 35),
};

export type ExpenseItem = {
  label: string;
  value: string;
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

export { SCENE };
