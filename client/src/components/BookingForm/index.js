import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
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
import { ADD_APPOINTMENT } from "../../utils/mutations";
import { QUERY_SINGLE_PET } from "../../utils/queries";

const bookingTypes = [
  { value: "1", label: "Pamper my pooch" },
  { value: "2", label: "Doggy day out" },
  { value: "3", label: "Holiday" },
];

const BookingForm = () => {
  const [formState, setFormState] = useState({
    bookingType: 1,
    bookingDate: "2023-08-01",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    console.log("inside set", formState);
  };

  const clearValue = () => {
    setFormState({
      bookingType: "1",
      bookingDate: "2023-08-01",
      notes: "",
    });
  };

  const { petId } = useParams();
  // const { pet } = useQuery(QUERY_SINGLE_PET, {
  //   variables: { petId: petId },
  // });

  console.log(petId);
  console.log(formState);
  // console.log({petId, formState});

  const [addAppointment, { error }] = useMutation(ADD_APPOINTMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log({
      variables: {
        petId,
        ...formState,
      },
    });

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
  };

  return (
    <>
      <Container>
        <CssBaseline />
        <Typography variant="h6" gutterBottom>
          Make a booking
        </Typography>
        <FormControl>
          <InputLabel id="bookingType">Booking type</InputLabel>
          <Select
            name="bookingType"
            label="Booking type"
            required={true}
            onChange={handleChange}
            labelId="bookingType"
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
            labelId="bookingDate"
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
