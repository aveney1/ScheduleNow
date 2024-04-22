import React, { useEffect, useState } from "react";
import axios from "axios";
import {createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Title from "../components/Title";
import { PieChart } from "@mui/x-charts/PieChart";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import AppointmentTable from "../components/AppointmentTable";
import AvailabilityTable from "../components/AvailabilityTable";
import CRUDButtons from "../components/CRUDButtons";
import EmployeeTable from "../components/EmployeeTable";

const HomePage = () => {
  const localHost = "http://localhost:8800";
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isManager = currentUser.isManager;

  // ---- Employee appointments ----
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    const fetchAppointmentList = async () => {
      try {
        var res = "";
        if (!isManager) {
          res = await axios.get(
            localHost +
              "/employees/" +
              currentUser.employeeId +
              "/appointments/"
          );
        } else {
          res = await axios.get(localHost + "/appointments/");
        }
        setAppointmentList(res.data);
      } catch (err) {
        console.log("Error retrieving appointment list: ", err);
      }
    };
    fetchAppointmentList();
  }, []);

  // ---- Employee availability ----
  const [rowSelectionModelAvail, setRowSelectionModelAvail] = useState([]);
  //  Availability data
  const [availabilityList, setAvailabilityList] = useState([]);
  useEffect(() => {
    const fetchAvailabilityList = async () => {
      try {
        var res = "";
        if (!isManager) {
          res = await axios.get(
            localHost +
              "/employees/" +
              currentUser.employeeId +
              "/availability/"
          );
        } else {
          res = await axios.get(localHost + "/availability/");
        }
        setAvailabilityList(res.data);
      } catch (err) {
        console.log("Error retrieving availability list: ", err);
      }
    };
    fetchAvailabilityList();
  }, []);

  // // ---- Employee accounts ----
  const [rowSelectionModelAcct, setRowSelectionModelAcct] = useState([]);
  //  Account data
  const [accountList, setAccountList] = useState([]);

  if (isManager) {
    useEffect(() => {
      const fetchAccountList = async () => {
        try {
          const res = await axios.get(localHost + "/accounts/");
          setAccountList(res.data);
        } catch (err) {
          console.log("Error retrieving account list: ", err);
        }
      };
      fetchAccountList();
    }, [accountList]);
  }

  // Details of employees who have appointments and/or availability on lists
  const [employeeList, setEmployeeList] = useState([]);
  if (isManager) {
    useEffect(() => {
      const fetchEmpNames = async () => {
        var employeeNumbers = [];

        appointmentList.forEach((row) => {
          employeeNumbers.push(row.employeeId);
        });
        availabilityList.forEach((row) => {
          employeeNumbers.push(row.employeeId);
        });

        employeeNumbers = [...new Set(employeeNumbers)];

        var res = "";
        try {
          if (isManager) {
            res = await axios.get(
              localHost + "/employees/names/" + employeeNumbers
            );
            setEmployeeList(res.data);
          }
        } catch (err) {
          console.log("Error retrieving employee names: ", err);
        }
      };
      fetchEmpNames();
    }, [appointmentList]);
  }
  // Formatted employee names for appointment list display
  const getFormattedEmployeeName = (id) => {
    for (let i = 0; i < employeeList.length; i++) {
      const item = employeeList[i].id;
      if (employeeList[i].id === id) {
        return employeeList[i].firstName + " " + employeeList[i].lastName;
      }
    }
  };

  // ---- Graph and Data ----
  // Appt Completed vs Cancelled
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

  // Handle account enable/disable
  const handleAccountManagement = async (rowSelectionModelAcct, newStatus) => {
    const acctId = rowSelectionModelAcct[0];
    var currentStatus = null;

    if (acctId) {
      for (let i = 0; i < accountList.length; i++) {
        if (accountList[i].id == acctId) {
          currentStatus = accountList[i].isActive;
          break;
        }
      }

      if (currentStatus.length) {
        console.log("Error managing account. Status unavailable");
        return;
      }
      if (currentStatus == newStatus) {
        window.alert("The account already has that status");
        return;
      }
      if (window.confirm("Are you sure you wish to modify this account?")) {
        const changeAccountStatus = async () => {
          try {
            const res = await axios.put(
              localHost + "/accounts/" + acctId + "/" + newStatus
            );
          } catch (err) {
            console.log("Error changing account status: ", err);
          }
        };
        changeAccountStatus();
      }
    } else {
      //no account selected
      window.alert("An account must be selected");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleCallback = (childData) => {
    if (childData.name == "appointment") {
      setRowSelectionModel(childData.row);
    } else if (childData.name == "availability") {
      setRowSelectionModelAvail(childData.row);
    } else if (childData.name == "employee") {
      setRowSelectionModelAcct(childData.row);
    }
  };

  const handleDeleteCallback = (childData) => {
    const selectedRow = childData.row;
    const table = childData.name;
    if (table == "appointment") {
      setAppointmentList(
        appointmentList.filter((row) => row.id !== selectedRow)
      );
    } else if (table == "availability") {
      setAvailabilityList(
        availabilityList.filter((row) => row.id !== selectedRow)
      );
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar isManager={isManager} handleLogout={handleLogout} />
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
                  <Title>
                    Appointments{" "}
                    {currentUser.isManager ? " (All Employees)" : ""}
                  </Title>
                  <Box sx={{ height: 300, width: "100%" }}>
                    <AppointmentTable
                      list={appointmentList}
                      rowSelection={rowSelectionModel}
                      user={currentUser}
                      formatName={getFormattedEmployeeName}
                      rowReturnFunction={handleCallback}
                    />
                    <CRUDButtons
                      tableName={"appointment"}
                      isManager={isManager}
                      row={rowSelectionModel}
                      rowReturnFunction={handleDeleteCallback}
                    />
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
                  <Title>
                    Availability{" "}
                    {currentUser.isManager ? " (All Employees)" : ""}
                  </Title>
                  <Box sx={{ height: 300, width: "100%" }}>
                    <AvailabilityTable
                      list={availabilityList}
                      rowSelection={rowSelectionModelAvail}
                      user={currentUser}
                      formatName={getFormattedEmployeeName}
                      rowReturnFunction={handleCallback}
                    />
                    <CRUDButtons
                      tableName={"availability"}
                      isManager={isManager}
                      row={rowSelectionModelAvail}
                      rowReturnFunction={handleDeleteCallback}
                    />
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
              {/*************************** Employee Accounts  ************************** */}
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sx={{
                  visibility: isManager ? "visible" : "hidden",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // visibility: !isManager?  "visible":"hidden"
                  }}
                >
                  <Box>
                    <Title>Employee Accounts</Title>
                    <EmployeeTable
                      list={accountList}
                      rowSelection={rowSelectionModelAcct}
                      rowReturnFunction={handleCallback}
                    />
                    <Box>
                      <Box sx={{ p: 1 }}>
                        <Button
                          onClick={(event) => {
                            if (rowSelectionModelAcct.length) {
                              handleAccountManagement(rowSelectionModelAcct, 1);
                            } else {
                              window.alert("An account must be selected");
                            }
                          }}
                          sx={{
                            visibility: isManager ? "visible" : "hidden",
                          }}
                          variant="contained"
                        >
                          Enable
                        </Button>
                        <Button
                          onClick={(event) => {
                            if (rowSelectionModelAcct.length) {
                              handleAccountManagement(rowSelectionModelAcct, 0);
                            } else {
                              window.alert("An account must be selected");
                            }
                          }}
                          sx={{
                            visibility: isManager ? "visible" : "hidden",
                          }}
                          variant="contained"
                        >
                          Disable
                        </Button>
                      </Box>
                    </Box>
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
