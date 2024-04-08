import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { Button, TextField, Select, MenuItem} from "@mui/material";
import Typography from '@mui/material/Typography';


const AppointmentPage = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 45 },

    {
      field: "Customer",
      headerName: "Customer",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "Email",
      headerName: "Email",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "Address",
      headerName: "Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "A",
      headerName: "A",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "Ad",
      headerName: "Ad",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const rows = [
    {
      id: 1,
      Customer: "John Doe",
      Email: "jd@email.com",
      Address: "123 Main",
      A: "city",
      Ad: "NY",
    },
    {
      id: 2,
      Customer: "John Doe",
      Email: "jd@email.com",
      Address: "123 Main",
      A: "city",
      Ad: "NY",
    },
    {
      id: 3,
      Customer: "John Doe",
      Email: "jd@email.com",
      Address: "123 Main",
      A: "city",
      Ad: "NY",
    },
  ];
  // Start
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedMeridiem, setSelectedMeridiem] = useState("");
  // End
  const [selectedEndHour, setSelectedEndHour] = useState("");
  const [selectedEndMinute, setSelectedEndMinute] = useState("");
  const [selectedEndMeridiem, setSelectedEndMeridiem] = useState("");

  const handleSubmit = (event) => {
    // Handle form submission
    console.log("Submit has been clicked in appts");
  };
  return (
    <>
      <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ pt: 3}} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" color="primary" gutterBottom >Appointment</Typography>
          </Box>
          <Grid container direction="row" alignItems="center" sx={{ p: 2 }}>
            <Grid item xs={12} md={6} lg={6} alignItems="center" sx={{ p: 3 }}>
              <Title>Customer</Title>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box sx={{ height: 350, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6} alignItems="center" sx={{ p: 3 }}>
              <Box>
                <Title>Employee</Title>
                <TextField
                  disabled
                  id="filled-disabled"
                  defaultValue="Current Employee"
                  variant="filled"
                />
                <Title>Date</Title>
                <TextField
                  id="outlined-basic"
                  label="YYYY-MM-DD"
                  variant="outlined"
                />
                
                <Grid item sm={12} md={12} lg={12}>
                  <Title>Start</Title>
                  {/* Hour */}
                  <Select value={selectedHour} style={{ minWidth: 120 }}>
                    <MenuItem value="">Select Hour</MenuItem>
                    {Array.from(Array(12).keys()).map((hour) => (
                      <MenuItem key={hour + 1} value={hour + 1}>
                        {hour + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* Minute */}
                  <Select value={selectedMinute} style={{ minWidth: 120 }}>
                    <MenuItem value="">Select Minute</MenuItem>
                    {["00", "15", "30", "45"].map((minute) => (
                      <MenuItem key={minute} value={minute}>
                        {minute}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* AM/PM */}
                  <Select value={selectedMeridiem} style={{ minWidth: 120 }}>
                    <MenuItem value="">Select</MenuItem>
                    {["AM", "PM"].map((meridiem) => (
                      <MenuItem key={meridiem} value={meridiem}>
                        {meridiem}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item sm={12} md={12} lg={12}>
                  <Title>End</Title>

                  {/* Hour */}
                  <Select value={selectedEndHour} style={{ minWidth: 120 }}>
                    <MenuItem value="">Select Hour</MenuItem>
                    {Array.from(Array(12).keys()).map((hour) => (
                      <MenuItem key={hour + 1} value={hour + 1}>
                        {hour + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* Minute */}
                  <Select value={selectedEndMinute} style={{ minWidth: 120 }}>
                    <MenuItem value="">Select Minute</MenuItem>
                    {["00", "15", "30", "45"].map((minute) => (
                      <MenuItem key={minute} value={minute}>
                        {minute}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* AM/PM */}
                  <Select value={selectedEndMeridiem} style={{ minWidth: 120 }}>
                    <MenuItem value="">Select</MenuItem>
                    {["AM", "PM"].map((meridiem) => (
                      <MenuItem key={meridiem} value={meridiem}>
                        {meridiem}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3} mb={2} display="flex" justifyContent="center" width="100%">
            <Stack direction="row" spacing={2} alignItems="center">
              <Link to="/home" style={{ textDecoration: "none" }}>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </Link>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <Button variant="contained">Cancel</Button>
              </Link>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default AppointmentPage;
