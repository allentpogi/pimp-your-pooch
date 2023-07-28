import React from "react";
import { Link, useState } from "react-router-dom";
import PetForm from "../PetForm";
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

import formatDate from "../../utils/formatdate";

const PetList = ({ pets }) => {
  if (!pets.length) {
    return <h3>No pets yet.</h3>;
  }

  return (
    <>
      <CssBaseline />
      <Box>
        <Container>
          <Grid container spacing={4}>
            {pets.map((pet) => {
              const { name, breed, birthday, colour, allergies, otherinfo } =
                pet;

              const formattedBirthday = formatDate(birthday);

              return (
                <Grid item key={pet._id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        align="center"
                      >
                        <Link to={`/pets/${pet._id}`}>{name}</Link>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {breed}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formattedBirthday}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {colour}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {allergies}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {otherinfo}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <PetForm />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default PetList;
