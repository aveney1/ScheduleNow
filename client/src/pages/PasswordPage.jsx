import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import InputElement from "../components/InputElement"
import Typography from '@mui/material/Typography';
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";





const PasswordPage = () => {
  

  const localHost = "http://localhost:8800";
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate()

  const [newPW, setNewPW] = useState({
    password:"",
    passwordConfirmation:""
  });

  const handleChange= (id, e) => {
    // Handle form submission
    console.log("handleChange triggered =>");
    //console.log("id: " + id + " e: " + e)
    console.log(newPW);
    setNewPW((prev) => ({ ...prev, [id]: e }));
    console.log("after=>");
    console.log(newPW);
  };


  const handleClick= (e) => {
    console.log("cancel clicked")
    navigate("/home")
  }


  const handleSubmit = async (e) => {
    // Handle form submission
    console.log("handle submit password:");
    e.preventDefault()
    console.log(newPW)
    var errorList = await validateForm(newPW)
    if(!(Object.keys(errorList).length)){
      var res = ""
    try{
      console.log("No Errors, Attempting post....")
      return
      res = await axios.post(localHost+"/password", newPW)
      console.log("res")
      console.log(res)
      //navigate("/home")
    }catch(err){
      console.log(err)
    }
  }
}

  const validateForm = async (newPW) => {

    const errors = {};

    if (!newPW.password){
      errors.password = "Password is required"
    }
    if(!newPW.passwordConfirmation){
      errors.passwordConfirmation = "Password Confirmation is required"
    }
    if(newPW.password != newPW.passwordConfirmation){
      errors.email = "Passwords dont match"
    }

     setFormErrors(errors)
     return errors
  };
 
  var result = Object.keys(formErrors).map((key) => [formErrors[key]]);

  return (
  
      <>
      <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
        <Paper elevation={3} sx={{  p: 7, display: "flex", flexDirection: "column", minWidth: "30%"}}>
          <Grid item xs={12} md={12} lg={12}>
            <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" color="primary" gutterBottom >Password</Typography>
            <div>
      {result.length > 0 && (
        <ul>
          {result.map((error, index) => (
            
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
             <Stack sx={{ pt: 3}} direction="column" spacing={2} alignItems="center">
                <TextField 
                id="password" 
                name="password"
                variant="outlined" 
                label="New Password"
                onChange={(event) => {
                  // console.log("day change: ")
                  // console.log(event)
                  handleChange("password", event.target.value);
                }}
                />
                
                <TextField 
                id="passwordConfirmation" 
                name="passwordConfirmation" 
                variant="outlined" 
                label="Confirm New Password"
                onChange={(event) => {
                  // console.log("day change: ")
                  // console.log(event)
                  handleChange("passwordConfirmation", event.target.value);
                }}
                />
              </Stack>
            </Box>
            <Box mt={4} display="flex" justifyContent="center" width="100%">
            <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                      
                      type="submit"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  <Button onClick={handleClick} variant="contained">
                    Cancel
                  </Button>
                </Stack>
            </Box>
          </Grid>
        </Paper>
      </Grid>
      </form>
    </>
  );
}

export default PasswordPage;
