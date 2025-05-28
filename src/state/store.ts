import { create } from "zustand";

type ExpenseItem = {
  label: string;
  value: string;
};

type Expense = {
  item: string;
  amount: number;
  category: string;
};

interface ExpensesState {
  expenseCategories: ExpenseItem[];
  expenses: Expense[];
}

const useStore = create<ExpensesState>((set) => ({
  expenseCategories: [
    { label: "Food and drink", value: "Food" },
    { label: "Groceries", value: "Groceries" },
    { label: "Petrol", value: "Petrol" },
    { label: "Bills", value: "Bills" },
    { label: "DIY", value: "DIY" },
  ],
  expenses: [],
}));

export default useStore;
