import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";

function CorrectionRemarkDialog({
  open,
  onClose,
  onSubmit,
  actionType
}) {

  const [remark, setRemark] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {

    if (open) {

      setRemark("");

      setError("");

    }

  }, [open]);

  const handleSubmit = () => {

    if (!remark.trim()) {

      setError(
        "Remark is required"
      );

      return;
    }

    onSubmit(remark);

    setRemark("");

    setError("");

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
        {actionType}
        {" "}
        Attendance Correction
      </DialogTitle>

      <DialogContent>

        <TextField
          autoFocus
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Remarks"
          placeholder={`Enter remarks for ${actionType}`}
          value={remark}
          error={!!error}
          helperText={error}
          onChange={(e) => {

            setRemark(
              e.target.value
            );

            if (error) {
              setError("");
            }

          }}
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
          color={
            actionType ===
            "Rejected"
              ? "error"
              : "success"
          }
          onClick={handleSubmit}
        >
          Submit
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default CorrectionRemarkDialog;