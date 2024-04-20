import React, {useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const HomePage = () => {
  const localHost = "http://localhost:8800";

  const navigate = useNavigate();

  const NavBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }));

  const defaultTheme = createTheme();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log("local storage current user: ", currentUser);

  const isManager = currentUser.isManager;

  const appointmentColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 45,
    },
    {
      field: "date",
      headerName: "Date",
      width: 100,
      editable: true,
      valueFormatter: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 100,
      editable: true,
      valueFormatter: (value)=> dayjs("2000-01-01 "+value).format("h:mm a")
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 100,
      editable: true,
      valueFormatter: (value)=> dayjs("2000-01-01 "+value).format("h:mm a")
    },
    {
      field: "employeeId",
      headerName: "Employee",
      sortable: false,
      width: 120,
      valueGetter: (value)=> {
        if(value === currentUser.employeeId){
          return (currentUser.firstName + " " + currentUser.lastName)
        }else{
           return getEmployeeName(value);
        }
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
    },
  ];

  
  // Get employee appointments
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    const fetchAppointmentList = async () => {
      try {
        if (!isManager) {
          const res = await axios.get(
            localHost +
              "/employees/" +
              currentUser.employeeId +
              "/appointments/"
          );
          setAppointmentList(res.data);
        } else {
          const res = await axios.get(localHost + "/appointments/");
          setAppointmentList(res.data);
        }
      } catch (err) {
        console.log("Error retrieving appointment list: ", err);
      }
    };
    fetchAppointmentList();
  }, []);

  const availabilityColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 1,
    },
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
      valueFormatter: (value)=> dayjs("2000-01-01 "+value).format("h:mm a")

    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 100,
      editable: true,
      valueFormatter: (value)=> dayjs("2000-01-01 "+value).format("h:mm a")
    },
    {
      field: "employeeId",
      headerName: "Employee",
      sortable: false,
      width: 120,
        valueGetter: (value)=> {
          if(value === currentUser.employeeId){
            return (currentUser.firstName + " " + currentUser.lastName)
          }else{
             return getEmployeeName(value);
          }
        }
      },
  ];

  // Get employee availability
  const [availabilityList, setAvailabilityList] = useState([]);
  useEffect(() => {
    const fetchAvailabilityList = async () => {
      try {
        if (!isManager) {
          const res = await axios.get(
            localHost +
              "/employees/" +
              currentUser.employeeId +
              "/availability/"
          );
          setAvailabilityList(res.data);
        } else {
          const res = await axios.get(localHost + "/availability/");
          setAvailabilityList(res.data);
        }
      } catch (err) {
        console.log("Error retrieving availability list: ", err);
      }
    };
    fetchAvailabilityList();
  }, []);

  const [employeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    if (!isManager) {
      return;
    }
    const fetchEmpNames = async () => {
    var employeeNumbers = []

    appointmentList.forEach((row)=>{
      employeeNumbers.push(row.employeeId)
    })

    employeeNumbers = [...new Set(employeeNumbers)];

    var res = ""
      try {
        if (isManager) {
          res = await axios.get(
            localHost +
              "/employees/names/" +
              employeeNumbers
          );
          setEmployeeList(res.data);
        }
      } catch (err) {
        console.log("Error retrieving employee names: ", err);
      }
  }
  fetchEmpNames();
  },[appointmentList])

  const getEmployeeName = (id)=>{
    for (let i = 0; i < employeeList.length; i++) {
      const item = employeeList[i].id
      if(employeeList[i].id === id){
        return employeeList[i].firstName + " " + employeeList[i].lastName
      }
    }
  }
  
  
  // Get graph data - Appt Completed vs Cancelled
  const [graph1Count, setGraph1Count] = useState([]);
  useEffect(() => {
    const fetchGraph1Data = async () => {
      try {
        let completedCount = 0;
        let cancelledCount = 0;
        appointmentList.forEach((appt) => {
          if (appt.status === "completed") {
            completedCount = completedCount + 1;
          } else if (appt.status === "cancelled") {
            cancelledCount = cancelledCount + 1;
          }
        });
        setGraph1Count({
          completed: completedCount,
          cancelled: cancelledCount,
        });
      } catch (err) {
        console.log("Error calculating graph data: ", err);
      }
    };
    fetchGraph1Data();
  }, [appointmentList]);

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [rowSelectionModelAvail, setRowSelectionModelAvail] = useState([]);

  const handleDelete = async (rowSelectionModel, event) => {
    const apptId = rowSelectionModel[0];
    if (rowSelectionModel) {
      if (window.confirm("Are you sure you wish to delete this appointment?")) {
        const res = await axios.delete(localHost + "/appointments/" + apptId);
        setAppointmentList(appointmentList.filter((row) => row.id !== apptId));
      }
    }
  };

  const handleDeleteAvail = async (rowSelectionModel, event) => {
    const availId = rowSelectionModel[0];
    if (rowSelectionModel) {
      if (
        window.confirm("Are you sure you wish to delete this availability?")
      ) {
        const res = await axios.delete(localHost + "/availability/" + availId);
        setAvailabilityList(
          availabilityList.filter((row) => row.id !== availId)
        );
      }
    }
  };
  const [rowSelectionModelAcct, setRowSelectionModelAcct] = useState([]);
  const accountColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 1,
    },
    {
      field: "username",
      headerName: "Username",
      width: 100,
      editable: true,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 100,
      editable: true,
      valueGetter: (value)=> {
       return value? "Enabled":"Disabled"
      }
    
    },
    
  ];

  // Get employee availability
  const [accountList, setAccountList] = useState([]);

  if (isManager) {
  useEffect(() => {
    const fetchAccountList = async () => {
      try {
          const res = await axios.get(
            localHost +
              "/accounts/"   
          );

          setAccountList(res.data);
        
      } catch (err) {
        console.log("Error retrieving account list: ", err);
      }
    };
    fetchAccountList();
  }, []);
  }


  // const handleAccountManagement = async (action, rowSelectionModelAcct, event) => {
  //   const acctId = rowSelectionModelAcct[0];

    // if (acctId) {
    //     for (let i = 0; i < accountList.length; i++) {
    //       var currentStatus = accountList[i].isActive

    //     }
    //         return employeeList[i].firstName + " " + employeeList[i].lastName
    //       }
    //     }
    //   }

      // if (
      //   window.confirm("Are you sure you wish to "+ action +" this availability?")
      // ) {
        
      //   const res = await axios.put(localHost + "/accounts/" + acctId +"/"+action);
      //   // setAvailabilityList(
      //   //   availabilityList.filter((row) => row.id !== availId)
      //   // );
      // }
    


