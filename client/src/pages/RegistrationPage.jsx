import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { RadioGroup } from "@mui/material";
import { FormControl,FormLabel,FormControlLabel, Radio } from "@mui/material";
import { Link } from "react-router-dom";
import InputElement from "../components/InputElement"
import {TextField} from "@mui/material"
import Typography from '@mui/material/Typography'
import { useParams, useNavigate} from "react-router-dom";



const RegistrationPage = () => {
  const navigate = useNavigate()
  const localHost = "http://localhost:8800";
  const [empEmails, setEmpEmails] = useState([])
  const [acctUsernames, setAcctUsernames] = useState([])
  const [formErrors, setFormErrors] = useState([]);
  const [reg, setReg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username:"",
    password:"",
    isManager:0,
    isActive: 1
  });
 
  const handleChange= (id, e) => {
    // Handle form submission
    console.log("handleChange triggered =>");
    //console.log("id: " + id + " e: " + e)
    console.log(reg);
    setReg((prev) => ({ ...prev, [id]: e }));
    console.log("after=>");
    console.log(reg);
  };
  const handleClick= (e) => {
    console.log("cancel clicked")
    navigate("/")
  }
  useEffect(() => {
    const fetchEmpEmails = async () => {
        try {
          const emails = []
          const res = await axios.get(localHost + "/employees/");
          console.log("useEffect triggered");
          //console.log(res.data[0].day)
          for (let i = 0; i < (res.data).length; i++) { 
            emails.push(res.data[i].email)
          }
          setEmpEmails(emails);
        } catch (err) {
          console.log("Error retrieving email details: " + err);
        }
    };
    fetchEmpEmails();

    const fetchAcctUsernames = async () => {
      try {
        const usernames = []
        const res = await axios.get(localHost + "/accounts/");
        console.log("useEffect triggered");
        //console.log(res.data[0].day)
        for (let i = 0; i < (res.data).length; i++) { 
          usernames.push(res.data[i].username)
        }
        console.log(usernames)
        setAcctUsernames(usernames);
      } catch (err) {
        console.log("Error retrieving username details: " + err);
      }
  };
  fetchAcctUsernames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    var accountId = 0
    console.log("Submit has been clicked in registration");
    console.log(reg)
    var errorList = await validateForm(reg)
      if(!(Object.keys(errorList).length)){
        var res = ""
      try{
        console.log("No Errors, Attempting post....")
        res = await axios.post(localHost+"/registration", reg)
        console.log("res")
        console.log(res)

        if(res.status === 200){
          console.log("Successful account creation, Attempting get....")
        res = await axios.get(localHost+"/accounts/"+ reg.username)
        console.log("res account id")
        console.log(res)
        accountId = res.data
        }

        if(res.status === 200){
          console.log("Successful account id retrieval, Attempting post....")
        res = await axios.post(localHost+"/employees/"+accountId, reg)
        console.log(res)
        }
        //navigate("/home")
      }catch(err){
        console.log(err)
      }
    }
   
  };



  const validateForm = async (reg) => {

    const errors = {};

    if (!reg.firstName){
      errors.firstName = "First Name is required"
    }
    if(!reg.lastName){
      errors.lastName = "Last Name is required"
    }
    if(!reg.email){
      errors.email = "Email is required"
    }
    if(!reg.username){
      errors.username = "Username is required"
    }
    if(!reg.password){
      errors.password = "Password is required"
    }
    // if(!reg.isManager){
    //   errors.state = "Manager selection require"
    // }
    if(empEmails.includes(reg.email)){
      errors.email= "Email already in use"
    }
    if(acctUsernames.includes(reg.username)){
      errors.username= "Username already in use"
    }
    if(!(reg.email).includes("@") || !(reg.email).includes(".com") ){
      errors.email= "Email must include @ and .com"
    }
    // const pattern = new RegExp("^[a-zA-Z0-9\\s,'.#-]+$");
    // const isValid = pattern.test(cust.street)&& cust.street.includes(' ');
    
    // if(!isValid){
    //   errors.street= "Street is not valid."
    //  }
     setFormErrors(errors)
     return errors
  };
  var result = Object.keys(formErrors).map((key) => [formErrors[key]]);
 
  // const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  //   return <InputElement {...props} ref={ref} />;
  // });

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
        <Paper
          elevation={3}
          sx={{ p: 3, display: "flex", flexDirection: "column"}}
        >
         <Box sx={{ pt: 2}} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" color="primary" gutterBottom >Registration</Typography>
          </Box>
          <div>
      {result.length > 0 && (
        <ul>
          {result.map((error, index) => (
            
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
          <Grid item xs={12} md={12} lg={12} sx={{p:7}}>
            {/* <Box display="flex" flexDirection="column" alignItems="center"> */}
              {/* <Title>Create Account</Title> */}
              <Title >First Name</Title>
             <TextField 
             id="firstName" 
             name="firstName"
             variant="outlined"
             onChange={(event) => {
              // console.log("day change: ")
              // console.log(event)
              handleChange("firstName", event.target.value);
            }}
             />
             <Title>Last Name</Title>
             <TextField 
             id="lastName" 
             name="lastName"
             variant="outlined"
             onChange={(event) => {
              // console.log("day change: ")
              // console.log(event)
              handleChange("lastName", event.target.value);
            }}
             />
             <Title>Email</Title>
             <TextField 
             id="email"  
             name="email"
             variant="outlined"
             onChange={(event) => {
              // console.log("day change: ")
              // console.log(event)
              handleChange("email", event.target.value);
            }}
             />
             <Title>Username</Title>
             <TextField 
             id="username"
             name ="username"
            variant="outlined"
            onChange={(event) => {
              // console.log("day change: ")
              // console.log(event)
              handleChange("username", event.target.value);
            }}
            />
             <Title>Password</Title>
             <TextField 
             id="password"
             name="password" 
             variant="outlined"
             onChange={(event) => {
              // console.log("day change: ")
              // console.log(event)
              handleChange("password", event.target.value);
            }}
             />
               <Box display="flex" justifyContent="center" >
               <FormControl component="fieldset">
                <FormLabel style={{ marginTop: '1rem' }} id="manager">Manager?</FormLabel>
               <RadioGroup
                
                aria-label="Manager"
                label="isManager"
                name="isManager"
                value={reg.isManager}
                onChange={(event) => {
                  // console.log("day change: ")
                  // console.log(event)
                  handleChange("isManager", event.target.value);
                }}
              >
                <FormControlLabel
                  value= {0}
                  control={<Radio />}
                  label="No"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Yes"
                />
              </RadioGroup>
              </FormControl>
                </Box> 
            {/* </Box> */}
            <Box mt={2} display="flex" justifyContent="center" width="100%">
            <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                      type="submit"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  <Link to="/" style={{ textDecoration: "none" }}>
                  <Button onClick={handleClick} variant="contained">
                    Cancel
                  </Button>
                  </Link>
                </Stack>
            </Box>
          </Grid>
        </Paper>
      </Grid>
      </form>
    </>
  );
};

export default RegistrationPage;
