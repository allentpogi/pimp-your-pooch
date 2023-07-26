import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";

import { ADD_PET } from "../../utils/mutations";
import { QUERY_PETS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const PetForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    breed: "",
    birthday: "2001-01-01",
    colour: "",
    allergies: "",
    otherinfo: "",
  });

  const [addPet, { error }] = useMutation(ADD_PET, {
    update(cache, { data: { addPet } }) {
      try {
        const { pets } = cache.readQuery({ query: QUERY_PETS });
        console.log(pets);

        cache.writeQuery({
          query: QUERY_PETS,
          data: { pets: [addPet, ...pets] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, pets: [...me.pets, addPet] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPet({
        variables: {
          ...formState,
        },
      });

      setFormState({
        name: "",
        breed: "",
        birthday: "2001-01-01",
        colour: "",
        allergies: "",
        otherinfo: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // console.log(name);
    // console.log(value);

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container>
      <CssBaseline />
      {Auth.loggedIn() ? (
        <>
          <Typography variant="h6" gutterBottom>
            Add a pet
          </Typography>
          <FormControl>
            <TextField
              required
              name="name"
              label="Name"
              value={formState.name}
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              required
              name="breed"
              label="Breed"
              value={formState.breed}
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              type="date"
              name="birthday"
              label="Birthday"
              value={formState.birthday}
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              name="colour"
              label="colour"
              value={formState.colour}
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              name="allergies"
              label="Allergies"
              value={formState.allergies}
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="otherinfo"
              name="otherinfo"
              label="Other information"
              value={formState.otherinfo}
              fullWidth
              variant="standard"
              multiline
              rows={2}
              onChange={handleChange}
            />
            <Box>
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
              >
                Add pet
              </Button>
            </Box>
          </FormControl>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </Container>
  );
};

export default PetForm;
