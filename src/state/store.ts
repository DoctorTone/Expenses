import { create } from "zustand";

type ExpenseItem = {
  label: string;
  value: string;
};

interface ExpensesState {
  expenseCategories: ExpenseItem[];
}

const useStore = create<ExpensesState>((set) => ({
  expenseCategories: [
    { label: "Food and drink", value: "Food" },
    { label: "Groceries", value: "Groceries" },
    { label: "Petrol", value: "Petrol" },
    { label: "Bills", value: "Bills" },
    { label: "DIY", value: "DIY" },
  ],
}));

export default useStore;
