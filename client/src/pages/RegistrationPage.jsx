import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { RadioGroup } from "@mui/material";
import { useState } from "react";
import { FormControl,FormLabel,FormControlLabel, Radio } from "@mui/material";
import { Link } from "react-router-dom";
import InputElement from "../components/InputElement"
import {TextField} from "@mui/material"
import Typography from '@mui/material/Typography'



const RegistrationPage = () => {

  const [selectedOption, setSelectedOption] = useState("false");
  const [selectedValue, setSelectedValue] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Selected Option:", selectedOption);
    console.log("Selected Value:", selectedValue);
  };

  const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return <InputElement {...props} ref={ref} />;
  });

  return (
    <>
      <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
        <Paper
          elevation={3}
          sx={{ p: 3, display: "flex", flexDirection: "column"}}
        >
         <Box sx={{ pt: 2}} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" color="primary" gutterBottom >Registration</Typography>
          </Box>
          <Grid item xs={12} md={12} lg={12} sx={{p:7}}>
            {/* <Box display="flex" flexDirection="column" alignItems="center"> */}
              {/* <Title>Create Account</Title> */}
              <Title >First Name</Title>
             <TextField id="first_name" variant="outlined"/>
             <Title>Last Name</Title>
             <TextField id="last_name" variant="outlined"/>
             <Title>Email</Title>
             <TextField id="email"  variant="outlined"/>
             <Title>Street</Title>
             <TextField id="street"  variant="outlined"/>
             <Title>City</Title>
             <TextField id="city" variant="outlined"/>
             <Title>State</Title>
             <TextField id="state" variant="outlined"/>
               <Box display="flex" justifyContent="center" >
               <FormControl component="fieldset">
                <FormLabel style={{ marginTop: '1rem' }} id="manager">Manager?</FormLabel>
               <RadioGroup
                
                aria-label="Manager"
                label="Manager"
                name="options"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
              </RadioGroup>
              </FormControl>
                </Box> 
            {/* </Box> */}
            <Box mt={2} display="flex" justifyContent="center" width="100%">
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
                  <Button href="/home" variant="contained">
                    Cancel
                  </Button>
                </Stack>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default RegistrationPage;
