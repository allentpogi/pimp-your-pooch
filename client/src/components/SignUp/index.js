import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
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

const Signup = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

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

      Auth.login(data.addUser.token);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

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
                <PersonAddRoundedIcon />
              </Avatar>
              <Typography variant="h5">Sign up</Typography>
            </Box>
            <Box
              sx={{
                marginTop: "1.5rem",
              }}
            >
              <FormControl
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
              >
                <TextField
                  required
                  label="Username"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                />
                <TextField
                  required
                  label="Full name"
                  name="fullname"
                  value={formState.name}
                  onChange={handleChange}
                />
                <TextField
                  required
                  label="Email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <TextField
                  required
                  label="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "0.25rem",
                    m: 1,
                    justifyContent: "right",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    align="center"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFormSubmit}
                    size="small"
                    align="center"
                  >
                    Submit
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </Box>
          {error && <Typography>{error.message}</Typography>}
        </Paper>
      </Drawer>
    </>
  );
};

export default Signup;
