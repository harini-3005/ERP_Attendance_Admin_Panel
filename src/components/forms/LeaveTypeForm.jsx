import {
  useState,
  useEffect
} from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";

function LeaveTypeForm({
  open,
  onClose,
  onSave,
  editData
}) {

  const [formData, setFormData] =
    useState({
      code: "",
      name: "",
      maxDays: ""
    });

  const [errors, setErrors] =
    useState({});

  useEffect(() => {

    if (editData) {

      setFormData({
        code:
          editData.code || "",
        name:
          editData.name || "",
        maxDays:
          editData.maxDays || ""
      });

    } else {

      setFormData({
        code: "",
        name: "",
        maxDays: ""
      });
    }

    setErrors({});

  }, [editData, open]);

  const validate = () => {

    let temp = {};

    if (!formData.code.trim()) {
      temp.code =
        "Leave code required";
    }

    if (!formData.name.trim()) {
      temp.name =
        "Leave name required";
    }

    if (
      formData.maxDays === ""
    ) {
      temp.maxDays =
        "Maximum days required";
    }

    setErrors(temp);

    return (
      Object.keys(temp)
        .length === 0
    );
  };

  const handleSubmit = () => {

    if (!validate()) return;

    onSave(formData);

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
        {editData
          ? "Edit Leave Type"
          : "Add Leave Type"}
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Leave Code"
          value={formData.code}
          error={!!errors.code}
          helperText={errors.code}
          onChange={(e) =>
            setFormData({
              ...formData,
              code:
                e.target.value.toUpperCase()
            })
          }
        />

        <TextField
          fullWidth
          margin="normal"
          label="Leave Name"
          value={formData.name}
          error={!!errors.name}
          helperText={errors.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name:
                e.target.value
            })
          }
        />

        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Maximum Days"
          value={formData.maxDays}
          error={
            !!errors.maxDays
          }
          helperText={
            errors.maxDays
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              maxDays:
                e.target.value
            })
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
          {editData
            ? "Update"
            : "Save"}
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default LeaveTypeForm;