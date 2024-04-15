import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import Typography from '@mui/material/Typography';
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";
import { useParams, useNavigate} from "react-router-dom";


const AvailabilityPage = () => {
  const localHost = "http://localhost:8800";
  const { id } = useParams();

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [avail, setAvail] = useState({
    id: "",
    day: "",
    startTime: "",
    endTime: "",
    employeeId: "",
  });
  
  const validateForm = (avail) => {
    const errors = {};

    if (!avail.day){
      errors.day = "Day is required"
    }
    if (avail.day===""){
      errors.day = "Day is required"
    }
    if(!avail.startTime){
      errors.startTime = "Start Time is required"
    }
    if(!avail.endTime){
      errors.endTime = "End Time is required"
    }
    return errors;
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("In submit: =>")
    const errors = validateForm(avail);
    console.log(errors)
    console.log(avail)
    
    //Object.keys(errors).length === 0
    //console.log(errors)
    return
    try{
      const res = await axios.put(localHost+"/availability/"+id, avail)
      console.log("res")
      console.log(res)
      //navigate("/home")
    }catch(err){
      console.log(err)
    }
}

const handleChange = (id, e) => {
  console.log("handleChange triggered =>");
  //console.log("id: " + id + " e: " + e) 
  console.log(avail)
  setAvail((prev) => ({ ...prev, [id]: e }));
  console.log("after=>")
  console.log(avail)
};

useEffect(() => {
  const fetchAvailDetails = async () => {
    try {
      const res = await axios.get(localHost + "/availability/" + id);
      console.log("useEffect triggered");
      //console.log(res.data[0].day)
      setAvail(res.data[0]);
    } catch (err) {
      console.log("Error retrieving availability details: " + err);
    }
  };
  fetchAvailDetails();
}, []);
 


  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ p: 3 }}>
        
        <Paper elevation={3} sx={{ p: 3}} style={{ width: '550px'}}>
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" color="primary" gutterBottom >Availability</Typography>
          </Box>
            <Grid item flexDirection="row" sm={12} md={12} lg={12} >
            <Title>Day</Title>
            {/* Days */}
            <Select name="day"
                      id="day" 
                      value={avail.day} 
                      style={{ minWidth: 120 }}
                      onChange={(event) => {
                        // console.log("day change: ")
                        // console.log(event)
                        handleChange(
                          "day",
                          event.target.value
                        );

                      }} >
              <MenuItem value="">Select Day</MenuItem>
              {['Monday', 'Tuesday', 'Wednesday','Thursday',
              'Friday', 'Saturday','Sunday'].map((day) => (
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
                        handleChange(
                          "startTime",
                          dayjs(event).format("HH:mm:ss")
                        );
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
                        handleChange(
                          "endTime",
                          dayjs(event).format("HH:mm:ss")
                        );
                      }}
                    />

            </Grid>
            <Box mt={5} mb={2} display="flex" justifyContent="center" width="100%">
              <Stack direction="row" spacing={2} alignItems="center">
                <Link to="/home" style={{ textDecoration: "none" }}>
                  <Button onClick={handleSubmit} type="submit" variant="contained" >
                    Submit
                  </Button>
                </Link>
                <Link to="/home" style={{ textDecoration: "none" }}>
                <Button variant="contained">
                  Cancel
                </Button>
                </Link>
              </Stack>
            </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default AvailabilityPage;
