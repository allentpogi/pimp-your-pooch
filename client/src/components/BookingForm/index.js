import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";

const bookingTypes = [
  { value: 1, label: "Pamper my pooch" },
  { value: 2, label: "Doggy day out" },
  { value: 3, label: "Holiday" },
];

const BookingForm = () => {
  const [formState, setFormState] = useState({
    appointmentType: 1,
    appointmentDate: "2023-08-01",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const clearValue = () => {
    setFormState({
      appointmentType: 1,
      appointmentDate: "",
      notes: "",
    });
  };

  const handleFormSubmit = () => {};

  return (
    <>
      <Container>
        <CssBaseline />
        <Typography variant="h6" gutterBottom>
          Make a booking
        </Typography>
        <FormControl>
          <InputLabel id="appointmentType">Booking type</InputLabel>
          <Select
            name="appointmentType"
            label="Booking type"
            required={true}
            onChange={handleChange}
            labelId="appointmentType"
            value={formState.appointmentType}
          >
            {bookingTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
          <TextField
            name="appointmentDate"
            label="Date"
            required={true}
            onChange={handleChange}
            labelId="appointmentDate"
            value={formState.appointmentDate}
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            name="notes"
            label="Notes"
            required={false}
            onChange={handleChange}
            labelId="notes"
            value={formState.notes}
            fullWidth
            variant="standard"
            multiline={true}
            rows={2}
          />
          <Box>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clearValue}
              align="center"
            >
              Clear
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              size="small"
              align="center"
            >
              Book
            </Button>
          </Box>
        </FormControl>
      </Container>
    </>
  );
};

export default BookingForm;
