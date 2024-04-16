import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const localHost = "http://localhost:8800";
  const [acctUsernames, setAcctUsernames] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });

  const handleChange = (id, e) => {
    // Handle form submission
    console.log("handleChange triggered =>");
    console.log(cred);
    setCred((prev) => ({ ...prev, [id]: e }));
    console.log("after=>");
    console.log(cred);
  };

  const handleClick = (e) => {
    console.log("create account clicked");
    navigate("/registration");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit has been clicked in login");
    console.log(cred);
    var errorList = await validateForm(cred);
    if (!Object.keys(errorList).length) {
      var res = "";
      try {
        console.log("No Errors, Attempting get....");
        console.log("cred =>: ");
        console.log(cred);
        res = await axios.get(
          localHost + "/login/" + cred.username + "/" + cred.password
        );
        console.log("res");
        console.log(res);
        console.log(res.data);
        if (res.data.length === 0) {
          setFormErrors({ invalid: "Invalid credentials" });
          console.log("No matching accounts");
        } else {
          console.log("successful authentication");
        }
      } catch (err) {
        setFormErrors({ invalid: "Invalid credentials" });
        console.log(err);
      }
    }
  };

  const validateForm = async (cred) => {
    const errors = {};

    console.log("in validate");
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
