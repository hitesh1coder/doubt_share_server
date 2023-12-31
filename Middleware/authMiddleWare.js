const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRECT_KEY, (err, decodedToken) => {
      if (err) {
        res.sendStatus(401).json({ message: "Unauthorized" });
      } else {
        next();
      }
    });
  } else {
    res.send(401).json({ message: "Please Login Again" });
  }
};

module.exports = { requireAuth };
