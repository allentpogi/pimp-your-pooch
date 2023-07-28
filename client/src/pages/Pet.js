import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PET } from "../utils/queries";
import formatDate from "../utils/formatdate";
import BookingForm from "../components/BookingForm";
import PetInfo from "../components/PetInfo/PetInfo";

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
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/me");
  };
  return (
    <>
      <Container>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            // flexWrap: "wrap",
          }}
        >
          <Paper elevation={3}>
            <Box
              x={{
                flex: 2,
              }}
            >
              <PetInfo />
            </Box>
          </Paper>
          <Paper elevation={3}>
            <Box
              x={{
                flex: 1,
              }}
            >
              <BookingForm />
            </Box>
          </Paper>
        </Box>
        <Box align="center">
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
    </>
  );
};
export default Pet;
