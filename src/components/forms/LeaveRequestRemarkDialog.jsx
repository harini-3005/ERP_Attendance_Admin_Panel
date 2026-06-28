import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";

function LeaveRequestRemarkDialog({
  open,
  onClose,
  onSubmit,
  actionType
}) {

  const [remark, setRemark] =
    useState("");

  const handleSubmit = () => {

    onSubmit(remark);

    setRemark("");

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {actionType} Leave Request
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Remarks"
          margin="normal"
          value={remark}
          onChange={(e) =>
            setRemark(
              e.target.value
            )
          }
        />

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default LeaveRequestRemarkDialog;