import { useState } from "react";

import {
  Paper,
  Stack,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TextField,
  MenuItem,
  Pagination,
  Chip
} from "@mui/material";

import PageHeader from "../../components/common/PageHeader";

import LeaveRequestRemarkDialog from "../../components/forms/LeaveRequestRemarkDialog";

function LeaveRequests() {

  const [page, setPage] =
    useState(1);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("");

  const [openRemark,
    setOpenRemark] =
    useState(false);

  const [selectedRequest,
    setSelectedRequest] =
    useState(null);

  const [actionType,
    setActionType] =
    useState("");

  const rowsPerPage = 5;

  const [requests,
    setRequests] =
    useState([
      {
        id: 1,
        employee:
          "Harini",
        leaveType: "CL",
        fromDate:
          "2026-06-01",
        toDate:
          "2026-06-02",
        status:
          "Pending"
      },
      {
        id: 2,
        employee:
          "Ravi",
        leaveType: "SL",
        fromDate:
          "2026-06-05",
        toDate:
          "2026-06-05",
        status:
          "Approved"
      },
      {
        id: 3,
        employee:
          "Suresh",
        leaveType: "EL",
        fromDate:
          "2026-06-10",
        toDate:
          "2026-06-15",
        status:
          "Rejected"
      }
    ]);

  const handleAction =
    (
      request,
      action
    ) => {

      setSelectedRequest(
        request
      );

      setActionType(
        action
      );

      setOpenRemark(true);
    };

  const handleRemarkSubmit =
    (remark) => {

      setRequests(
        requests.map(
          (item) =>
            item.id ===
            selectedRequest.id
              ? {
                  ...item,
                  status:
                    actionType,
                  remark
                }
              : item
        )
      );
    };

  const filteredData =
    requests.filter(
      (item) => {

        const searchMatch =
          item.employee
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const statusMatch =
          !statusFilter ||
          item.status ===
            statusFilter;

        return (
          searchMatch &&
          statusMatch
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

  return (
    <Paper sx={{ p: 3 }}>

      <PageHeader
        title="Leave Requests"
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
          value={
            statusFilter
          }
          sx={{
            minWidth: 180
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

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Employee
              </TableCell>

              <TableCell>
                Leave Type
              </TableCell>

              <TableCell>
                From Date
              </TableCell>

              <TableCell>
                To Date
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
                    {item.leaveType}
                  </TableCell>

                  <TableCell>
                    {item.fromDate}
                  </TableCell>

                  <TableCell>
                    {item.toDate}
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

      <LeaveRequestRemarkDialog
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

export default LeaveRequests;