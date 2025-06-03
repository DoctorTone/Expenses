import { create } from "zustand";
import type { ExpenseItem, Expense, ExpenseTotals } from "./Config";

interface ExpensesState {
  expenseCategories: ExpenseItem[];
  usedCategories: number;
  expenses: Expense[];
  expenseTotals: ExpenseTotals;
  updateExpenses: (expense: Expense) => void;
  updateUsedCategories: (category: string) => void;
  updateTotals: (expense: Expense) => void;
  expenditureAdded: boolean;
}

const useStore = create<ExpensesState>((set) => ({
  expenditureAdded: false,
  expenseCategories: [
    { label: "Food and drink", value: "Food" },
    { label: "Groceries", value: "Groceries" },
    { label: "Petrol", value: "Petrol" },
    { label: "Bills", value: "Bills" },
    { label: "DIY", value: "DIY" },
  ],
  usedCategories: 0,
  expenses: [],
  expenseTotals: {},
  updateExpenses: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
      expenditureAdded: true,
    })),
  updateUsedCategories: (category) =>
    set((state) => ({
      usedCategories: state.usedCategories + 1,
      expenseTotals: { ...state.expenseTotals, [category]: 0 },
    })),
  updateTotals: (expense) =>
    set((state) => ({
      expenseTotals: {
        ...state.expenseTotals,
        [expense.category]:
          state.expenseTotals[expense.category] + expense.amount,
      },
    })),
}));

export default useStore;
