import { Vector3 } from "three";

const SCENE = {
  CAMERA_POSITION: new Vector3(0, 1, 5),
};

export type ExpenseItem = {
  label: string;
  value: string;
};

export type Expense = {
  item: string;
  amount: number;
  category: string;
};

export { SCENE };
