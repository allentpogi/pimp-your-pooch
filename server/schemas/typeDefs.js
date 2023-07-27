const { gql } = require("apollo-server-express");
// const DateScalar = require("../utils/date.scalar");

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    fullname: String
    email: String
    password: String
    pets: [Pet]!
  }

  type Pet {
    _id: ID
    name: String
    breed: String
    birthday: Date
    colour: String
    allergies: String
    otherinfo: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    pets(username: String): [Pet]
    pet(petId: ID!): Pet
    me: User
  }

  type Mutation {
    addUser(
      username: String!
      fullname: String!
      email: String!
      password: String!
    ): Auth
    login(username: String!, password: String!): Auth
    addPet(
      name: String!
      breed: String!
      birthday: Date
      colour: String
      allergies: String
      otherinfo: String
    ): Pet
    removePet(petId: ID!): Pet
  }
`;

module.exports = typeDefs;
