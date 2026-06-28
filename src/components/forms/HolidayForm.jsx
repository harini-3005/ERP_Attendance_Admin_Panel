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
  Button,
  FormControlLabel,
  Switch
} from "@mui/material";

function HolidayForm({
  open,
  onClose,
  onSave,
  editData
}) {

  const [formData,
    setFormData] =
    useState({
      name: "",
      date: "",
      restrictLeave: false
    });

  const [errors,
    setErrors] =
    useState({});

  useEffect(() => {

    if (editData) {

      setFormData({
        name:
          editData.name || "",
        date:
          editData.date || "",
        restrictLeave:
          editData.restrictLeave ||
          false
      });

    } else {

      setFormData({
        name: "",
        date: "",
        restrictLeave: false
      });

    }

    setErrors({});

  }, [editData, open]);

  const validate = () => {

    let temp = {};

    if (!formData.name.trim()) {
      temp.name =
        "Holiday name required";
    }

    if (!formData.date) {
      temp.date =
        "Holiday date required";
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
          ? "Edit Holiday"
          : "Add Holiday"}
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Holiday Name"
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
          type="date"
          label="Holiday Date"
          InputLabelProps={{
            shrink: true
          }}
          value={formData.date}
          error={!!errors.date}
          helperText={errors.date}
          onChange={(e) =>
            setFormData({
              ...formData,
              date:
                e.target.value
            })
          }
        />

        <FormControlLabel
          control={
            <Switch
              checked={
                formData.restrictLeave
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  restrictLeave:
                    e.target.checked
                })
              }
            />
          }
          label="Restrict Leave"
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

export default HolidayForm;