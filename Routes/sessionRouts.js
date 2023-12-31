const express = require("express");
const { getSession } = require("../Controller/sessionController");

const router = express.Router();

router.get("/ongoing-sessions/:studentId", getSession);

module.exports = router;
