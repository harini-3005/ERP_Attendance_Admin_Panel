import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem
} from "@mui/material";

const departments = [
  "Production",
  "Quality",
  "HR",
  "Maintenance",
  "Packing"
];

function SupervisorForm({
  open,
  onClose,
  onSave,
  editData
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      mobile: "",
      department: ""
    });

  const [errors, setErrors] =
    useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        email: editData.email || "",
        mobile: editData.mobile || "",
        department:
          editData.department || ""
      });
    } else {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        department: ""
      });
    }

    setErrors({});
  }, [editData, open]);

  const validate = () => {
    let tempErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      tempErrors.name =
        "Name is required";
    }

    // Email Validation
    if (!formData.email.trim()) {
      tempErrors.email =
        "Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(
        formData.email
      )
    ) {
      tempErrors.email =
        "Invalid email address";
    }

    // Mobile Validation
    if (!formData.mobile.trim()) {
      tempErrors.mobile =
        "Mobile number is required";
    } else if (
      !/^\d{10}$/.test(
        formData.mobile
      )
    ) {
      tempErrors.mobile =
        "Mobile must be exactly 10 digits";
    }

    // Department Validation
    if (!formData.department) {
      tempErrors.department =
        "Department is required";
    }

    setErrors(tempErrors);

    return (
      Object.keys(tempErrors)
        .length === 0
    );
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave(formData);

    setFormData({
      name: "",
      email: "",
      mobile: "",
      department: ""
    });

    setErrors({});

    onClose();
  };

  const handleClose = () => {
    setErrors({});

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {editData
          ? "Edit Supervisor"
          : "Add Supervisor"}
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Supervisor Name"
          value={formData.name}
          error={!!errors.name}
          helperText={errors.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value
            })
          }
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          value={formData.email}
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
            })
          }
        />

        <TextField
          fullWidth
          margin="normal"
          label="Mobile Number"
          value={formData.mobile}
          error={!!errors.mobile}
          helperText={errors.mobile}
          onChange={(e) =>
            setFormData({
              ...formData,
              mobile: e.target.value
            })
          }
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Department"
          value={formData.department}
          error={
            !!errors.department
          }
          helperText={
            errors.department
          }
          onChange={(e) =>
            setFormData({
              ...formData,
              department:
                e.target.value
            })
          }
        >
          {departments.map(
            (department) => (
              <MenuItem
                key={department}
                value={department}
              >
                {department}
              </MenuItem>
            )
          )}
        </TextField>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleClose}
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

export default SupervisorForm;