import React from "react";
import {
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
import { lightBlue } from "@mui/material/colors";

const useStyles = makeStyles()(() => ({
  container: {
    backgroundImage: `url(${Image})`,
    backgroundColor: "lightBlue",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "80px 80px",
    height: "100%",
    width: "100%",
    minHeight: "60vh",
    // minWidth: "100vh",
  },
}));

const Home = () => {
  const { classes } = useStyles();
  return (
    <>
      <CssBaseline />
      <div className={classes.container}>
        <Container maxWidth="sm">
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
            The easiest way to book your dog services.
          </Typography>
          {/* <img src={Image} alt="dogs" /> */}
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image=""
                title="image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                  Grooming
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Grooming services blah blah
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
