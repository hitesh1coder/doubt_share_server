const express = require("express");
const {
  registeStudent,
  loginStudent,
} = require("../Controller/authController");

const router = express.Router();

router.post("/signup/student", registeStudent);
router.post("/login/student", loginStudent);

module.exports = router;
