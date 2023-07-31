import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PET } from "../utils/queries";
import BookingForm from "../components/BookingForm";
import PetInfo from "../components/PetInfo/";
import BookingList from "../components/BookingList";

import Auth from "../utils/auth";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

const Pet = () => {
  const { petId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId: petId },
  });

  const [pet, setPet] = useState({});

  useEffect(() => {
    if (data?.pet) {
      setPet(data?.pet || {});
    }
  }, [data?.pet]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/me");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  if (!data || !data.pet) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
        <Typography variant="h5">Pet not found.</Typography>
      </Box>
    );
  }

  const singlePet = data?.pet || {};

  const addBooking = (newAppointment) => {
    setPet((pet) => ({
      ...pet,
      appointments: [...pet.appointments, newAppointment],
    }));
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <CssBaseline />
          <Box>
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper elevation={3}>
                    <PetInfo pet={singlePet} />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper elevation={3} sx={{ height: "100%" }}>
                    <BookingForm pet={singlePet} addBooking={addBooking} />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Paper elevation={3} sx={{ height: "100%" }}>
                    <BookingList pet={singlePet} />
                  </Paper>
                </Grid>
              </Grid>
              <Box
                align="center"
                sx={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                  size="large"
                >
                  Back to My pack
                </Button>
              </Box>
            </Container>
          </Box>
        </>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
          <Typography variant="h5">
            You need to be logged in to see this. Use the navigation link above
            to log in!
          </Typography>
        </Box>
      )}
    </>
  );
};
export default Pet;
