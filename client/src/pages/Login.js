import React, { useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import {
  Box,
  Drawer,
  TextField,
  Typography,
  FormControl,
  Button,
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
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      navigate("/profile");
      return redirect("/profile");
    } catch (e) {
      console.error(e);
    }
  };

  const classes = useStyles();
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box className={classes.drawerContent}>
        <Typography>Login</Typography>
        {data ? (
          <Navigate to="/profile" />
        ) : (
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
              margin="normal"
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
        )}

        {error && <div>{error.message}</div>}
      </Box>
    </Drawer>
  );
};

export default Login;
