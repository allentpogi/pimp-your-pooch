import React from "react";
import { CssBaseline, Link, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  footer: {},
}));

const Footer = () => {
  const { classes } = useStyles();
  return (
    <>
      <CssBaseline />
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Pimp My Pooch Ltd Pty
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          &copy; Pimp-my-pooch 2023
        </Typography>
      </footer>
    </>
  );
};

export default Footer;
