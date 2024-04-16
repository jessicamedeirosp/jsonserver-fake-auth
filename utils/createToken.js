const jwt = require("jsonwebtoken");

function createToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
}

module.exports = {
  createToken,
};
