import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button , TextField} from "@mui/material";
import Typography from '@mui/material/Typography';



const LoginPage = () => {


  return (
  
      <>
      <Grid container direction="column" alignItems="center" sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 7, display: "flex", flexDirection: "column", minWidth: "30%"}}>
          <Grid item xs={12} md={12} lg={12}>
            <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" color="primary" gutterBottom >ScheduleNow</Typography>
             <Stack sx={{ pt: 3}} direction="column" spacing={2} alignItems="center">
                <TextField id="username" variant="outlined" label="Username"/>
                <TextField id="password" variant="outlined" label="Password"/>
              </Stack>
            </Box>
            <Box mt={5} display="flex" justifyContent="center" width="100%">
              <Stack direction="row" spacing={2} alignItems="center">
                <Button href="/home" variant="contained">Login</Button>
                <Button href="/registration" variant="contained">Create Account</Button>
              </Stack>
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default LoginPage;
