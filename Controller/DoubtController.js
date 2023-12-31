const Doubt = require("../Models/doubtsModel");
const dotenv = require("dotenv");
dotenv.config();

const createNewDoubt = async (req, res) => {
  const { doubt, subject, studentId } = req.body;

  try {
    if (!doubt || !subject || !studentId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newDoubt = new Doubt({ text: doubt, subject, student: studentId });
    await newDoubt.save();

    res.status(201).json({ newDoubt, message: "New doubt created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getStudentDoubts = async (req, res) => {
  const { studentId, sort, subject } = req.query;
  console.log(sort);

  const filter = {};

  if (subject) {
    filter.subject = subject;
  }
  if (studentId) {
    filter.student = studentId;
  }
  const sortQuery = sort.order === "asc" ? 1 : -1;
  try {
    if (!studentId) {
      return res.status(400).json({ message: "unAthorized" });
    }

    const doubts = await Doubt.find(filter).sort({ createdAt: sortQuery });
    res.status(200).json(doubts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createNewDoubt,
  getStudentDoubts,
};
