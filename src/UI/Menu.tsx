import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import useStore from "../state/store";
import type { Expense, ExpenseItem } from "../state/Config";

const Menu = () => {
  const [openExpense, setOpenExpense] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [category, setCategory] = useState("");
  const expenseCategories = useStore((state) => state.expenseCategories);
  const expenses = useStore((state) => state.expenses);
  const expenseTotals = useStore((state) => state.expenseTotals);
  const updateExpenses = useStore((state) => state.updateExpenses);
  const updateUsedCategories = useStore((state) => state.updateUsedCategories);
  const updateTotals = useStore((state) => state.updateTotals);
  const updateCategories = useStore((state) => state.updateCategories);
  const setAccountsName = useStore((state) => state.setAccountsName);
  const updateTotalExpenditure = useStore(
    (state) => state.updateTotalExpenditure
  );

  const openExpenseDialog = () => {
    setOpenExpense(true);
  };

  const openCategoryDialog = () => {
    setOpenCategory(true);
  };

  const openNameDialog = () => {
    setOpenName(true);
  };

  const handleCloseExpense = () => {
    setOpenExpense(false);
  };

  const handleCloseCategory = () => {
    setOpenCategory(false);
  };

  const handleCloseName = () => {
    setOpenName(false);
  };

  const displayExpenses = () => {
    // DEBUG
    console.log("Expenses = ", expenseTotals);
  };
  const addExpense = (formData: FormData) => {
    // Get amount as number
    let numericAmount = parseFloat(formData.get("amount") as string);
    if (Number.isNaN(numericAmount)) {
      numericAmount = 0;
    }

    // See if new category
    const currentCategory = formData.get("category") as string;
    const foundCategory = expenses.find(
      (element) => element.category === currentCategory
    );

    if (!foundCategory) {
      // DEBUG
      console.log("New category", currentCategory);
      updateUsedCategories(currentCategory);
    }

    const expense: Expense = {
      item: formData.get("item") as string,
      amount: numericAmount,
      category: formData.get("category") as string,
      date: new Date().toDateString(),
    };
    updateExpenses(expense);
    updateTotals(expense);
    updateTotalExpenditure(expense.amount);

    setOpenExpense(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const addCategory = (formData: FormData) => {
    const category: ExpenseItem = {
      label: formData.get("label") as string,
      value: formData.get("value") as string,
    };

    updateCategories(category);
    setOpenCategory(false);
  };

  const updateName = (formData: FormData) => {
    const accountName = formData.get("accountsName") as string;
    setAccountsName(accountName);
    setOpenName(false);
  };

  return (
    <>
      <div id="menu" className="panel">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button variant="contained" onClick={openNameDialog} sx={{ mb: 2 }}>
            Update Name
          </Button>
          <Button
            variant="contained"
            onClick={openExpenseDialog}
            sx={{ mb: 2 }}
          >
            Add Expense
          </Button>
          <Button
            variant="contained"
            onClick={openCategoryDialog}
            sx={{ mb: 2 }}
          >
            Add Category
          </Button>
          <Button variant="contained" onClick={displayExpenses}>
            List All
          </Button>
        </Box>
      </div>
      <Dialog
        open={openExpense}
        onClose={handleCloseExpense}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <form id="expensesForm" action={addExpense}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="item"
              name="item"
              label="Item"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="amount"
              name="amount"
              label="Amount"
              fullWidth
              variant="standard"
              sx={{ mb: 2 }}
            />
            <InputLabel id="category-label" sx={{ ml: 1 }}>
              Category
            </InputLabel>
            <Select
              autoFocus
              required
              labelId="category-label"
              id="category"
              label="Category"
              name="category"
              value={category}
              fullWidth
              onChange={handleChange}
            >
              {expenseCategories.map((current) => (
                <MenuItem value={current.value}>{current.label}</MenuItem>
              ))}
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExpense}>Cancel</Button>
          <Button type="submit" form="expensesForm">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openCategory}
        onClose={handleCloseCategory}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <form id="categoryForm" action={addCategory}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="categoryLabel"
              label="Label"
              name="label"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="categoryValue"
              label="Value"
              name="value"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCategory}>Cancel</Button>
          <Button type="submit" form="categoryForm">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openName}
        onClose={handleCloseName}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Set Accounts Name</DialogTitle>
        <DialogContent>
          <form id="nameForm" action={updateName}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="accountsName"
              name="accountsName"
              label="Name"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseName}>Cancel</Button>
          <Button type="submit" form="nameForm">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Menu;
