import axios from "axios";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Select, MenuItem } from "@mui/material/";
import { useNavigate } from "react-router-dom";

const CustomerPage = () => {
  const localHost = "http://localhost:8800";
  const states = [
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MP",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UM",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];
  const [cust, setCust] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
  });
  const [custEmails, setCustEmails] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Handle form submission
    e.preventDefault();
    console.log("Submit has been clicked in customer");
    var errorList = await validateForm(cust);
    if (!Object.keys(errorList).length) {
      try {
        console.log("No Errors, Attempting post....");
        const res = await axios.post(localHost + "/customers", cust);
        console.log("res");
        console.log(res);
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
    }
    //console.log("skipped axios")
  };

  const handleChange = (id, e) => {
    setCust((prev) => ({ ...prev, [id]: e }));
    console.log("After set: ");
    console.log(cust);
  };

  const validateForm = async (cust) => {
    const errors = {};

    if (!cust.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!cust.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!cust.email) {
      errors.email = "Email is required";
    }
    if (!cust.street) {
      errors.street = "Street is required";
    }
    if (!cust.city) {
      errors.city = "City is required";
    }
    if (!cust.state) {
      errors.state = "State is required";
    }
    if (custEmails.includes(cust.email)) {
      errors.email = "Email already in use";
    }
    if (!cust.email.includes("@") || !cust.email.includes(".com")) {
      errors.email = "Email must include @ and .com";
    }
    const pattern = new RegExp("^[a-zA-Z0-9\\s,'.#-]+$");
    const isValid = pattern.test(cust.street) && cust.street.includes(" ");

    if (!isValid) {
      errors.street = "Street is not valid.";
    }
    setFormErrors(errors);
    return errors;
  };

  useEffect(() => {
    const fetchCustEmails = async () => {
      try {
        const emails = [];
        const res = await axios.get(localHost + "/customers/");
        console.log("useEffect triggered");
        for (let i = 0; i < res.data.length; i++) {
          emails.push(res.data[i].email);
        }
        setCustEmails(emails);
      } catch (err) {
        console.log("Error retrieving customer emails: " + err);
      }
    };
    fetchCustEmails();
  }, []);

  var result = Object.keys(formErrors).map((key) => [formErrors[key]]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box
              sx={{ pt: 2 }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h3" color="primary" gutterBottom>
                Customer
              </Typography>
            </Box>
            <Grid container direction="column" sx={{ p: 3 }}>
              <div>
                {result.length > 0 && (
                  <ul>
                    {result.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
              <Title>First Name</Title>
              <TextField
                id="firstName"
                variant="outlined"
                sx={{ minWidth: "320px" }}
                name="firstName"
                value={cust.firstName}
                onChange={(event) => {
                  handleChange("firstName", event.target.value);
                }}
              />
              <Title>Last Name</Title>
              <TextField
                id="lastName"
                variant="outlined"
                sx={{ minWidth: "320px" }}
                name="lastName"
                value={cust.lastName}
                onChange={(event) => {
                  handleChange("lastName", event.target.value);
                }}
              />
              <Title>Email</Title>
              <TextField
                id="email"
                variant="outlined"
                sx={{ minWidth: "320px" }}
                name="email"
                value={cust.email}
                onChange={(event) => {
                  handleChange("email", event.target.value);
                }}
              />
              <Title>Street</Title>
              <TextField
                id="street"
                variant="outlined"
                sx={{ minWidth: "320px" }}
                name="street"
                value={cust.street}
                onChange={(event) => {
                  handleChange("street", event.target.value);
                }}
              />
              <Title>City</Title>
              <TextField
                id="city"
                variant="outlined"
                sx={{ minWidth: "320px" }}
                name="city"
                value={cust.city}
                onChange={(event) => {
                  handleChange("city", event.target.value);
                }}
              />
              <Title>State</Title>
              <Select
                name="state"
                id="state"
                onChange={(event) => {
                  handleChange("state", event.target.value);
                }}
                value={cust.state}
                style={{ minWidth: 120 }}
              >
                <MenuItem value="">Select State</MenuItem>
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Box display="flex" justifyContent="center" width="100%">
              <Stack direction="row" spacing={2} alignItems="center">
                <Button type="submit" variant="contained">
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

export default CustomerPage;
