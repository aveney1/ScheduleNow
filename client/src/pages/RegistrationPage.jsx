import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { RadioGroup } from "@mui/material";
import { FormControl, FormLabel, FormControlLabel, Radio } from "@mui/material";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const localHost = "http://localhost:8800";
  const [empEmails, setEmpEmails] = useState([]);
  const [acctUsernames, setAcctUsernames] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const [reg, setReg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    isManager: 0,
    isActive: 1,
  });

  const handleChange = (id, e) => {
    setReg((prev) => ({ ...prev, [id]: e }));
  };
  const handleClick = (e) => {
    navigate("/");
  };
  useEffect(() => {
    const fetchEmpEmails = async () => {
      try {
        const emails = [];
        const res = await axios.get(localHost + "/employees/");
        for (let i = 0; i < res.data.length; i++) {
          emails.push(res.data[i].email);
        }
        setEmpEmails(emails);
      } catch (err) {
        console.log("Error retrieving email details: " + err);
      }
    };
    fetchEmpEmails();

    const fetchAcctUsernames = async () => {
      try {
        const usernames = [];
        const res = await axios.get(localHost + "/accounts/");

        for (let i = 0; i < res.data.length; i++) {
          usernames.push(res.data[i].username);
        }

        setAcctUsernames(usernames);
      } catch (err) {
        console.log("Error retrieving username details: " + err);
      }
    };
    fetchAcctUsernames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var accountId = 0;

    var errorList = await validateForm(reg);
    if (!Object.keys(errorList).length) {
      var res = "";
      try {

        res = await axios.post(localHost + "/registration", reg);

        if (res.status === 200) {
          res = await axios.get(localHost + "/accounts/" + reg.username);
          accountId = res.data;
        }

        if (res.status === 200) {
          res = await axios.post(localHost + "/employees/" + accountId, reg);
        }
        
        navigate('/login')
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateForm = async (reg) => {
    const errors = {};

    if (!reg.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!reg.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!reg.email) {
      errors.email = "Email is required";
    }
    if (!reg.username) {
      errors.username = "Username is required";
    }
    if (!reg.password) {
      errors.password = "Password is required";
    }

    if (empEmails.includes(reg.email)) {
      errors.email = "Email already in use";
    }
    if (acctUsernames.includes(reg.username)) {
      errors.username = "Username already in use";
    }
    if (!reg.email.includes("@") || !reg.email.includes(".com")) {
      errors.email = "Email must include @ and .com";
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
            sx={{ p: 3, display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{ pt: 2 }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h3" color="primary" gutterBottom>
                Registration
              </Typography>
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
            <Grid item xs={12} md={12} lg={12} sx={{ p: 7 }}>
              <Title>First Name</Title>
              <TextField
                id="firstName"
                name="firstName"
                variant="outlined"
                onChange={(event) => {
                  handleChange("firstName", event.target.value);
                }}
              />
              <Title>Last Name</Title>
              <TextField
                id="lastName"
                name="lastName"
                variant="outlined"
                onChange={(event) => {
                  handleChange("lastName", event.target.value);
                }}
              />
              <Title>Email</Title>
              <TextField
                id="email"
                name="email"
                variant="outlined"
                onChange={(event) => {
                  handleChange("email", event.target.value);
                }}
              />
              <Title>Username</Title>
              <TextField
                id="username"
                name="username"
                variant="outlined"
                onChange={(event) => {
                  handleChange("username", event.target.value);
                }}
              />
              <Title>Password</Title>
              <TextField
                id="password"
                name="password"
                variant="outlined"
                onChange={(event) => {
                  handleChange("password", event.target.value);
                }}
              />
              <Box display="flex" justifyContent="center">
                <FormControl component="fieldset">
                  <FormLabel style={{ marginTop: "1rem" }} id="manager">
                    Manager?
                  </FormLabel>
                  <RadioGroup
                    aria-label="Manager"
                    label="isManager"
                    name="isManager"
                    value={reg.isManager}
                    onChange={(event) => {
                      handleChange("isManager", event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value={0}
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
              <Box mt={2} display="flex" justifyContent="center" width="100%">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button type="submit" variant="contained">
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
