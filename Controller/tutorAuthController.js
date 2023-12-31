const Tutor = require("../Models/tutorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const registeTutor = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await Tutor.findOne({ email });
    if (existingUser) {
      return res.status(502).send({
        status: "failed",
        message: "This user already exists",
      });
    }
    if (!email || !password || !name) {
      return res.status(503).send({
        status: "failed",
        message: "All fields required",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await Tutor.create({
      name,
      email,
      password: encryptedPassword,
    });
    const jwtToken = jwt.sign(
      { email, password: encryptedPassword },
      process.env.JWT_SECRECT_KEY,
      { expiresIn: 1800 }
    );
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      status: "success",
      userType: "tutor",
      name: user.name,
      userid: user._id,
      message: "Tutor Registered successfully",
      token: jwtToken,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "fail", message: "Something went wrong" });
  }
};

const loginTutor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Tutor.findOne({ email });

    if (!user) {
      return res.status(502).send({
        status: "failed",
        message: "This username is not registered",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(501).send({
        status: "failed",
        message: "Credentials did not match",
      });
    }

    const jwtToken = jwt.sign({ email }, process.env.JWT_SECRECT_KEY, {
      expiresIn: 1800,
    });
    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).send({
      status: "success",
      userType: "tutor",
      name: user.name,
      userid: user._id,
      message: "Tutor logged in successfully",
      token: jwtToken,
    });
  } catch (error) {
    res.status(503).send({
      error: error,
      status: "failed",
      message: "Incorrect credentials",
    });
  }
};

module.exports = { registeTutor, loginTutor };
