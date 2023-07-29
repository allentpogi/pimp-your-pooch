import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      fullname
      email
      pets {
        _id
        name
        breed
        birthday
        colour
        allergies
        otherinfo
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      fullname
      email
      pets {
        _id
        name
        breed
        birthday
        colour
        allergies
        otherinfo
      }
    }
  }
`;

export const QUERY_PETS = gql`
  query getPets {
    pets {
      _id
      name
      breed
      birthday
      colour
      allergies
      otherinfo
    }
  }
`;

export const QUERY_SINGLE_PET = gql`
  query getSinglePet($petId: ID!) {
    pet(petId: $petId) {
      _id
      name
      breed
      birthday
      colour
      allergies
      otherinfo
      appointments {
        _id
        bookingType
        bookingDate
        notes
      }
    }
  }
`;
