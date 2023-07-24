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
import Image2 from "../assets/img/dog-grooming.jpg";
import Image3 from "../assets/img/dog-boarding.jpg";
import Image4 from "../assets/img/dog-day-care.jpg";
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
    Height: "200px",
    width: "100%",
  },
  cardContent: {
    flexGrow: 1,
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
          <Grid item>
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
          <Grid item>
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
