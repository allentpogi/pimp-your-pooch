const db = require("../config/connection");
const { User, Pet } = require("../models");
const userSeeds = require("./userSeeds.json");
const petSeeds = require("./petSeeds.json");
const bcrypt = require("bcrypt");

db.once("open", async () => {
  // clean up db
  await Pet.deleteMany({});
  await User.deleteMany({});

  // create users and pets
  const users = await User.insertMany(userSeeds);
  const pets = await Pet.insertMany(petSeeds);

  // randomly assign pets to users
  for (newPet of pets) {
    const tempUser = users[Math.floor(Math.random() * users.length)];
    tempUser.pets.push(newPet._id);
    await tempUser.save();
  }

  console.log("all done!");
  process.exit(0);
});
