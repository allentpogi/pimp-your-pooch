import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "tss-react/mui";

import { ADD_PET } from "../../utils/mutations";
import { QUERY_PETS, QUERY_ME } from "../../utils/queries";

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
        const { pets } = cache.readQuery({ query: QUERY_PETS }) ?? {
          pets: [{}],
        };

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
      clearValue();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const clearValue = (event) => {
    setFormState({
      name: "",
      breed: "",
      birthday: "2001-01-01",
      colour: "",
      allergies: "",
      otherinfo: "",
    });
  };

  const [breedsList, setBreedsList] = useState([]);

  const fetchAllBreeds = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      if (response.ok) {
        const data = await response.json();
        const breeds = Object.keys(data.message); // Extract the breed names from the response
        setBreedsList(breeds);
      } else {
        alert("Sorry, can not display the data");
      }
    } catch (e) {
      alert("Sorry, can not display the data");
    }
  };

  useEffect(() => {
    fetchAllBreeds();
  }, []);

  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "birthday", label: "Birthday", type: "date" },
    { name: "colour", label: "Colour" },
    { name: "allergies", label: "Allergies" },
    { name: "otherinfo", label: "Other information", multiline: true, rows: 2 },
  ];

  return (
    <>
      <Container>
        <CssBaseline />
        <Box
          sx={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <GroupAddRoundedIcon />
          </Avatar>
          <Typography variant="h5">Add a pooch</Typography>
        </Box>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="breed">Breed</InputLabel>
          <Select
            name="breed"
            label="Breed"
            required={true}
            onChange={handleChange}
            labelId="breed"
            value={formState.breed}
          >
            {breedsList.map((breed) => (
              <MenuItem key={breed} value={breed}>
                {breed}
              </MenuItem>
            ))}
          </Select>
          {fields.map((field) => (
            <TextField
              key={field.name}
              required={field.required}
              name={field.name}
              label={field.label}
              value={formState[field.name]}
              fullWidth
              variant="standard"
              multiline={field.multiline}
              rows={field.rows}
              type={field.type}
              onChange={handleChange}
            />
          ))}
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              justifyContent: "right",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={clearValue}
              align="center"
            >
              Clear
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              size="small"
              align="center"
            >
              Add pet
            </Button>
          </Box>
        </FormControl>
      </Container>
    </>
  );
};

export default PetForm;
