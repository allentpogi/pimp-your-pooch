import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import PetForm from "../PetForm";
import formatDate from "../../utils/formatdate";
import { getIconComponent } from "../../utils/geticoncomponent";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import Avatar from "@mui/material/Avatar";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import {
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import { REMOVE_PET } from "../../utils/mutations";
import { QUERY_PETS, QUERY_ME } from "../../utils/queries";

const PetCard = ({ pet, onPetRemoval }) => {
  const { name, breed, birthday, colour, allergies, otherinfo } = pet;
  const formattedBirthday = formatDate(birthday);

  const petInfo = [
    { label: "Breed", value: breed, icon: "PetsRoundedIcon" },
    {
      label: "Birthday",
      value: formattedBirthday,
      icon: "CakeRoundedIcon",
    },
    { label: "Colour", value: colour, icon: "PaletteRoundedIcon" },
    {
      label: "Allergies",
      value: allergies,
      icon: "LocalHospitalRoundedIcon",
    },
    {
      label: "Other information",
      value: otherinfo,
      icon: "ArticleRoundedIcon",
    },
  ];

  const [removePet, { error }] = useMutation(REMOVE_PET, {
    update(cache, { data: { removePet } }) {
      try {
        // Read the current list of pets from the cache
        const data = cache.readQuery({ query: QUERY_PETS }) ?? { pets: [{}] };

        // if (!data || !data.pets) {
        //   // If data or pets are null, there's nothing to update in the cache
        //   return;
        // }

        const { pets } = data;

        // Filter out the removed pet from the list
        const updatedPets = pets.filter((pet) => pet.id !== removePet.id);

        // Update the cache with the modified list of pets
        cache.writeQuery({
          query: QUERY_PETS,
          data: { pets: updatedPets },
        });

        // Update me object's cache to remove the pet from the "pets" array
        const { me } = cache.readQuery({ query: QUERY_ME });

        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: {
              ...me,
              pets: updatedPets,
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event, petId) => {
    event.preventDefault();

    console.log(petId);
    try {
      await removePet({ variables: { petId: petId } });
      console.log(petId);
    } catch (err) {
      console.error(err);
    }

    onPetRemoval(pet._id);
  };

  return (
    <Grid item key={pet._id} xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", boxShadow: "3" }}>
        <CardContent>
          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
              <BadgeRoundedIcon />
            </Avatar>
            <Typography variant="h5" align="center">
              <Link to={`/pets/${pet._id}`}>{name}</Link>
            </Typography>
          </Box>
          <Box sx={{ padding: "1rem", marginBottom: "1rem" }}>
            <List sx={{ width: "100%", maxWidth: 360 }}>
              {petInfo.map((info, index) => (
                <>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{getIconComponent(info.icon)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      key={index}
                      primary={info.label}
                      secondary={info.value}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <Tooltip title="Click for more info">
                <IconButton
                  onClick={(event) => handleFormSubmit(event, pet._id)}
                >
                  <DeleteForeverRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

const PetList = ({ pets, onPetRemoval }) => {
  // const [petList, setPetList] = useState(pets);

  // const handlePetRemoval = (petId) => {
  //   // Filter out the removed pet from the list
  //   const updatedPets = petList.filter((pet) => pet._id !== petId);
  //   setPetList(updatedPets);
  // };

  console.log("child", pets);
  console.log("onPetRemoval", onPetRemoval);

  return (
    <>
      <CssBaseline />
      <Container>
        <Grid container spacing={2}>
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} onPetRemoval={onPetRemoval} />
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, height: "100%" }}>
              <PetForm />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PetList;
