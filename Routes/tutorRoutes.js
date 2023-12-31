const express = require("express");
const {
  registeTutor,
  loginTutor,
} = require("../Controller/tutorAuthController");

const router = express.Router();

router.post("/signup/tutor", registeTutor);
router.post("/login/tutor", loginTutor);

module.exports = router;
