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
      }
    }
  }
`;

export const QUERY_PETS = gql`
  query getPets {
    pets {
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
