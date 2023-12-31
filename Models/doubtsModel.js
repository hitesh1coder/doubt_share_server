// doubtModel.js
const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    subject: {
      type: String,
      enum: ["Mathmatics", "Science", "English"],
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor" },
    isResolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Doubt = mongoose.model("Doubt", doubtSchema);

module.exports = Doubt;
