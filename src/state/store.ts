import { create } from "zustand";
import type { ExpenseItem, Expense, ExpenseTotals } from "./Config";

interface ExpensesState {
  accountsName: string;
  setAccountsName: (name: string) => void;
  expenseCategories: ExpenseItem[];
  updateCategories: (category: ExpenseItem) => void;
  usedCategories: number;
  expenses: Expense[];
  expenseTotals: ExpenseTotals;
  totalExpenditure: number;
  updateTotalExpenditure: (total: number) => void;
  updateExpenses: (expense: Expense) => void;
  updateUsedCategories: (category: string) => void;
  updateTotals: (expense: Expense) => void;
  expenditureAdded: boolean;
}

const useStore = create<ExpensesState>((set) => ({
  accountsName: "Unnamed",
  setAccountsName: (name) => set(() => ({ accountsName: name })),
  totalExpenditure: 0,
  updateTotalExpenditure: (total) =>
    set((state) => ({ totalExpenditure: state.totalExpenditure + total })),
  expenditureAdded: false,
  expenseCategories: [
    { label: "Food and drink", value: "Food" },
    { label: "Groceries", value: "Groceries" },
    { label: "Petrol", value: "Petrol" },
    { label: "Bills", value: "Bills" },
    { label: "DIY", value: "DIY" },
  ],
  usedCategories: 0,
  updateCategories: (category) =>
    set((state) => ({
      expenseCategories: [...state.expenseCategories, category],
    })),
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
