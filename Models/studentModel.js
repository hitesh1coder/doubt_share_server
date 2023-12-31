const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userType: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  doubts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doubt" }],
});

const User = mongoose.model("Student", studentSchema);

module.exports = User;
