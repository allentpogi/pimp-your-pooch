import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import Avatar from "@mui/material/Avatar";

// import PetForm from "../components/PetForm";
import PetList from "../components/PetList";

import { QUERY_ME } from "../utils/queries";

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
    <>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
              <Diversity1RoundedIcon />
            </Avatar>
            <Typography variant="h5">My fur family</Typography>
          </Box>
          <Box>
            <Box
              sx={{
                marginTop: "1rem",
              }}
            >
              <PetList pets={petList} onPetRemoval={handlePetRemoval} />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default MyPack;
