import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Avatar from "@mui/material/Avatar";

import {
  Box,
  CssBaseline,
  Drawer,
  FormControl,
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles((theme) => ({
  drawerContent: {
    padding: theme.spacing(2),
  },
}));

const Login = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <Paper elevation={3}>
          <Box
            sx={{
              padding: "1rem",
            }}
          >
            <Box
              sx={{
                paddingTop: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
                <LockRoundedIcon />
              </Avatar>
              <Typography variant="h5">Login</Typography>
            </Box>

            <Box className={classes.drawerContent}>
              <FormControl>
                <TextField
                  label="Username"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  fullWidth
                />

                <Button variant="contained" color="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </FormControl>
              {error && <div>{error.message}</div>}
            </Box>
          </Box>
        </Paper>
      </Drawer>
    </>
  );
};

export default Login;
