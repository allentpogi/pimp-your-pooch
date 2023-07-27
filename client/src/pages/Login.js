import React, { useState } from "react";
// import { redirect } from "react-router-dom";
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
  // const [loggedIn, setLoggedIn] = useState(false);
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
      console.log("start login");
      const { data } = await login({
        variables: { ...formState },
      });

      console.log("login success");
      Auth.login(data.login.token);
      console.log("token assigned");
      // return redirect("/me");
      navigate("/me");
    } catch (e) {
      console.error(e);
    }
  };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(formState);
  //   login({ variables: { ...formState } }).then(({ data }) => {
  //     Auth.login(data.login.token);
  //     navigate("/test");
  //   });
  // try {
  //   console.log("start login");
  //   const { data } = await login({
  //     variables: { ...formState },
  //   });

  //   console.log("login success");
  //   Auth.login(data.login.token);
  //   console.log("token assigned");
  //   // return redirect("/test");
  //   navigate("/test");
  // } catch (e) {
  //   console.error(e);
  // }
  // navigate("/test");
  // };

  const classes = useStyles();
  return (
    <div>
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <Box className={classes.drawerContent}>
          <Typography>Login</Typography>
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
          {data && (
            <div>
              Login successful. You can{" "}
              <span>
                <a href="/me" onClick={onClose}>
                  Close
                </a>
              </span>
            </div>
          )}
          {error && <div>{error.message}</div>}
        </Box>
      </Drawer>
    </div>
  );
};

export default Login;
