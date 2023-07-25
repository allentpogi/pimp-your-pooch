import React from "react";
import { Drawer, TextField, Button, Link } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles((theme) => ({
  drawerContent: {
    padding: theme.spacing(2),
  },
}));

const Signup = ({ isOpen, onClose }) => {
  const classes = useStyles();

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className={classes.drawerContent}>
        <TextField label="Username" fullWidth />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </Drawer>
  );
};

export default Signup;
