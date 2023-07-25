const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  birthday: {
    type: Date,
    required: false,
  },
  // appointments: [{}],
});

const Pet = model("Pet", petSchema);

module.exports = Pet;
