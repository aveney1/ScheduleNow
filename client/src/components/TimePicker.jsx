import React, { useState } from 'react';
import {DatePicker} from '@mui/x-date-pickers'
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


function TimePickerEx() {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Selected Time:", selectedTime);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <DatePicker
        label="Select Time"
        value={selectedTime}
        onChange={handleTimeChange}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
    </Grid>
  );
}

export default TimePickerEx;
