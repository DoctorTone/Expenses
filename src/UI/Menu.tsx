import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions, DialogContent } from "@mui/material";

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
        <Button variant="contained" onClick={openExpense}>
          Add
        </Button>
      </div>
      <Dialog open={open}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>Expense Form</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Menu;
