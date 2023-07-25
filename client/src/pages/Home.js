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
            // sx={{ bgcolor: "#fafafa" }}
            gutterBottom
          >
            Pimp my pooch
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
            // sx={{ bgcolor: "#fafafa" }}
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
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={Image2}
                title="Dog grooming"
                alt="Dog grooming"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                  Grooming services
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={Image3}
                title="Dog boarding"
                alt="Dog boarding"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                  Dog boarding
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={Image4}
                title="Day care"
                alt="Day care"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                  Day care
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
