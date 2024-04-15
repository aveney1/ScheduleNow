import { React, useEffect, useState } from "react";
import axios from "axios";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Title from "../components/Title";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
// import Tester from "../components/Tester";

const HomePage = () => {
  const NavBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }));

  const appointmentColumns = [
    { field: "id", headerName: "ID", width: 45 },
    {
      field: "date",
      headerName: "Date",
      width: 100,
      editable: true,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 100,
      editable: true,
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 100,
      editable: true,
    },
    {
      field: "employeeId",
      headerName: "EmployeeID",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
    },
    {
      field: "customerId",
      headerName: "CustomerId",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const rows = [
    {
      id: 1,
      Date: "01-01-2025",
      startTime: "08:00:00",
      endTime: "08:00:00",
      Customer: "John Doe",
      Employee: "Emp1",
    },
    {
      id: 2,
      Date: "01-01-2025",
      startTime: "08:00:00",
      endTime: "08:00:00",
      Customer: "John Doe",
      Employee: "Emp1",
    },
    {
      id: 3,
      Date: "01-01-2025",
      startTime: "08:00:00",
      endTime: "08:00:00",
      Customer: "John Doe",
      Employee: "Emp1",
    },
    {
      id: 4,
      Date: "01-01-2025",
      startTime: "08:00:00",
      endTime: "08:00:00",
      Customer: "John Doe",
      Employee: "Emp1",
    },
    {
      id: 5,
      Date: "01-01-2025",
      startTime: "08:00:00",
      endTime: "08:00:00",
      Customer: "John Doe",
      Employee: "Emp1",
    },
  ];

  //availability table
  const columns2 = [
    { field: "id", headerName: "ID", width: 1 },
    {
      field: "Day",
      headerName: "Day",
      width: 100,
      editable: true,
    },
    {
      field: "start",
      headerName: "Start Time",
      width: 100,
      editable: true,
    },
    {
      field: "end",
      headerName: "End Time",
      width: 100,
      editable: true,
    },
  ];

  const rows2 = [
    { id: 1, Day: "Monday", start: "08:00:00", end: "08:00:00" },
    { id: 2, Day: "Tuesday", start: "08:00:00", end: "08:00:00" },
    { id: 3, Day: "Wednesday", start: "08:00:00", end: "08:00:00" },
    { id: 4, Day: "Thursday", start: "08:00:00", end: "08:00:00" },
    { id: 5, Day: "Friday", start: "08:00:00", end: "08:00:00" },
    { id: 6, Day: "Saturday", start: "08:00:00", end: "08:00:00" },
    { id: 7, Day: "Sunday", start: "08:00:00", end: "08:00:00" },
  ];
  const rows3 = [
    { id: 1, Day: "Monday", start: "08:00:00", end: "08:00:00" },
    { id: 2, Day: "Tuesday", start: "08:00:00", end: "08:00:00" },
    { id: 3, Day: "Wednesday", start: "08:00:00", end: "08:00:00" },
    { id: 4, Day: "Thursday", start: "08:00:00", end: "08:00:00" },
    { id: 5, Day: "Friday", start: "08:00:00", end: "08:00:00" },
    { id: 6, Day: "Saturday", start: "08:00:00", end: "08:00:00" },
    { id: 7, Day: "Sunday", start: "08:00:00", end: "08:00:00" },
  ];
  const columns3 = [
    { field: "id", headerName: "ID", width: 1 },
    {
      field: "day",
      headerName: "Day",
      width: 100,
      editable: true,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 100,
      editable: true,
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 100,
      editable: true,
    },
    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 100,
      editable: true,
    },
  ];

  const defaultTheme = createTheme();

  const localHost = "http://localhost:8800";

  //Get availability for all employees
  const [availabilityList, setAvailabilityList] = useState([]);
  useEffect(() => {
    const fetchAvailabilityList = async () => {
      try {
        const res = await axios.get(localHost + "/availability/");
        console.log(res);
        setAvailabilityList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAvailabilityList();
  }, []);

  //Get appointments for all employees
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    const fetchAppointmentList = async () => {
      try {
        const res = await axios.get(localHost + "/appointments/");
        console.log(res);
        setAppointmentList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAppointmentList();
  }, []);


  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar position="absolute">
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              ScheduleNow
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button href="/password" variant="contained" color="secondary">
                Change Password
              </Button>
              <Button href="/" variant="contained" color="secondary">
                Logout
              </Button>
            </Stack>
          </Toolbar>
        </NavBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/************************** Appointment List **************************/}
              <Grid item xs={12} md={7} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 475,
                  }}
                >
                  <Title>Appointments</Title>
                  <Box sx={{ height: 300, width: "100%" }}>
                    <DataGrid
                      rows={appointmentList}
                      editMode="row"
                      disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      columns={appointmentColumns}
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                        },
                      }}
                      onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                      }}
                    />
                    <div>
                      {rowSelectionModel}
                    </div>
                    <Box sx={{ p: 2 }}>
                      <Link to="/appointment" style={{ textDecoration: "none" }}>
                      <Button variant="contained">
                        Add
                      </Button>
                      </Link>
                      <Link to={`/appointment/${rowSelectionModel}`} style={{ textDecoration: "none" }}>
                      <Button variant="contained">
                        Edit
                      </Button>
                      </Link>
                      <Button variant="contained">Delete</Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              {/***************************  Availability List ************************** */}
              <Grid item xs={12} md={5} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 475,
                  }}
                >
                  <Title>Availability</Title>
                  <Box sx={{ height: 300, width: "100%" }}>
                    <DataGrid
                      rows={availabilityList}
                      columns={columns3}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 7,
                          },
                        },
                      }}
                      pageSizeOptions={[7]}
                      // checkboxSelection
                      // disableRowSelectionOnClick
                    />

                    <Box sx={{ p: 1 }}>
                      <Button href="/availability" variant="contained">
                        Add
                      </Button>
                      <Button href="/availability" variant="contained">
                        Edit
                      </Button>
                      <Button variant="contained">Delete</Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              {/*************************** Graph #1  ************************** */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Title>Appointments: Cancelled vs Completed 1</Title>
                  <Box>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: 10, label: "series A" },
                            { id: 1, value: 15, label: "series B" },
                            { id: 2, value: 20, label: "series C" },
                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                      // slotProps={{
                      //   legend: { hidden: true },
                      // }}
                    />
                  </Box>
                </Paper>
              </Grid>
              {/*************************** Graph #1  ************************** */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <Title>Appointments: Cancelled vs Completed 2</Title>

                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: 10, label: "series A" },
                            { id: 1, value: 15, label: "series B" },
                            { id: 2, value: 20, label: "series C" },
                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
