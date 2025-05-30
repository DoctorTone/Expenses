import { create } from "zustand";
import type { ExpenseItem, Expense } from "./Config";

interface ExpensesState {
  expenseCategories: ExpenseItem[];
  expenses: Expense[];
  updateExpenses: (expense: Expense) => void;
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
  updateExpenses: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),
}));

export default useStore;
