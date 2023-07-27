import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PET } from "../utils/queries";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";

const Pet = () => {
  const { petId } = useParams();

  console.log("petid", petId);
  console.log("params", useParams());

  const { loading, data } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId: petId },
  });

  const pet = data?.pet || {};
  console.log("pet", pet);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <CssBaseline />
        <Box>
          <Typography
            variant="h5"
            sx={{
              marginTop: "1.5rem",
            }}
          >
            {pet.name}'s details
          </Typography>
          <Box
            sx={{
              backgroundColor: "#E8F5E9",
              border: "1px solid grey",
              marginTop: "1rem",
              padding: "1rem",
            }}
          >
            <Typography>Breed: {pet.breed}</Typography>
            <Typography>Birthday: {pet.birthday}</Typography>
            <Typography>Colour: {pet.colour}</Typography>
            <Typography>Allergies: {pet.allergies}</Typography>
            <Typography>Other information: {pet.otherinfo}</Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Pet;
