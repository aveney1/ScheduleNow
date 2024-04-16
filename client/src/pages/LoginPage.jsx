import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button , TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";


const LoginPage = () => {
  const navigate = useNavigate()
  const localHost = "http://localhost:8800";
  const [acctUsernames, setAcctUsernames] = useState([])
  const [formErrors, setFormErrors] = useState([]);
  const [cred, setCred] = useState({
    username:"",
    password:"",
  });

  const handleChange= (id, e) => {
    // Handle form submission
    console.log("handleChange triggered =>");
    //console.log("id: " + id + " e: " + e)
    console.log(cred);
    setCred((prev) => ({ ...prev, [id]: e }));
    console.log("after=>");
    console.log(cred);
  };

  const handleClick= (e) => {
    console.log("create account clicked")
    navigate("/registration")
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    //var accountId = 0
    console.log("Submit has been clicked in login");
    console.log(cred)
    var errorList = await validateForm(cred)
      if(!(Object.keys(errorList).length)){
        var res = ""
      try{
        console.log("No Errors, Attempting get....")
        res = await axios.get(localHost+"/login/"+cred.username+"/"+cred.password)
        console.log("res")
        console.log(res)
        console.log(res.data)
        if(res.data.length === 0){
          setFormErrors({"invalid":"Invalid credentials"})
          console.log("No matching accounts")
        }else{
          console.log("successful authentication")
        }

        // if(res.status === 200){
        //   console.log("Successful account creation, Attempting get....")
        // res = await axios.get(localHost+"/accounts/"+ reg.username)
        // console.log("res account id")
        // console.log(res)
        // accountId = res.data
        // }

        // if(res.status === 200){
        //   console.log("Successful account id retrieval, Attempting post....")
        // res = await axios.post(localHost+"/employees/"+accountId, reg)
        // console.log(res)
        // }
        //navigate("/home")
      }catch(err){
        // errors.invalid = "Invalid credentials"
        setFormErrors({"invalid":"Invalid credentials"})
        console.log(err)
      }
    }
  }

  const validateForm = async (cred) => {

    const errors = {};

    console.log("in validate")
    if(!cred.username){
      errors.username = "Username is required"
    }
    if(!cred.password){
      errors.password = "Password is required"
    }
    // if(!reg.isManager){
    //   errors.state = "Manager selection require"
    // }
    // if(empEmails.includes(reg.email)){
    //   errors.email= "Email already in use"
    // }
    // if(acctUsernames.includes(reg.username)){
    //   errors.username= "Username already in use"
    // }
    // if(!(reg.email).includes("@") || !(reg.email).includes(".com") ){
    //   errors.email= "Email must include @ and .com"
    // }
    // const pattern = new RegExp("^[a-zA-Z0-9\\s,'.#-]+$");
    // const isValid = pattern.test(cust.street)&& cust.street.includes(' ');
    
    // if(!isValid){
    //   errors.street= "Street is not valid."
    //  }
     setFormErrors(errors)
     return errors
  };
  var result = Object.keys(formErrors).map((key) => [formErrors[key]]);
 




  return (
  
      <>
      <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 7, display: "flex", flexDirection: "column", minWidth: "30%"}}>
          <Grid item xs={12} md={12} lg={12}>
            <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" color="primary" gutterBottom >ScheduleNow</Typography>
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
                id="username" 
                variant="outlined" 
                label="Username"
                name ="username"
                onChange={(event) => {
                  // console.log("day change: ")
                  // console.log(event)
                  handleChange("username", event.target.value);
                }}
                />
                <TextField 
                id="password" 
                variant="outlined" 
                label="Password"
                name="password" 
                onChange={(event) => {
                 // console.log("day change: ")
                 // console.log(event)
                 handleChange("password", event.target.value);
               }}
                />
              </Stack>
            </Box>
            <Box mt={5} display="flex" justifyContent="center" width="100%">
              <Stack direction="row" spacing={2} alignItems="center">
                <Button 
                type="submit"
                variant="contained"
                >Login</Button>
                <Button 
                onClick={handleClick}
                variant="contained"
                >Create Account</Button>
              </Stack>
            </Box>
          </Grid>
        </Paper>
      </Grid>
      </form>
    </>
  );
}

export default LoginPage;
