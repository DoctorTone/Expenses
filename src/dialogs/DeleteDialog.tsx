import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface DialogProps {
  openDeleteDialog: boolean;
  closeHandler: () => void;
}

const DeleteDialog = ({ openDeleteDialog, closeHandler }: DialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const deleteExpenses = (formData: FormData) => {
    if (window.confirm("Do you want to delete these accounts?")) {
      const accountsName = formData.get("deleteName") as string;
      localStorage.removeItem(accountsName);
    }
  };

  useEffect(() => {
    setOpenDialog(openDeleteDialog);
  }, [openDeleteDialog]);

  return (
    <Dialog
      open={openDialog}
      onClose={closeHandler}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle>Delete Accounts</DialogTitle>
      <DialogContent>
        <form id="deleteForm" action={deleteExpenses}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="deleteName"
            name="deleteName"
            label="Name"
            fullWidth
            variant="standard"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <Button type="submit" form="deleteForm">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
