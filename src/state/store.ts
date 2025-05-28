import { create } from "zustand";

interface ExpensesState {
  categories: string[];
}

const useStore = create<ExpensesState>((set) => ({
  categories: [],
}));

export default useStore;
