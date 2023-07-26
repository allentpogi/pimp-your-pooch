import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $fullname: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      fullname: $fullname
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation addPet(
    $name: String!
    $breed: String!
    $birthday: String
    $colour: String
    $allergies: String
    $otherinfo: String
  ) {
    addPet(
      name: $name
      breed: $breed
      birthday: $birthday
      colour: $colour
      allergies: $allergies
      otherinfo: $otherinfo
    ) {
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
