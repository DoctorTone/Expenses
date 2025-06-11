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
import DeleteDialog from "../dialogs/DeleteDialog";

const Menu = () => {
  const [openExpense, setOpenExpense] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [openLoad, setOpenLoad] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [category, setCategory] = useState("");
  const expenseCategories = useStore((state) => state.expenseCategories);
  const usedCategories = useStore((state) => state.usedCategories);
  const expenses = useStore((state) => state.expenses);
  const expenseTotals = useStore((state) => state.expenseTotals);
  const accountsName = useStore((state) => state.accountsName);
  const totalExpenditure = useStore((state) => state.totalExpenditure);
  const updateExpenses = useStore((state) => state.updateExpenses);
  const updateUsedCategories = useStore((state) => state.updateUsedCategories);
  const updateTotals = useStore((state) => state.updateTotals);
  const updateCategories = useStore((state) => state.updateCategories);
  const setAccountsName = useStore((state) => state.setAccountsName);
  const setExpenses = useStore((state) => state.setExpenses);
  const setTotalExpenditure = useStore((state) => state.setTotalExpenditure);
  const setUpdateRequired = useStore((state) => state.setUpdateRequired);
  const setExpenseCategories = useStore((state) => state.setExpenseCategories);
  const setUsedCategories = useStore((state) => state.setUsedCategories);
  const setExpenseTotals = useStore((state) => state.setExpenseTotals);
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

  const openLoadDialog = () => {
    setOpenLoad(true);
  };

  const openDeleteDialog = () => {
    setOpenDelete(true);
    console.log("Open delete is true");
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseExpense = () => {
    setOpenExpense(false);
  };

  const handleCloseCategory = () => {
    setOpenCategory(false);
  };

  const handleCloseLoad = () => {
    setOpenLoad(false);
  };

  const handleCloseName = () => {
    setOpenName(false);
  };

  const displayExpenses = () => {
    // DEBUG
    console.log("Expenses = ", localStorage.getItem(`${accountsName}`));
  };

  const saveExpenses = () => {
    if (accountsName === "Unnamed") {
      alert("Please set accounts name");
    } else {
      localStorage.setItem(accountsName, JSON.stringify(expenses));
      localStorage.setItem(
        `${accountsName}-totalExpenditure`,
        totalExpenditure.toString()
      );
      localStorage.setItem(
        `${accountsName}-expenseTotals`,
        JSON.stringify(expenseTotals)
      );
      localStorage.setItem(
        `${accountsName}-expenseCategories`,
        JSON.stringify(expenseCategories)
      );
      localStorage.setItem(
        `${accountsName}-usedCategories`,
        JSON.stringify(usedCategories)
      );
      alert("Accounts saved");
    }
  };

  const loadExpenses = (formData: FormData) => {
    const accountsName = formData.get("loadName") as string;
    const accounts = localStorage.getItem(`${accountsName}`);
    if (accounts) {
      setAccountsName(accountsName);
      const expenses = JSON.parse(accounts);
      setExpenses(expenses);
      const totalExpend = localStorage.getItem(
        `${accountsName}-totalExpenditure`
      );
      if (totalExpend) {
        const totalExpendJSON = JSON.parse(totalExpend);
        setTotalExpenditure(totalExpendJSON);
      }
      const expenseTotals = localStorage.getItem(
        `${accountsName}-expenseTotals`
      );
      if (expenseTotals) {
        const expenseTotalsJSON = JSON.parse(expenseTotals);
        setExpenseTotals(expenseTotalsJSON);
      }
      const expenseCats = localStorage.getItem(
        `${accountsName}-expenseCategories`
      );
      if (expenseCats) {
        const expenseCatsJSON = JSON.parse(expenseCats);
        setExpenseCategories(expenseCatsJSON);
      }
      const usedCats = localStorage.getItem(`${accountsName}-usedCategories`);
      if (usedCats) {
        const usedCatsJSON = JSON.parse(usedCats);
        setUsedCategories(usedCatsJSON);
      }
      setOpenLoad(false);
      setUpdateRequired(true);
    }
  };

  const addExpense = (formData: FormData) => {
    // Get amount as number
    let numericAmount = parseFloat(formData.get("amount") as string);
    if (Number.isNaN(numericAmount)) {
      numericAmount = 0;
    }
    let numericString = numericAmount.toFixed(2);
    numericAmount = parseFloat(numericString);

    // See if new category
    const currentCategory = formData.get("category") as string;
    const foundCategory = expenses.find(
      (element) => element.category === currentCategory
    );

    if (!foundCategory) {
      const newCategory: ExpenseItem = { label: currentCategory };
      updateUsedCategories(newCategory);
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
    // DEBUG
    console.log("Amount = ", expense.amount);

    setOpenExpense(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const addCategory = (formData: FormData) => {
    const category: ExpenseItem = {
      label: formData.get("label") as string,
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
          <Button variant="contained" onClick={displayExpenses} sx={{ mb: 2 }}>
            List All
          </Button>
          <Button variant="contained" onClick={saveExpenses} sx={{ mb: 2 }}>
            Save to Browser
          </Button>
          <Button variant="contained" onClick={openLoadDialog} sx={{ mb: 2 }}>
            Load accounts
          </Button>
          <Button variant="contained" onClick={openDeleteDialog} sx={{ mb: 2 }}>
            Delete accounts
          </Button>
          <Button variant="contained">Reset</Button>
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
                <MenuItem value={current.label}>{current.label}</MenuItem>
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
      <Dialog
        open={openLoad}
        onClose={handleCloseLoad}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>Load Accounts</DialogTitle>
        <DialogContent>
          <form id="loadForm" action={loadExpenses}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="loadName"
              name="loadName"
              label="Name"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoad}>Cancel</Button>
          <Button type="submit" form="loadForm">
            Load
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteDialog
        openDeleteDialog={openDelete}
        closeHandler={handleCloseDelete}
      />
    </>
  );
};

export default Menu;
