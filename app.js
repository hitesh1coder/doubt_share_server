const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const studentAuthRoutes = require("./Routes/studentRouts");
const tutorAuthRoutes = require("./Routes/tutorRoutes");
const sessionRoutes = require("./Routes/sessionRouts");
const doubtRoutes = require("./Routes/doubtRouts");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ success: "Server Started" });
});

//  Routes
app.use("/api/auth", studentAuthRoutes);
app.use("/api/auth", tutorAuthRoutes);
app.use("/api/sesstion", sessionRoutes);
app.use("/api/doubt", doubtRoutes);

const port = process.env.PORT || 5000;

//connet MongoDB Database
mongoose
  .connect(process.env.MONGODB_PORT)
  .then(() => {
    console.log(`DataBase connected`);
  })
  .catch((err) => console.log("connection error: " + err));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
