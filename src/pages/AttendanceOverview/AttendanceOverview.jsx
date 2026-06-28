import { useState } from "react";

import {
  Paper,
  Stack,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Pagination,
  MenuItem,
  Chip,
  Button
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import PageHeader from "../../components/common/PageHeader";

function AttendanceOverview() {

  const [search, setSearch] =
    useState("");

  const [employeeFilter,
    setEmployeeFilter] =
    useState("");

  const [fromDate,
    setFromDate] =
    useState("");

  const [toDate,
    setToDate] =
    useState("");

  const [page, setPage] =
    useState(1);

  const rowsPerPage = 5;

  const [attendance] =
    useState([
      {
        id: 1,
        employee: "Harini",
        date: "2026-06-20",
        inTime: "09:00",
        outTime: "18:00",
        status: "Present"
      },
      {
        id: 2,
        employee: "Ravi",
        date: "2026-06-20",
        inTime: "09:45",
        outTime: "18:00",
        status: "Late"
      },
      {
        id: 3,
        employee: "Suresh",
        date: "2026-06-20",
        inTime: "-",
        outTime: "-",
        status: "Absent"
      }
    ]);

  const employees =
    [...new Set(
      attendance.map(
        (item) =>
          item.employee
      )
    )];

  const filteredData =
    attendance.filter(
      (item) => {

        const searchMatch =
          item.employee
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const employeeMatch =
          !employeeFilter ||
          item.employee ===
            employeeFilter;

        const fromMatch =
          !fromDate ||
          item.date >= fromDate;

        const toMatch =
          !toDate ||
          item.date <= toDate;

        return (
          searchMatch &&
          employeeMatch &&
          fromMatch &&
          toMatch
        );
      }
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

  const exportCSV = () => {

    const headers = [
      "Employee",
      "Date",
      "In Time",
      "Out Time",
      "Status"
    ];

    const rows =
      filteredData.map(
        (item) => [
          item.employee,
          item.date,
          item.inTime,
          item.outTime,
          item.status
        ]
      );

    const csvContent =
      [
        headers.join(","),
        ...rows.map(
          (row) =>
            row.join(",")
        )
      ].join("\n");

    const blob =
      new Blob(
        [csvContent],
        {
          type:
            "text/csv;charset=utf-8;"
        }
      );

    const link =
      document.createElement(
        "a"
      );

    link.href =
      URL.createObjectURL(
        blob
      );

    link.download =
      "attendance-report.csv";

    link.click();
  };

  return (
    <Paper sx={{ p: 3 }}>

      <PageHeader
        title="Attendance Overview"
      />

      {/* Filters */}

      <Stack
  direction={{
    xs: "column",
    xl: "row"
  }}
  spacing={2}
  mb={4}
  alignItems="flex-end"
>

  <TextField
    fullWidth
    size="small"
    placeholder="Search Employee"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    sx={{
      flex: 2
    }}
  />

  <TextField
    select
    size="small"
    label="Employee"
    value={employeeFilter}
    onChange={(e) =>
      setEmployeeFilter(
        e.target.value
      )
    }
    sx={{
      minWidth: 220
    }}
  >
    <MenuItem value="">
      All
    </MenuItem>

    {employees.map((emp) => (
      <MenuItem
        key={emp}
        value={emp}
      >
        {emp}
      </MenuItem>
    ))}
  </TextField>

  <TextField
    label="From Date"
    type="date"
    size="small"
    InputLabelProps={{
      shrink: true
    }}
    value={fromDate}
    onChange={(e) =>
      setFromDate(
        e.target.value
      )
    }
    sx={{
      minWidth: 180
    }}
  />

  <TextField
    label="To Date"
    type="date"
    size="small"
    InputLabelProps={{
      shrink: true
    }}
    value={toDate}
    onChange={(e) =>
      setToDate(
        e.target.value
      )
    }
    sx={{
      minWidth: 180
    }}
  />

  <Button
    variant="contained"
    startIcon={<DownloadIcon />}
    onClick={exportCSV}
    sx={{
      minWidth: 170,
      height: 40,
      whiteSpace: "nowrap"
    }}
  >
    Export CSV
  </Button>

</Stack>

      {/* Attendance Table */}

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Employee
              </TableCell>

              <TableCell>
                Date
              </TableCell>

              <TableCell>
                In Time
              </TableCell>

              <TableCell>
                Out Time
              </TableCell>

              <TableCell>
                Status
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
                    {item.employee}
                  </TableCell>

                  <TableCell>
                    {item.date}
                  </TableCell>

                  <TableCell>
                    {item.inTime}
                  </TableCell>

                  <TableCell>
                    {item.outTime}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        item.status
                      }
                      color={
                        item.status ===
                        "Present"
                          ? "success"
                          : item.status ===
                            "Late"
                          ? "warning"
                          : "error"
                      }
                    />

                  </TableCell>

                </TableRow>

              )
            )}

          </TableBody>

        </Table>

      </TableContainer>

      {/* Pagination */}

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

    </Paper>
  );
}

export default AttendanceOverview;