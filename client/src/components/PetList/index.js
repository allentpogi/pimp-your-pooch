import React from "react";
import { Link, useState } from "react-router-dom";
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
import moment from "moment";

const PetList = ({ pets }) => {
  if (!pets.length) {
    return <h3>No pets yet.</h3>;
  }
  console.log(pets);

  // const petsFormatted = pets.map((pet) => (

  //   {

  //   name: pet.name,
  //   breed: pet.breed,
  //   birthday: pet.birthday,
  //   colour: pet.colour,
  //   allergies: pet.allergies,
  //   otherinfo: pet.otherinfo,

  // }
  // ))

  // const{ pets.birtday }
  // const formattedDate = date.toLocaleDateString('en-GB');

  return (
    <>
      <CssBaseline />
      <Box>
        <Container>
          <Grid container spacing={4}>
            {pets.map((pet) => (
              <Grid item key={pet._id}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {pet.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pet.breed}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {moment(pet.birthday).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pet.colour}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pet.allergies}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pet.otherinfo}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default PetList;
