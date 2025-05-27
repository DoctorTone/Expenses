import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, DialogActions, DialogContent, TextField } from "@mui/material";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const openExpense = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div id="menu" className="panel">
        <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
          <Button variant="contained" onClick={openExpense} sx={{ mb: 2 }}>
            Add Expense
          </Button>
          <Button variant="contained" onClick={openExpense}>
            Add Category
          </Button>
        </Box>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="item"
            label="Item"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="category"
            label="Category"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Menu;
