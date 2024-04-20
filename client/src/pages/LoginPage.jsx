import React, { useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const localHost = "http://localhost:8800";

  const [formErrors, setFormErrors] = useState([]);
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });

  const { user, setUser } = useUserContext();

  const handleChange = (id, e) => {
    console.log("< = handleChange triggered = >");
    setCred((prev) => ({ ...prev, [id]: e }));
  };

  const handleClick = (e) => {
    console.log("< = handleClick triggered = >");
    navigate("/registration");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("< = handleSubmit triggered = >");
    // console.log("Login - Submitted credentials =>: ", cred);

    var errorList = await validateForm(cred);

    // console.log("Login - errorList: ", errorList);

    if (!Object.keys(errorList).length) {
      var res = "";
      var res1 = "";
      try {
        res = await axios.get(
          localHost + "/login/" + cred.username + "/" + cred.password
        );

        // console.log("Login - Account response: ", res, res.data);
        
        if (res.data.length === 0) {
          // No matching account
          setFormErrors({ invalid: "Invalid credentials" });

        } else if (res.data.length === 1 && res.status === 200 && res.data[0].isActive) {
          // Active account found
          console.log("Active account found")

        } else if (res.data[0].isActive != null && !(res.data[0].isActive)){
          // Inactive account
          setFormErrors({ inactive: "Account is inactive" });
        }
      } catch (err) {
        console.log("Login - Account Server Error: ", err);
      }
    }

    if(!Object.keys(errorList).length && res.data.length === 1 && res.status === 200){
      try{
        res1 = await axios.get(
          localHost + "/employees/" + res.data[0].id
        );
        // console.log("Login - Employee response: ", res1, res1.data);
        if (res1.data.length === 1 && res.status === 200 && res.data[0]) {
          console.log("Employee found")

          localStorage.setItem('currentUser', JSON.stringify({
            employeeId: res1.data[0].id,
            firstName: res1.data[0].firstName,
            lastName: res1.data[0].lastName,
            email: res1.data[0].email,
            isManager: res1.data[0].isManager,
            accountId: res1.data[0].accountId,
            username: res.data[0].username,
            password: res.data[0].password,
            isActive: res.data[0].isActive,
          }
          ))
         
          navigate("/home");

        }
      }catch(err){
        console.log("Login - Employee Server Error: ", err);
      }  

    }
  };


  const validateForm = async (cred) => {
    console.log("< = Validating Form = >");
    const errors = {};

    if (!cred.username) {
      errors.username = "Username is required";
    }
    if (!cred.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return errors;
  };

  var result = Object.keys(formErrors).map((key) => [formErrors[key]]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
          <Paper
            elevation={3}
            sx={{
              p: 7,
              display: "flex",
              flexDirection: "column",
              minWidth: "30%",
            }}
          >
            <Grid item xs={12} md={12} lg={12}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3" color="primary" gutterBottom>
                  ScheduleNow
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
                <Stack
                  sx={{ pt: 3 }}
                  direction="column"
                  spacing={2}
                  alignItems="center"
                >
                  <TextField
                    id="username"
                    variant="outlined"
                    label="Username"
                    name="username"
                    onChange={(event) => {
                      handleChange("username", event.target.value);
                    }}
                  />
                  <TextField
                    id="password"
                    variant="outlined"
                    label="Password"
                    name="password"
                    onChange={(event) => {
                      handleChange("password", event.target.value);
                    }}
                  />
                </Stack>
              </Box>
              <Box mt={5} display="flex" justifyContent="center" width="100%">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button type="submit" variant="contained">
                    Login
                  </Button>
                  <Button onClick={handleClick} variant="contained">
                    Create Account
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </form>
    </>
  );
};

export default LoginPage;
