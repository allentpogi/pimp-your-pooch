import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PET } from "../utils/queries";
import formatDate from "../utils/formatdate";
import BookingForm from "../components/BookingForm";
import PetInfo from "../components/PetInfo/";
import BookingList from "../components/BookingList";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

const Pet = () => {
  const { petId } = useParams();
  console.log("petjs.petid", petId);

  const { loading, data } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId: petId },
    // fetchPolicy: "no-cache",
  });

  // const petValue = data?.pet || {};
  const [pet, setPet] = useState({});

  console.log("loading", loading);
  // console.log("originaldata", data?.pet || {});
  const [dataLoaded, setDataLoaded] = useState(loading);
  console.log("data after usequery", data);

  useEffect(() => {
    // console.log(data);
    if (data?.pet) {
      setPet(data?.pet || {});
    }
  }, [data?.pet]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/me");
  };

  // console.log("firstdata", data);

  if (loading) {
    // Show a loading indicator or skeleton while data is being fetched
    return <p>Loading...</p>;
  }

  if (!data || !data.pet) {
    // Handle the case where data is not available or the pet is not found
    return <p>Pet not found</p>;
  }

  console.log("petjs.petid", petId);
  console.log("petjs.data", data?.pet || {});
  console.log("petjs.pet", pet);

  const singlePet = data?.pet || {};

  // const retrievedPet = data?.pet || {};

  const addBooking = (newAppointment) => {
    setPet((pet) => ({
      ...pet,
      appointments: [...pet.appointments, newAppointment],
    }));
  };

  // const { classes } = useStyles();
  return (
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
  );
};
export default Pet;
