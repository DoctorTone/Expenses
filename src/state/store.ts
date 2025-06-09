import { create } from "zustand";
import type { ExpenseItem, Expense, ExpenseTotals } from "./Config";

interface ExpensesState {
  accountsName: string;
  setAccountsName: (name: string) => void;
  expenseCategories: ExpenseItem[];
  updateCategories: (category: ExpenseItem) => void;
  usedCategories: ExpenseItem[];
  expenses: Expense[];
  expenseTotals: ExpenseTotals;
  totalExpenditure: number;
  updateTotalExpenditure: (total: number) => void;
  updateExpenses: (expense: Expense) => void;
  updateUsedCategories: (category: ExpenseItem) => void;
  updateTotals: (expense: Expense) => void;
  expenditureAdded: boolean;
  setExpenses: (expenses: Expense[]) => void;
}

const useStore = create<ExpensesState>((set) => ({
  accountsName: "Unnamed",
  setAccountsName: (name) => set(() => ({ accountsName: name })),
  totalExpenditure: 0,
  updateTotalExpenditure: (total) =>
    set((state) => ({ totalExpenditure: state.totalExpenditure + total })),
  expenditureAdded: false,
  expenseCategories: [
    { label: "Food and drink" },
    { label: "Groceries" },
    { label: "Petrol" },
    { label: "Bills" },
    { label: "DIY" },
  ],
  usedCategories: [],
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
      usedCategories: [...state.usedCategories, category],
      expenseTotals: { ...state.expenseTotals, [category.label]: 0 },
    })),
  updateTotals: (expense) =>
    set((state) => ({
      expenseTotals: {
        ...state.expenseTotals,
        [expense.category]:
          state.expenseTotals[expense.category] + expense.amount,
      },
    })),
  setExpenses: (accounts) =>
    set(() => ({ expenses: [...accounts], expenditureAdded: true })),
}));

export default useStore;
