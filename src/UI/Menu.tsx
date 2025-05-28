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

const Menu = () => {
  const [openExpense, setOpenExpense] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState("");

  const cats = ["Food and drink", "Groceries", "Petrol", "Bills", "DIY"];

  const openExpenseDialog = () => {
    setOpenExpense(true);
  };

  const openCategoryDialog = () => {
    setOpenCategory(true);
  };

  const handleCloseExpense = () => {
    setOpenExpense(false);
  };

  const handleCloseCategory = () => {
    setOpenCategory(false);
  };

  const addExpense = (formData: FormData) => {
    // DEBUG
    console.log("Item", formData.get("item"));
    setOpenExpense(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <>
      <div id="menu" className="panel">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            variant="contained"
            onClick={openExpenseDialog}
            sx={{ mb: 2 }}
          >
            Add Expense
          </Button>
          <Button variant="contained" onClick={openCategoryDialog}>
            Add Category
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
              {cats.map((current, index) => (
                <MenuItem value={current}>{current}</MenuItem>
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
          <TextField
            autoFocus
            required
            margin="dense"
            id="categoryName"
            label="Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCategory}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Menu;
