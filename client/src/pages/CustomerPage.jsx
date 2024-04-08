import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom";
import { Button , TextField} from "@mui/material";
import Typography from '@mui/material/Typography';




const CustomerPage = () => {
  const handleSubmit = (event) => {
    // Handle form submission
    console.log("Submit has been clicked in appts");
  };
  return (
  
      <>
      <Grid container direction="column" alignItems="center" sx={{ p: 3 }} >
        <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ pt: 2}} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" color="primary" gutterBottom >Customer</Typography>
          </Box>
          <Grid container direction="column" sx={{p:3}}>
            <Title >First Name</Title>
             <TextField id="first_name" variant="outlined" sx={{ minWidth: "320px" }}/>
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
            </Grid>
            <Box display="flex" justifyContent="center" width="100%">
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
}

export default CustomerPage;
