import { useState } from "react";

import {
  Paper,
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  TableContainer,
  Pagination
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import LeaveTypeForm from "../../components/forms/LeaveTypeForm";

function LeaveTypes() {
  const [openForm, setOpenForm] =
    useState(false);

  const [editingLeave,
    setEditingLeave] =
    useState(null);

  const [deleteId,
    setDeleteId] =
    useState(null);

  const [openDeleteDialog,
    setOpenDeleteDialog] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const rowsPerPage = 5;

  const [leaveTypes,
    setLeaveTypes] =
    useState([
      {
        id: 1,
        code: "CL",
        name: "Casual Leave",
        maxDays: 12
      },
      {
        id: 2,
        code: "SL",
        name: "Sick Leave",
        maxDays: 10
      },
      {
        id: 3,
        code: "EL",
        name: "Earned Leave",
        maxDays: 20
      },
      {
        id: 4,
        code: "LOP",
        name: "Loss Of Pay",
        maxDays: 0
      }
    ]);

  const handleSaveLeave =
    (formData) => {

      if (editingLeave) {

        setLeaveTypes(
          leaveTypes.map((item) =>
            item.id ===
            editingLeave.id
              ? {
                  ...item,
                  ...formData
                }
              : item
          )
        );

        setEditingLeave(null);

      } else {

        setLeaveTypes([
          ...leaveTypes,
          {
            id: Date.now(),
            ...formData
          }
        ]);
      }
    };

  const handleDeleteLeave =
    () => {

      setLeaveTypes(
        leaveTypes.filter(
          (item) =>
            item.id !== deleteId
        )
      );

      setDeleteId(null);

      setOpenDeleteDialog(
        false
      );
    };

  const filteredLeaves =
    leaveTypes.filter(
      (item) =>
        item.code
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalPages =
    Math.ceil(
      filteredLeaves.length /
        rowsPerPage
    );

  const paginatedData =
    filteredLeaves.slice(
      (page - 1) *
        rowsPerPage,
      page * rowsPerPage
    );

  return (
    <Paper sx={{ p: 3 }}>

      <PageHeader
        title="Leave Types Management"
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
          placeholder="Search Leave Type"
          value={search}
          onChange={(e) => {
            setSearch(
              e.target.value
            );
            setPage(1);
          }}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {

            setEditingLeave(
              null
            );

            setOpenForm(true);

          }}
        >
          Add Leave Type
        </Button>

      </Stack>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Leave Code
              </TableCell>

              <TableCell>
                Leave Name
              </TableCell>

              <TableCell>
                Maximum Days
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
                    {item.code}
                  </TableCell>

                  <TableCell>
                    {item.name}
                  </TableCell>

                  <TableCell>
                    {item.maxDays}
                  </TableCell>

                  <TableCell>

                    <IconButton
                      color="primary"
                      onClick={() => {

                        setEditingLeave(
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
        color="primary"
        onChange={(
          event,
          value
        ) => setPage(value)}
      />

      <LeaveTypeForm
        open={openForm}
        onClose={() =>
          setOpenForm(false)
        }
        onSave={
          handleSaveLeave
        }
        editData={
          editingLeave
        }
      />

      <ConfirmDialog
        open={openDeleteDialog}
        title="Delete Leave Type"
        message="Are you sure you want to delete this leave type?"
        onClose={() =>
          setOpenDeleteDialog(
            false
          )
        }
        onConfirm={
          handleDeleteLeave
        }
      />

    </Paper>
  );
}

export default LeaveTypes;