import React, { useState } from "react";

import Auth from "../../utils/auth";

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
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginButtonClick = () => {
    setIsLoginOpen(true);
  };

  const handleLoginDrawerClose = () => {
    setIsLoginOpen(false);
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
            {Auth.loggedIn() ? (
              <>
                <Button
                  href="/me"
                  // onClick={handleLoginButtonClick}
                  sx={{ my: 1, mx: 1.5 }}
                  color="inherit"
                >
                  My pack
                </Button>
                <Button
                  href="/"
                  onClick={logout}
                  sx={{ my: 1, mx: 1.5 }}
                  color="inherit"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                href="#"
                onClick={handleLoginButtonClick}
                sx={{ my: 1, mx: 1.5 }}
                color="inherit"
              >
                Login
              </Button>
            )}
            <Login isOpen={isLoginOpen} onClose={handleLoginDrawerClose} />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
