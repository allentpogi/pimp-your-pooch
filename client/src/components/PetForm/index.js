import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_PET } from "../../utils/mutations";
import { QUERY_PETS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const PetForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    breed: "",
    birthday: "",
  });

  const [addPet, { error }] = useMutation(ADD_PET, {
    update(cache, { data: { addPet } }) {
      try {
        const { pets } = cache.readQuery({ query: QUERY_PETS });

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

      setFormState("");
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

  return (
    <div>
      <h3>Add pet</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="name"
                placeholder="Pet name"
                value={formState.name}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              >
                Name
              </textarea>
              <textarea
                name="breed"
                placeholder="Pet breed"
                value={formState.breed}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              >
                Breed
              </textarea>
              <textarea
                name="birthday"
                placeholder="birthday"
                value={formState.birthday}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              >
                Birthday
              </textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Pet
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PetForm;
