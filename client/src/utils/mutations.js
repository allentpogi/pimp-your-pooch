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
    $birthday: Date
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
      appointments {
        _id
        bookingType
        bookingDate
        notes
      }
    }
  }
`;

export const REMOVE_PET = gql`
  mutation removePet($petId: ID!) {
    removePet(petId: $petId) {
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
        lengthOfstay
        notes
        bookingCompleted
      }
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation addAppointment(
    $petId: ID!
    $bookingType: String!
    $bookingDate: Date!
    $notes: String
  ) {
    addAppointment(
      petId: $petId
      bookingType: $bookingType
      bookingDate: $bookingDate
      notes: $notes
    ) {
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

export const REMOVE_APPOINTMENT = gql`
  mutation removeAppointment($petId: ID!, $appointmentId: ID!) {
    removeAppointment(petId: $petId, appointmentId: $appointmentId) {
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
