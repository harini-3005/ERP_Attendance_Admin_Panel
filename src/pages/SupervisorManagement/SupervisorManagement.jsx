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
  Pagination,
  MenuItem
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import PageHeader from "../../components/common/PageHeader";
import SupervisorForm from "../../components/forms/SupervisorForm";
import ConfirmDialog from "../../components/common/ConfirmDialog";

function SupervisorManagement() {
  const [openForm, setOpenForm] =
    useState(false);

  const [editingSupervisor,
    setEditingSupervisor] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [departmentFilter,
    setDepartmentFilter] =
    useState("");

  const [page, setPage] =
    useState(1);

  const rowsPerPage = 5;

  const [deleteId,
    setDeleteId] =
    useState(null);

  const [openDeleteDialog,
    setOpenDeleteDialog] =
    useState(false);

  const departments = [
    "Production",
    "Quality",
    "HR",
    "Maintenance",
    "Packing"
  ];

  const [supervisors, setSupervisors] =
    useState([
      {
        id: 1,
        name: "Ravi Kumar",
        email: "ravi@gmail.com",
        mobile: "9876543210",
        department: "Production"
      },
      {
        id: 2,
        name: "Suresh",
        email: "suresh@gmail.com",
        mobile: "9876543211",
        department: "Quality"
      },
      {
        id: 3,
        name: "Harini",
        email: "harini@gmail.com",
        mobile: "9876543212",
        department: "HR"
      },
      {
        id: 4,
        name: "Vignesh",
        email: "vignesh@gmail.com",
        mobile: "9876543213",
        department: "Maintenance"
      },
      {
        id: 5,
        name: "Karthik",
        email: "karthik@gmail.com",
        mobile: "9876543214",
        department: "Packing"
      },
      {
        id: 6,
        name: "Praveen",
        email: "praveen@gmail.com",
        mobile: "9876543215",
        department: "Production"
      }
    ]);

  // Add / Update
  const handleSaveSupervisor =
    (formData) => {

      if (editingSupervisor) {

        setSupervisors(
          supervisors.map((item) =>
            item.id ===
            editingSupervisor.id
              ? {
                  ...item,
                  ...formData
                }
              : item
          )
        );

        setEditingSupervisor(
          null
        );

      } else {

        const newSupervisor = {
          id: Date.now(),
          ...formData
        };

        setSupervisors([
          ...supervisors,
          newSupervisor
        ]);
      }
    };

  // Delete
  const handleDeleteSupervisor =
    () => {

      setSupervisors(
        supervisors.filter(
          (item) =>
            item.id !== deleteId
        )
      );

      setDeleteId(null);

      setOpenDeleteDialog(
        false
      );
    };

  // Search + Filter
  const filteredSupervisors =
    supervisors.filter((item) => {

      const searchMatch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const departmentMatch =
        !departmentFilter ||
        item.department ===
          departmentFilter;

      return (
        searchMatch &&
        departmentMatch
      );
    });

  // Pagination
  const totalPages =
    Math.ceil(
      filteredSupervisors.length /
        rowsPerPage
    );

  const paginatedData =
    filteredSupervisors.slice(
      (page - 1) *
        rowsPerPage,
      page * rowsPerPage
    );

  return (
    <Paper sx={{ p: 3 }}>

      <PageHeader
        title="Supervisor Management"
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
          placeholder="Search Supervisor"
          value={search}
          onChange={(e) => {
            setSearch(
              e.target.value
            );
            setPage(1);
          }}
        />

        <TextField
          select
          size="small"
          label="Department"
          value={
            departmentFilter
          }
          sx={{
            minWidth: 180
          }}
          onChange={(e) => {
            setDepartmentFilter(
              e.target.value
            );
            setPage(1);
          }}
        >
          <MenuItem value="">
            All
          </MenuItem>

          {departments.map(
            (dept) => (
              <MenuItem
                key={dept}
                value={dept}
              >
                {dept}
              </MenuItem>
            )
          )}
        </TextField>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {

            setEditingSupervisor(
              null
            );

            setOpenForm(true);

          }}
        >
          Add Supervisor
        </Button>

      </Stack>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Name
              </TableCell>

              <TableCell>
                Email
              </TableCell>

              <TableCell>
                Mobile
              </TableCell>

              <TableCell>
                Department
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
                    {item.email}
                  </TableCell>

                  <TableCell>
                    {item.mobile}
                  </TableCell>

                  <TableCell>
                    {item.department}
                  </TableCell>

                  <TableCell>

                    <IconButton
                      color="primary"
                      onClick={() => {

                        setEditingSupervisor(
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

      <SupervisorForm
        open={openForm}
        onClose={() =>
          setOpenForm(false)
        }
        onSave={
          handleSaveSupervisor
        }
        editData={
          editingSupervisor
        }
      />

      <ConfirmDialog
        open={openDeleteDialog}
        title="Delete Supervisor"
        message="Are you sure you want to delete this supervisor?"
        onClose={() =>
          setOpenDeleteDialog(
            false
          )
        }
        onConfirm={
          handleDeleteSupervisor
        }
      />

    </Paper>
  );
}

export default SupervisorManagement;