import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import {
  Box,
  Drawer,
  FormControl,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles((theme) => ({
  drawerContent: {
    padding: theme.spacing(2),
  },
}));

const Signup = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
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
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box className={classes.drawerContent}>
        <Typography>Sign up</Typography>
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
              label="Full name"
              name="fullname"
              value={formState.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
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
  );
};

export default Signup;
