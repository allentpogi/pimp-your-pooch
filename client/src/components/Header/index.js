import React, { useState } from "react";

import Auth from "../../utils/auth";

import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { Pets } from "@mui/icons-material";
import Login from "../Login";

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

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Pets sx={{ margin: "1rem" }} />
            <Typography variant="h6">Pimp my pooch</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {Auth.loggedIn() ? (
              <>
                <Button href="/me" sx={{ my: 1, mx: 1.5 }} color="inherit">
                  My dogs
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
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
