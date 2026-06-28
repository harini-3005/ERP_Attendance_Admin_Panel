import { useState } from "react";

import {
  Paper,
  Stack,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  Pagination,
  Chip
} from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import CorrectionRemarkDialog from "../../components/forms/CorrectionRemarkDialog";

function AttendanceCorrections() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [openRemark, setOpenRemark] =
    useState(false);

  const [selectedRequest,
    setSelectedRequest] =
    useState(null);

  const [actionType, setActionType] =
    useState("");

  const rowsPerPage = 5;

  const [requests, setRequests] =
    useState([
      {
        id: 1,
        employee: "Harini",
        date: "2026-06-20",
        requestedIn: "09:00",
        requestedOut: "18:15",
        status: "Pending"
      },
      {
        id: 2,
        employee: "Ravi",
        date: "2026-06-19",
        requestedIn: "08:55",
        requestedOut: "18:05",
        status: "Approved"
      },
      {
        id: 3,
        employee: "Suresh",
        date: "2026-06-18",
        requestedIn: "09:20",
        requestedOut: "18:00",
        status: "Rejected"
      }
    ]);

  const handleAction = (
    request,
    action
  ) => {
    setSelectedRequest(request);
    setActionType(action);
    setOpenRemark(true);
  };

  const handleRemarkSubmit = (
    remark
  ) => {
    setRequests(
      requests.map((item) =>
        item.id === selectedRequest.id
          ? {
              ...item,
              status: actionType,
              remark
            }
          : item
      )
    );
  };

  const filteredData =
    requests.filter((item) => {
      const searchMatch =
        item.employee
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const statusMatch =
        !statusFilter ||
        item.status === statusFilter;

      return (
        searchMatch &&
        statusMatch
      );
    });

  const totalPages = Math.ceil(
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
    <Paper
      sx={{
        p: 4,
        width: "100%"
      }}
    >
      <PageHeader
        title="Attendance Correction Requests"
      />

      {/* Filters */}

      <Stack
        direction={{
          xs: "column",
          lg: "row"
        }}
        spacing={2}
        mb={3}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search Employee"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <TextField
          select
          size="small"
          label="Status"
          value={statusFilter}
          sx={{
            minWidth: 200
          }}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >
          <MenuItem value="">
            All
          </MenuItem>

          <MenuItem value="Pending">
            Pending
          </MenuItem>

          <MenuItem value="Approved">
            Approved
          </MenuItem>

          <MenuItem value="Rejected">
            Rejected
          </MenuItem>
        </TextField>
      </Stack>

      {/* Table */}

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
                Requested In
              </TableCell>

              <TableCell>
                Requested Out
              </TableCell>

              <TableCell>
                Status
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
                    {item.employee}
                  </TableCell>

                  <TableCell>
                    {item.date}
                  </TableCell>

                  <TableCell>
                    {item.requestedIn}
                  </TableCell>

                  <TableCell>
                    {item.requestedOut}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        item.status
                      }
                      color={
                        item.status ===
                        "Approved"
                          ? "success"
                          : item.status ===
                            "Rejected"
                          ? "error"
                          : "warning"
                      }
                    />

                  </TableCell>

                  <TableCell>

                    {item.status ===
                      "Pending" && (
                      <>
                        <Button
                          color="success"
                          onClick={() =>
                            handleAction(
                              item,
                              "Approved"
                            )
                          }
                        >
                          Approve
                        </Button>

                        <Button
                          color="error"
                          onClick={() =>
                            handleAction(
                              item,
                              "Rejected"
                            )
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}

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

      {/* Remarks Dialog */}

      <CorrectionRemarkDialog
        open={openRemark}
        onClose={() =>
          setOpenRemark(false)
        }
        actionType={
          actionType
        }
        onSubmit={
          handleRemarkSubmit
        }
      />
    </Paper>
  );
}

export default AttendanceCorrections;