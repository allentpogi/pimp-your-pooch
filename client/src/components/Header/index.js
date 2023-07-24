import React from "react";
import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { Pets } from "@mui/icons-material";
import { makeStyles } from "tss-react/mui";

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
  const { classes } = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div className={classes.navTitle}>
            <Pets className={classes.icon} />
            <Typography variant="h6">Pimp my pooch</Typography>
          </div>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
