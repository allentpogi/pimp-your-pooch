import React, { useState, useEffect } from "react";
import formatDate from "../../utils/formatdate";
import { getIconComponent } from "../../utils/geticoncomponent";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import Avatar from "@mui/material/Avatar";

import {
  Box,
  Container,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const PetInfo = ({ pet }) => {
  const [imageUrl, setImageUrl] = useState("");
  const petBreed = pet.breed;
  const formattedBirthday = formatDate(pet.birthday);

  const petInfo = [
    { label: "Breed", value: pet.breed, icon: "PetsRoundedIcon" },
    {
      label: "Birthday",
      value: formattedBirthday,
      icon: "CakeRoundedIcon",
    },
    { label: "Colour", value: pet.colour, icon: "PaletteRoundedIcon" },
    {
      label: "Allergies",
      value: pet.allergies,
      icon: "LocalHospitalRoundedIcon",
    },
    {
      label: "Other information",
      value: pet.otherinfo,
      icon: "ArticleRoundedIcon",
    },
  ];

  const fetchImage = async () => {
    const response = await fetch(
      `https://dog.ceo/api/breed/${petBreed}/images/random`
    );
    const data = await response.json();
    const imageUrl = data.message;
    setImageUrl(imageUrl);
  };

  useEffect(() => {
    fetchImage();
  }, [petBreed]); // Adding petBreed as dependencies

  return (
    <>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
            paddingTop: "1rem",
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
              <BadgeRoundedIcon />
            </Avatar>
            <Typography variant="h5">{pet.name}'s details</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "1.5rem",
              gap: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#eceff1",
                padding: "1rem",
                borderRadius: "1rem",
                marginBottom: "1rem",
              }}
            >
              <img
                src={imageUrl}
                alt="Dog"
                style={{
                  width: "300px",
                  height: "auto",
                  borderRadius: "1rem",
                  display: imageUrl ? "flex" : "none",
                }}
              />
            </Box>

            <Box sx={{ padding: "1rem", marginBottom: "1rem" }}>
              <List>
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
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default PetInfo;
