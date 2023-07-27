import React, { useState } from "react";
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
import Image from "../assets/img/hero-image.png";
import Image2 from "../assets/img/dog-grooming.jpg";
import Image3 from "../assets/img/dog-boarding.jpg";
import Image4 from "../assets/img/dog-day-care.jpg";
import Signup from "./Signup";

const useStyles = makeStyles()(() => ({
  container: {
    backgroundImage: `url(${Image})`,
    backgroundColor: "#b3e5fc",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "4rem 3rem",
    height: "100%",
    width: "100%",
    minHeight: "55vh",
    // minWidth: "100vh",
  },
  cardGrid: {
    padding: "20px 0",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
    // Height: "200px",
    // width: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cardData = [
  { image: Image2, title: "Grooming services", alt: "Dog grooming" },
  { image: Image3, title: "Dog boarding", alt: "Dog boarding" },
  { image: Image4, title: "Day care", alt: "Day care" },
];

const Home = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleSignupButtonClick = () => {
    setIsSignupOpen(true);
  };

  const handleSignupDrawerClose = () => {
    setIsSignupOpen(false);
  };

  const { classes } = useStyles();
  return (
    <>
      <CssBaseline />
      <Box className={classes.container}>
        <Container>
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Pimp my pooch
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Give your fur babies the royal treatment they deserve at our
            dog-gone fabulous grooming and boarding service – where wagging
            tails and pampered paws are our specialty!
          </Typography>
          <Box textAlign="center">
            <Button
              align="center"
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleSignupButtonClick}
            >
              Join the pack
            </Button>
            <Signup isOpen={isSignupOpen} onClose={handleSignupDrawerClose} />
          </Box>
        </Container>
      </Box>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cardData.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={card.image}
                  title={card.title}
                  alt={card.alt}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h5" gutterBottom>
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
