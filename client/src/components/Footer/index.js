import React from "react";
import { Box, CssBaseline, Link, Typography } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Pimp my pooch
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <>
      <CssBaseline />
      <Box>
        <Copyright sx={{ pt: 4 }} />
      </Box>
    </>
  );
};

export default Footer;
