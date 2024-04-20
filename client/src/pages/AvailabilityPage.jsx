import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";

const AvailabilityPage = () => {
  const localHost = "http://localhost:8800";
  var { id } = useParams();
  id = Object(id).length ? id : 0;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate()
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [formErrors, setFormErrors] = useState([]);
  
  
  const [avail, setAvail] = useState({ day: "", employeeId: currentUser.employeeId});

  const validateForm = async (avail) => {
    const errors = {};

    if (!avail.day || avail.day === "") {
      errors.day = "Day is required";
    }
    
    if (!avail.startTime) {
      errors.startTime = "Start Time is required";
    }
    if (!avail.endTime) {
      errors.endTime = "End Time is required";
    }
    const date1 = new Date(`2000-01-01T${avail.startTime}`);
    const date2 = new Date(`2000-01-01T${avail.endTime}`);

    // Compare getTime() values
    if (date1.getTime() > date2.getTime()) {
      errors.startTime = "Start Time must be before End Time";
    } else if (date1.getTime() < date2.getTime()) {
      //valid
    } else {
      errors.startTime = "Start Time cannot be the same as End Time";
    }
    
    setFormErrors(errors);
    return errors;
  };

  var result = Object.keys(formErrors).map((key) => [formErrors[key]]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var errorList = await validateForm(avail);

    if (!Object.keys(errorList).length) {
      try {
        console.log("Avail in handleSubmit: ",avail);
        var res = "";
        if (id) {
          res = await axios.put(localHost + "/availability/" + id, avail);
        } else {
          res = await axios.post(localHost + "/availability/", avail);
        }
        // console.log("res");
        // console.log(res);
        navigate("/home")
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (id, e) => {
    setAvail((prev) => ({ ...prev, [id]: e }));
  };

  useEffect(() => {
    const fetchAvailDetails = async () => {
      if (id) {
        try {
          const res = await axios.get(localHost + "/availability/" + id);
          setAvail(res.data[0]);
        } catch (err) {
          console.log("Error retrieving availability details: " + err);
        }
      }
    };
    fetchAvailDetails();
  }, []);

  return (
    <>
    <form
    id="form"
    onSubmit={(e) => {
      handleSubmit(e);
    }}
    >
      <Grid container justifyContent="center" alignItems="center" sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }} style={{ width: "550px" }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" color="primary" gutterBottom>
              Availability
            </Typography>
            <div>
              {result.length > 0 && (
                <ul>
                  {result.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          </Box>
          <Grid item flexDirection="row" sm={12} md={12} lg={12}>
            <Title>Day</Title>
            <Select
              name="day"
              id="day"
              value={avail.day}
              style={{ minWidth: 120 }}
              onChange={(event) => {
                handleChange("day", event.target.value);
              }}
            >
              <MenuItem value="">Select Day</MenuItem>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item sm={12} md={12} lg={12}>
            <Title>Start</Title>
            <TimeField
              name="startTime"
              id="startTime"
              format="hh:mm a"
              value={dayjs(avail.startTime, "HH:mm:ss")}
              onChange={(event) => {
                handleChange("startTime", dayjs(event).format("HH:mm:ss"));
              }}
            />
          </Grid>
          <Grid item sm={12} md={12} lg={12}>
            <Title>End</Title>
            <TimeField
              name="endTime"
              id="endTime"
              format="hh:mm a"
              value={dayjs(avail.endTime, "HH:mm:ss")}
              onChange={(event) => {
                handleChange("endTime", dayjs(event).format("HH:mm:ss"));
              }}
            />
          </Grid>
          <Box
            mt={5}
            mb={2}
            display="flex"
            justifyContent="center"
            width="100%"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {/* <Link to="/home" style={{ textDecoration: "none" }}>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
                
              </Link> */}
              <Button type="submit" variant="contained" id="submitButton">
                  Submit
                </Button>
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

export default AvailabilityPage;
