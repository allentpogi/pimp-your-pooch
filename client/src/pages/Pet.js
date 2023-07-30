import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PET } from "../utils/queries";
import formatDate from "../utils/formatdate";
import BookingForm from "../components/BookingForm";
import PetInfo from "../components/PetInfo/";
import { makeStyles } from "tss-react/mui";

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

const useStyles = makeStyles()(() => ({}));

const Pet = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/me");
  };

  const { classes } = useStyles();
  return (
    <>
      <CssBaseline />
      <Box>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "1.5rem",
              gap: "1rem",
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
