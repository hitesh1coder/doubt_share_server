const express = require("express");
const {
  createNewDoubt,
  getStudentDoubts,
} = require("../Controller/DoubtController");

const router = express.Router();

router.post("/create", createNewDoubt);
router.get("/", getStudentDoubts);

module.exports = router;
