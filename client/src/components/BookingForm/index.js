import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_APPOINTMENT } from "../../utils/mutations";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const bookingTypes = [
  { value: "1", label: "Pamper my pooch" },
  { value: "2", label: "Doggy day out" },
  { value: "3", label: "Holiday" },
];

const BookingForm = ({ pet, addBooking }) => {
  const petId = pet._id;
  const [addAppointment, { error }] = useMutation(ADD_APPOINTMENT);
  const [formState, setFormState] = useState({
    bookingType: "",
    bookingDate: "2023-08-01",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const clearValue = () => {
    setFormState({
      bookingType: "",
      bookingDate: "2023-08-01",
      notes: "",
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addAppointment({
        variables: {
          petId,
          ...formState,
        },
      });

      clearValue();
    } catch (err) {
      console.error(err);
    }

    const newAppointment = {
      petId,
      ...formState,
    };

    addBooking(newAppointment);
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <EventAvailableRoundedIcon />
          </Avatar>
          <Typography variant="h5">Book an appointment</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "1.5rem",
            justifyContent: "left",
            width: "100%",
          }}
        >
          <FormControl variant="standard" fullWidth>
            <InputLabel id="bookingType">Booking type</InputLabel>
            <Select
              name="bookingType"
              label="Booking type"
              required={true}
              onChange={handleChange}
              labelid="bookingType"
              value={formState.bookingType}
            >
              {bookingTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              name="bookingDate"
              label="Date"
              required={true}
              onChange={handleChange}
              labelid="bookingDate"
              value={formState.bookingDate}
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
              name="notes"
              label="Notes"
              required={false}
              onChange={handleChange}
              labelid="notes"
              value={formState.notes}
              fullWidth
              variant="standard"
              multiline={true}
              rows={4}
            />
            <Box
              sx={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "1rem",
                marginBottom: "1rem",
                justifyContent: "right",
              }}
            >
              <Button
                variant="outlined"
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
        </Box>
      </Container>
    </>
  );
};

export default BookingForm;
