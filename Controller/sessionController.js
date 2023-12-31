const express = require("express");
const Session = require("../Models/sessionModel");

const getSession = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch ongoing sessions for the student
    const ongoingSessions = await Session.find({
      student: studentId,
      endTime: { $exists: false }, // Sessions without an end time are considered ongoing
    }).populate("tutor"); // Populate the tutor details

    res.json(ongoingSessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getSession };
