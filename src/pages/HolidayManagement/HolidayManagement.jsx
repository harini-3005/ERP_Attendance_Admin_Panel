import { useState } from "react";

import {
  Paper,
  Button,
  Stack,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  IconButton,
  Pagination,
  Chip
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import HolidayForm from "../../components/forms/HolidayForm";

function HolidayManagement() {

  const [holidays,
    setHolidays] =
    useState([
      {
        id: 1,
        name:
          "New Year",
        date:
          "2026-01-01",
        restrictLeave: true
      },
      {
        id: 2,
        name:
          "Independence Day",
        date:
          "2026-08-15",
        restrictLeave: false
      }
    ]);

  const [openForm,
    setOpenForm] =
    useState(false);

  const [editingHoliday,
    setEditingHoliday] =
    useState(null);

  const [deleteId,
    setDeleteId] =
    useState(null);

  const [openDeleteDialog,
    setOpenDeleteDialog] =
    useState(false);

  const [search,
    setSearch] =
    useState("");

  const [page,
    setPage] =
    useState(1);

  const rowsPerPage = 5;

  const handleSaveHoliday =
    (formData) => {

      if (editingHoliday) {

        setHolidays(
          holidays.map(
            (item) =>
              item.id ===
              editingHoliday.id
                ? {
                    ...item,
                    ...formData
                  }
                : item
          )
        );

        setEditingHoliday(null);

      } else {

        setHolidays([
          ...holidays,
          {
            id: Date.now(),
            ...formData
          }
        ]);
      }
    };

  const handleDeleteHoliday =
    () => {

      setHolidays(
        holidays.filter(
          (item) =>
            item.id !== deleteId
        )
      );

      setDeleteId(null);

      setOpenDeleteDialog(
        false
      );
    };

  const filteredData =
    holidays.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalPages =
    Math.ceil(
      filteredData.length /
        rowsPerPage
    );

  const paginatedData =
    filteredData.slice(
      (page - 1) *
        rowsPerPage,
      page * rowsPerPage
    );

  return (
    <Paper sx={{ p: 4 }}>

      <PageHeader
        title="Holiday Management"
      />

      <Stack
        direction={{
          xs: "column",
          md: "row"
        }}
        spacing={2}
        mb={3}
      >

        <TextField
          fullWidth
          size="small"
          placeholder="Search Holiday"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {

            setEditingHoliday(
              null
            );

            setOpenForm(true);

          }}
        >
          Add Holiday
        </Button>

      </Stack>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Holiday Name
              </TableCell>

              <TableCell>
                Date
              </TableCell>

              <TableCell>
                Restrict Leave
              </TableCell>

              <TableCell>
                Actions
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {paginatedData.map(
              (item) => (

                <TableRow
                  key={item.id}
                >

                  <TableCell>
                    {item.name}
                  </TableCell>

                  <TableCell>
                    {item.date}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        item.restrictLeave
                          ? "Yes"
                          : "No"
                      }
                      color={
                        item.restrictLeave
                          ? "error"
                          : "success"
                      }
                    />

                  </TableCell>

                  <TableCell>

                    <IconButton
                      color="primary"
                      onClick={() => {

                        setEditingHoliday(
                          item
                        );

                        setOpenForm(
                          true
                        );

                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => {

                        setDeleteId(
                          item.id
                        );

                        setOpenDeleteDialog(
                          true
                        );

                      }}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              )
            )}

          </TableBody>

        </Table>

      </TableContainer>

      <Pagination
        sx={{
          mt: 3,
          display: "flex",
          justifyContent:
            "center"
        }}
        page={page}
        count={totalPages}
        onChange={(
          event,
          value
        ) => setPage(value)}
      />

      <HolidayForm
        open={openForm}
        onClose={() =>
          setOpenForm(false)
        }
        onSave={
          handleSaveHoliday
        }
        editData={
          editingHoliday
        }
      />

      <ConfirmDialog
        open={openDeleteDialog}
        title="Delete Holiday"
        message="Are you sure you want to delete this holiday?"
        onClose={() =>
          setOpenDeleteDialog(
            false
          )
        }
        onConfirm={
          handleDeleteHoliday
        }
      />

    </Paper>
  );
}

export default HolidayManagement;