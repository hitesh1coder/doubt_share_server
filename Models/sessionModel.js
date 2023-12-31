const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
