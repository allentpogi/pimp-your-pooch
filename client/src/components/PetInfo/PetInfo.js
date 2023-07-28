import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PET } from "../../utils/queries";
import formatDate from "../../utils/formatdate";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import Avatar from "@mui/material/Avatar";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

const PetInfo = () => {
  const { petId } = useParams();
  const [imageUrl, setImageUrl] = useState("");

  const { loading, data } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId: petId },
  });

  const pet = data?.pet || {};
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

  const getIconComponent = (icon) => {
    switch (icon) {
      case "PetsRoundedIcon":
        return <PetsRoundedIcon />;
      case "CakeRoundedIcon":
        return <CakeRoundedIcon />;
      case "PaletteRoundedIcon":
        return <PaletteRoundedIcon />;
      case "LocalHospitalRoundedIcon":
        return <LocalHospitalRoundedIcon />;
      case "ArticleRoundedIcon":
        return <ArticleRoundedIcon />;
      default:
        return null;
    }
  };

  const fetchImage = async () => {
    const response = await fetch(
      `https://dog.ceo/api/breed/${petBreed}/images/random`
    );
    const data = await response.json();
    const imageUrl = data.message;
    setImageUrl(imageUrl);
  };

  useEffect(() => {
    if (loading) {
      return; // Do not proceed with the fetchImage() if data is still loading
    }

    fetchImage();
  }, [loading, petBreed]); // Adding loading and petBreed as dependencies

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
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
              flexWrap: "wrap",
              marginTop: "1.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ede7f6",
                marginRight: "1rem",
                padding: "1rem",
                borderRadius: "1rem",
              }}
            >
              <img
                src={imageUrl}
                alt="Dog"
                style={{
                  width: "300px",
                  height: "auto",
                  borderRadius: "1rem",
                  //   marginRight: "1rem",
                  display: imageUrl ? "flex" : "none",
                }}
              />
            </Box>
            <Box>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  marginLeft: "1rem",
                }}
              >
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
