const express = require("express");
const {
  createNewDoubt,
  getStudentDoubts,
} = require("../Controller/DoubtController");
const { requireAuth } = require("../Middleware/authMiddleWare");

const router = express.Router();

router.post("/create", createNewDoubt);
router.get("/", getStudentDoubts);

module.exports = router;
