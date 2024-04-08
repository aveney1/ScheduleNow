import * as React from "react";
import { styled } from "@mui/system";
import { Input as BaseInput } from "@mui/base/Input";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import InputElement from "../components/InputElement"
import Typography from '@mui/material/Typography';




const PasswordPage = () => {
  const blue = {
    100: "#DAECFF",
    200: "#80BFFF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const InputElement = styled("input")(
    ({ theme }) => `
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const Input = React.forwardRef(function CustomInput(props, ref) {
    return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
  });

  const handleSubmit = () => {
    // Handle form submission
    console.log("handle submit password:");
  };
  return (
  
      <>
      <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
        <Paper elevation={3} sx={{  p: 7, display: "flex", flexDirection: "column", minWidth: "30%"}}>
          <Grid item xs={12} md={12} lg={12}>
            <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" color="primary" gutterBottom >Password</Typography>
             <Stack sx={{ pt: 3}} direction="column" spacing={2} alignItems="center">
                <TextField id="password" variant="outlined" label="New Password"/>
                <TextField id="confirmPW" variant="outlined" label="Confirm New Password"/>
              </Stack>
            </Box>
            <Box mt={4} display="flex" justifyContent="center" width="100%">
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
}

export default PasswordPage;
