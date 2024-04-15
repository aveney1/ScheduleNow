import axios from "axios";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { DateField } from "@mui/x-date-pickers/DateField";
import { FormControl } from "@mui/base/FormControl";
import {Select, MenuItem} from "@mui/material/"

const AppointmentPage = () => {
  const localHost = "http://localhost:8800";

  const { id } = useParams();
  const [appt, setAppt] = useState({
    id: "",
    date: "",
    startTime: "",
    endTime: "",
    customerId: "",
    employeeId: "",
    status: "",
  });
  const [customers, setCustomers] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 45 },
    {
      field: "Name",
      headerName: "Customer",
      sortable: true,
      width: 120,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      width: 120,
    },
    {
      field: "address",
      headerName: "Address",
      sortable: false,
      width: 250,
      valueGetter: (value, row) =>
        `${row.street || ""} ${row.city || ""} ${row.state || ""}`,
    },
  ];

  const rows = customers.map((row) => {
    return {
      city: row.city,
      email: row.email,
      firstName: row.firstName,
      id: row.id,
      lastName: row.lastName,
      state: row.state,
      street: row.street,
    };
  });

  const navigate = useNavigate()
  // Gets appointment details from DB
  // Change data types from String to Date
  useEffect(() => {
    const fetchApptDetails = async () => {
      try {
        const res1 = await axios.get(localHost + "/appointments/" + id);
        const apptCustomerId = res1.data[0].customerId;
        const res2 = await axios.get(localHost + "/customers/");
        console.log("useEffect triggered");

        setAppt(res1.data[0]);
        setCustomers(res2.data);
        setRowSelectionModel(apptCustomerId);
      } catch (err) {
        console.log("Error retrieving appointment details: " + err);
      }
    };
    fetchApptDetails();
  }, []);

  const handleChange = (id, e) => {
    //console.log("handleChange triggered =>");
    //console.log("id: " + id + " e: " + e) 
    //console.log(appt)
    
    setAppt((prev) => ({ ...prev, [id]: e }));
    console.log("After set: ")
    console.log(appt)
  };

  const handleSubmit = async (e) => {
      e.preventDefault()
      appt.date = appt.date.substring(0,10)
      console.log("In submit: ")
      console.log(appt.date)
      
     //const errors = validateForm(appt)
      //Object.keys(errors).length === 0
      //console.log(errors)
      // return
      try{
        const res = await axios.put(localHost+"/appointments/"+id, appt)
        console.log("res")
        console.log(res)
        //navigate("/home")
      }catch(err){
        console.log(err)
      }
  }


  const validateForm = (appt) => {
    const errors = {};

    if (!appt.date){
      errors.date = "Date is required"
    }
    if(!appt.startTime){
      errors.startTime = "Start Time is required"
    }
    if(!appt.endTime){
      errors.endTime = "End Time is required"
    }
    if(!appt.customerId){
      errors.customerId = "Customer is required"
    }
    if(!appt.employeeId){
      errors.employeeId = "Employee is required"
    }
    if(appt.date === "Invalid Date"){
      errors.date = "Invalid Date"
    }
    if(appt.startTime === "Invalid Date"){
      errors.startTime = "Invalid Start Time"
    }
    if(appt.endTime === "Invalid Date"){
      errors.endTime = "Invalid End Time"
    }

    // Check if username is empty
    // if (
    //   appt.date && 
    //   appt.customerId && 
    //   appt.employeeId && 
    //   appt.startTime &&
    //   appt.endTime) {
    //   errors.username = "Username is required";
    // }

    // Check if password is empty
    // if (!formData.password) {
    //   errors.password = "Password is required";
    // }

    // setFormData((prevState) => ({ ...prevState, errors }));

    // Return true if there are no errors
    // return Object.keys(errors).length === 0;
    return errors
  };
  return (
    <>
      <form id="form" onSubmit={(e)=>{
        handleSubmit(e)
        }}>
        <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
          <Paper elevation={3} sx={{ p: 3, minWidth: "60%" }}>
            <Box
              sx={{ pt: 3 }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h3" color="primary" gutterBottom>
                Appointment
              </Typography>
            </Box>

            <Grid container direction="row" alignItems="center" sx={{ p: 2 }}>
              <Grid
                item
                xs={12}
                md={8}
                lg={8}
                alignItems="center"
                sx={{ p: 3 }}
              >
                <Title>Customer</Title>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box sx={{ height: 350, width: "100%" }}>
                    <DataGrid
                    name=""
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      columnVisibilityModel={{
                        id: false,
                      }}
                      checkboxSelection
                      disableMultipleRowSelection={true}
                      onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                        handleChange("customerId",newRowSelectionModel[0])
                      }}
                      rowSelectionModel={rowSelectionModel}
                      pageSizeOptions={[5]}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                alignItems="center"
                sx={{ p: 3 }}
              >
                <Box>
                  <Title>Status</Title>
                  <Select 
                  name="status"
                  id="status"
                  onChange={(event) => {
                    //console.log("Status=>:"+event.target.value)
                    handleChange("status", event.target.value);
                  }}
                  value={appt.status} style={{ minWidth: 120 }}>
                    <MenuItem value="">Select Status</MenuItem>
                    {["scheduled", "completed", "cancelled"].map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormControl>
                    <TextField
                      name = "status"
                      onChange={handleChange}
                      id="status"
                      variant="filled"
                      value={appt.status}
                    />
                  </FormControl> */}
                  <FormControl required>
                    <Title>Date</Title>
                    <DateField
                      id="date"
                      name="date"
                      variant="outlined"
                      //format="YYYY-MM-DD"
                      onChange={(event) => {
                        handleChange("date", dayjs(event).format("YYYY-MM-DD"));
                      }}

                      value={dayjs(appt.date)}
                    />
                  </FormControl>
                  <Grid item sm={12} md={12} lg={12}>
                    <Title>Start Time</Title>
                    <TimeField
                    name="startTime"
                      id="startTime"
                      format="hh:mm a"
                      value={dayjs(appt.startTime, "HH:mm:ss")}
                      onChange={(event) => {
                        handleChange(
                          "startTime",
                          dayjs(event).format("HH:mm:ss")
                        );
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} md={12} lg={12}>
                    <Title>End Time</Title>
                    <TimeField
                    name="endTime"
                      id="endTime"
                      format="hh:mm a"
                      value={dayjs(appt.endTime, "HH:mm:ss")}
                      onChange={(event) => {
                        handleChange(
                          "endTime",
                          dayjs(event).format("HH:mm:ss")
                        );
                      }}
                    />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Box
              mt={3}
              mb={2}
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {/* <Link to="/home" style={{ textDecoration: "none" }}> */}
                <Button
                  // onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                  id="submitButton"
                >
                  Submit
                </Button>
                {/* </Link> */}
                <Link to="/home" style={{ textDecoration: "none" }}>
                  <Button variant="contained">Cancel</Button>
                </Link>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </form>
    </>
  );
};

export default AppointmentPage;
