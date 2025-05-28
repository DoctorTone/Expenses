import { create } from "zustand";

interface ExpensesState {
  categories: string[];
}

const useStore = create<ExpensesState>((set) => ({
  categories: ["Food and drink", "Groceries", "Petrol", "Bills", "DIY"],
}));

export default useStore;
