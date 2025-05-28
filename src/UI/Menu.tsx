import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, DialogActions, DialogContent, TextField } from "@mui/material";

const Menu = () => {
  const [openExpense, setOpenExpense] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

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
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="category"
              name="category"
              label="Category"
              fullWidth
              variant="standard"
            />
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
