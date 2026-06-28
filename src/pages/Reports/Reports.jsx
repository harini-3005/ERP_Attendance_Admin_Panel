import { useState } from "react";

import {
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Box
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import PageHeader from "../../components/common/PageHeader";

function Reports() {
  const [reportType, setReportType] =
    useState("attendance");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const reportData = {
    attendance: [
      {
        employee: "Harini",
        presentDays: 25,
        absentDays: 2
      },
      {
        employee: "Ravi",
        presentDays: 23,
        absentDays: 4
      }
    ],

    leave: [
      {
        employee: "Harini",
        leaveType: "CL",
        days: 2
      },
      {
        employee: "Ravi",
        leaveType: "SL",
        days: 1
      }
    ],

    late: [
      {
        employee: "Harini",
        lateCount: 2
      },
      {
        employee: "Ravi",
        lateCount: 5
      }
    ]
  };

  const exportCSV = () => {
    const data =
      reportData[reportType];

    const headers =
      Object.keys(data[0]);

    const rows =
      data.map((item) =>
        headers.map(
          (header) =>
            item[header]
        )
      );

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
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
      `${reportType}-report.csv`;

    link.click();
  };

  return (
    <Paper
      sx={{
        p: 5,
        width: "100%"
      }}
    >
      <PageHeader
        title="Reports Dashboard"
      />

      {/* Summary Cards */}

      <Grid
        container
        spacing={3}
        sx={{ mb: 5 }}
      >
        <Grid
          item
          xs={12}
          md={4}
        >
          <Card
            sx={{
              height: 140,
              display: "flex",
              alignItems:
                "center"
            }}
          >
            <CardContent>
              <Typography variant="h6">
                Total Employees
              </Typography>

              <Typography
                variant="h3"
                color="primary"
                fontWeight="bold"
              >
                120
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
        >
          <Card
            sx={{
              height: 140,
              display: "flex",
              alignItems:
                "center"
            }}
          >
            <CardContent>
              <Typography variant="h6">
                Total Leaves
              </Typography>

              <Typography
                variant="h3"
                color="error"
                fontWeight="bold"
              >
                32
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
        >
          <Card
            sx={{
              height: 140,
              display: "flex",
              alignItems:
                "center"
            }}
          >
            <CardContent>
              <Typography variant="h6">
                Late Comers
              </Typography>

              <Typography
                variant="h3"
                color="warning.main"
                fontWeight="bold"
              >
                15
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}

      <Stack
        direction={{
          xs: "column",
          xl: "row"
        }}
        spacing={3}
        alignItems="center"
        sx={{
          mb: 5
        }}
      >
        <TextField
          select
          size="small"
          label="Report Type"
          value={reportType}
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            minWidth: 250
          }}
          onChange={(e) =>
            setReportType(
              e.target.value
            )
          }
        >
          <MenuItem value="attendance">
            Attendance Report
          </MenuItem>

          <MenuItem value="leave">
            Leave Report
          </MenuItem>

          <MenuItem value="late">
            Late Comers Report
          </MenuItem>
        </TextField>

        <Box>
          <Typography
            variant="body2"
            mb={0.5}
          >
            From Date
          </Typography>

          <TextField
            type="date"
            size="small"
            sx={{
              minWidth: 190
            }}
            value={fromDate}
            onChange={(e) =>
              setFromDate(
                e.target.value
              )
            }
          />
        </Box>

        <Box>
          <Typography
            variant="body2"
            mb={0.5}
          >
            To Date
          </Typography>

          <TextField
            type="date"
            size="small"
            sx={{
              minWidth: 190
            }}
            value={toDate}
            onChange={(e) =>
              setToDate(
                e.target.value
              )
            }
          />
        </Box>

        <Button
          variant="contained"
          startIcon={
            <DownloadIcon />
          }
          onClick={exportCSV}
          sx={{
            minWidth: 180,
            height: 40,
            whiteSpace:
              "nowrap"
          }}
        >
          Export CSV
        </Button>
      </Stack>

      {/* Report Table */}

      <TableContainer
        sx={{
          mt: 2
        }}
      >
        <Table>

          <TableHead>
            <TableRow>
              {Object.keys(
                reportData[
                  reportType
                ][0]
              ).map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight:
                        "bold"
                    }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {reportData[
              reportType
            ].map(
              (
                row,
                index
              ) => (
                <TableRow
                  key={index}
                >
                  {Object.values(
                    row
                  ).map(
                    (
                      value,
                      i
                    ) => (
                      <TableCell
                        key={i}
                      >
                        {value}
                      </TableCell>
                    )
                  )}
                </TableRow>
              )
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Reports;