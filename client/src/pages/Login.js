import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

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
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      navigate("/me");
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const classes = useStyles();
  return (
    <div>
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <Box className={classes.drawerContent}>
          <Typography>Login</Typography>
          <FormControl>
            <form>
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
            </form>
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
      </Drawer>
    </div>
  );
};

export default Login;
