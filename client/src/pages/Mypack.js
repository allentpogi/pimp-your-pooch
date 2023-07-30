import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
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
import { makeStyles } from "tss-react/mui";

// import PetForm from "../components/PetForm";
import PetList from "../components/PetList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const MyPack = () => {
  // const { username: userParam } = useParams();
  // console.log("userParam", userParam);

  const { loading, data } = useQuery(QUERY_ME, {});

  const user = data?.me || {};
  console.log("user", user);
  console.log("data", data);

  const [petList, setPetList] = useState([]);
  console.log("mypack", petList);

  useEffect(() => {
    if (user?.pets) {
      setPetList(user.pets);
    }
  }, [user.pets]);

  console.log({ user });
  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/me" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  // Callback function to handle pet removal
  const handlePetRemoval = (petId) => {
    // Filter out the removed pet from the list
    const updatedPets = petList.filter((pet) => pet._id !== petId);
    setPetList(updatedPets);
  };

  return (
    <Container>
      <CssBaseline />
      <Box>
        <Typography
          variant="h5"
          sx={{
            marginTop: "1.5rem",
          }}
        >
          Members of your pack:
        </Typography>
        <Box>
          <PetList pets={petList} onPetRemoval={handlePetRemoval} />
        </Box>
      </Box>
    </Container>
  );
};

export default MyPack;