console.log("accountlist: ",accountList)
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
              ScheduleNow{" "}
              {currentUser.isManager ? " - Admin Portal" : " - Employee Portal"}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => {
                  console.log("< = Logout Button Clicked = >");
                  localStorage.removeItem("currentUser");
                  navigate("/");
                }}
                variant="contained"
                color="secondary"
              >
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
              <Grid item xs={12} md={12} lg={12}>
                <Title>
                  Hello {currentUser.firstName} {currentUser.lastName},
                </Title>
              </Grid>
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
                  <Title>Appointments {currentUser.isManager ? " (All Employees)":""}</Title>
                  <Box sx={{ height: 300, width: "100%" }}>
                    <DataGrid
                      checkboxSelection
                      disableMultipleRowSelection={true}
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
                      columnVisibilityModel={{
                        id: false,
                      }}
                    />
                    <div>{rowSelectionModel}</div>
                    <Box sx={{ p: 2 }}>
                      {/* <Link to="/appointment" style={{ textDecoration: "none" }} > */}
                        <Button onClick={(event)=>{
                          navigate("/appointment/");
                        }}  sx={{visibility: !{currentUser}.isManager? "hidden":"visible" }} variant="contained">Add</Button>
                      {/* </Link> */}
                      <Button
                        onClick={(event) => {
                          console.log("rowselect: ", rowSelectionModel);
                          console.log("length: ", rowSelectionModel.length);
                          if (rowSelectionModel.length) {
                            handleDelete(rowSelectionModel, event);
                            navigate(`/appointment/${rowSelectionModel}`);
                          } else {
                            window.alert("An appointment must be selected");
                          }
                        }}
                        sx={{visibility: !{currentUser}.isManager? "hidden":"visible" }} 
                        variant="contained"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={(event) => {
                          console.log("rowselect: ", rowSelectionModel);
                          console.log("length: ", rowSelectionModel.length);
                          if (rowSelectionModel.length) {
                            handleDelete(rowSelectionModel, event);
                          } else {
                            window.alert("An appointment must be selected");
                          }
                        }}
                        sx={{visibility: !{currentUser}.isManager? "hidden":"visible" }} 
                        variant="contained"
                      >
                        Delete
                      </Button>
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
                  <Title>Availability {currentUser.isManager ? " (All Employees)":""}</Title>
                  <Box sx={{ height: 300, width: "100%" }}>
                    <DataGrid
                      rows={availabilityList}
                      columns={availabilityColumns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                        },
                      }}
                      onRowSelectionModelChange={(
                        newRowSelectionModelAvail
                      ) => {
                        setRowSelectionModelAvail(newRowSelectionModelAvail);
                      }}
                      disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      checkboxSelection
                      disableMultipleRowSelection={true}
                      columnVisibilityModel={{
                        id: false,
                      }}
                    />
                    <Box sx={{ p: 1 }}>
                      <Button
                        onClick={(event) => {
                          navigate("/availability");
                        }}
                        sx={{visibility: !{currentUser}.isManager? "hidden":"visible" }} 
                        variant="contained"
                      >
                        Add
                      </Button>
                      <Button
                        onClick={(event) => {
                          console.log("rowselect: ", rowSelectionModelAvail);
                          console.log(
                            "length: ",
                            rowSelectionModelAvail.length
                          );
                          if (rowSelectionModelAvail.length) {
                            navigate(`/availability/${rowSelectionModelAvail}`);
                          } else {
                            window.alert("An availability must be selected");
                          }
                        }}
                        sx={{visibility: !{currentUser}.isManager? "hidden":"visible" }} 
                        variant="contained"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={(event) => {
                          console.log("rowselect: ", rowSelectionModelAvail);
                          console.log(
                            "length: ",
                            rowSelectionModelAvail.length
                          );
                          if (rowSelectionModelAvail.length) {
                            handleDeleteAvail(rowSelectionModelAvail, event);
                          } else {
                            window.alert("An availability must be selected");
                          }
                        }}
                        sx={{visibility: !{currentUser}.isManager? "hidden":"visible" }} 
                        variant="contained"
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              {/*************************** Employee Accounts  ************************** */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                  }}
                >
                  <Box>
                    <Title>Employee Accounts</Title>
                    <Box sx={{ width: "100%" }}>
                    <DataGrid
                      rows={accountList}
                      columns={accountColumns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                        },
                      }}
                      onRowSelectionModelChange={(
                        newRowSelectionModelAcct
                      ) => {
                        console.log("new selection: ",newRowSelectionModelAcct)
                        setRowSelectionModelAcct(newRowSelectionModelAcct);
                      }}
                      disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      checkboxSelection
                      disableMultipleRowSelection={true}
                      // columnVisibilityModel={{
                      //   id: false,
                      // }}
                    />
                    <Box sx={{ p: 1 }}>
                      <Button
                        onClick={(event) => {
                          console.log(event)
                          if (rowSelectionModelAcct.length) {
                            handleAccountManagement("enable", rowSelectionModelAcct)
                          } else {
                            window.alert("An account must be selected");
                          }
                        }}
                        sx={{visibility: {currentUser}.isManager? "hidden":"visible" }} 
                        variant="contained"
                      >
                        Enable
                      </Button>
                      <Button
                        onClick={(event) => {
                          if (rowSelectionModelAcct.length) {
                            handleAccountManagement("disable")
                          } else {
                            window.alert("An account must be selected");
                          }
                        }}
                        sx={{visibility: {currentUser}.isManager? "hidden":"visible" }} 
                        variant="contained"
                      >
                        Disable
                      </Button>
                    </Box>
                  </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box>
                  {/*************************** Graph #1  ************************** */}
                    <Title>Appointments: Completed vs Cancelled</Title>
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: graph1Count.completed,
                              word: "completed",
                              label: "Completed: " + graph1Count.completed,
                            },
                            {
                              id: 1,
                              value: graph1Count.cancelled,
                              word: "completed",
                              label: "Cancelled: " + graph1Count.cancelled,
                            },
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
