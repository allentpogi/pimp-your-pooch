const { AuthenticationError } = require("apollo-server-express");
const { User, Pet } = require("../models");
const { signToken } = require("../utils/auth");
const DateScalar = require("../utils/date.scalar");

const resolvers = {
  Date: DateScalar,
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("pets");
    },
    pets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Pet.find(params).sort({ name: -1 });
    },
    pet: async (parent, { petId }) => {
      return Pet.findOne({ _id: petId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("pets");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, fullname, email, password }) => {
      const user = await User.create({ username, fullname, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addPet: async (
      parent,
      { name, breed, birthday, colour, allergies, otherinfo },
      context
    ) => {
      if (context.user) {
        const pet = await Pet.create({
          name,
          breed,
          birthday,
          colour,
          allergies,
          otherinfo,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pets: pet._id } }
        );

        return pet;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePet: async (parent, { petId }, context) => {
      if (context.user) {
        const pet = await Pet.findOneAndDelete({
          _id: petId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pets: pet._id } }
        );

        return pet;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addAppointment: async (
      parent,
      { petId, bookingType, bookingDate, notes },
      context
    ) => {
      if (context.user) {
        return Pet.findOneAndUpdate(
          { _id: petId },
          {
            $addToSet: {
              appointments: {
                bookingType,
                bookingDate,
                notes,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeAppointment: async (parent, { petId, appointmentId }, context) => {
      if (context.user) {
        return Pet.findOneAndUpdate(
          { _id: petId },
          {
            $pull: {
              appointments: {
                _id: appointmentId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
