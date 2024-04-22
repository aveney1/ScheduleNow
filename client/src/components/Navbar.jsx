import React from "react";
import { styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


function Navbar(props) {

const NavBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }));

  return (
    <>

<NavBar position="absolute">
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              ScheduleNow{" "}
              {props.isManager ? " - Admin Portal" : " - Employee Portal"}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={props.handleLogout}
                variant="contained"
                color="secondary"
              >
                Logout
              </Button>
            </Stack>
          </Toolbar>
        </NavBar>


    </>
  )
  

}

export default Navbar;