import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import Avatar from "@mui/material/Avatar";

import PetList from "../components/PetList";

import { QUERY_ME } from "../utils/queries";

const MyPack = () => {
  const { loading, data } = useQuery(QUERY_ME, {});

  const user = data?.me || {};

  const [petList, setPetList] = useState([]);
  console.log("mypack", petList);

  useEffect(() => {
    if (user?.pets) {
      setPetList(user.pets);
    }
  }, [user.pets]);

  console.log({ user });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
        <Typography variant="h5">
          You need to be logged in to see this. Use the navigation link above to
          log in!
        </Typography>
      </Box>
    );
  }

  const handlePetRemoval = (petId) => {
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
