import React, { useState } from "react";
// import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { Pets } from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

const useStyles = makeStyles()(() => ({
  navTitle: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    margin: "1rem",
  },
}));

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLoginButtonClick = () => {
    setIsLoginOpen(true);
  };

  const handleLoginDrawerClose = () => {
    setIsLoginOpen(false);
  };

  const handleSignupButtonClick = () => {
    setIsSignupOpen(true);
  };

  const handleSignupDrawerClose = () => {
    setIsSignupOpen(false);
  };

  const { classes } = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div className={classes.navTitle}>
            <Pets className={classes.icon} />
            <Typography variant="h6">Pimp my pooch</Typography>
          </div>
          <div className={classes.navTitle}>
            <Button
              href="#"
              onClick={handleLoginButtonClick}
              variant="contained"
              sx={{ my: 1, mx: 1.5 }}
            >
              Login
            </Button>
            <Login isOpen={isLoginOpen} onClose={handleLoginDrawerClose} />
            <Button
              href="#"
              onClick={handleSignupButtonClick}
              variant="contained"
              sx={{ my: 1, mx: 1.5 }}
            >
              Sign up
            </Button>
            <Signup isOpen={isSignupOpen} onClose={handleSignupDrawerClose} />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
