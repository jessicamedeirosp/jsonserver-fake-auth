const fs = require("fs");
const { createToken } = require("../utils/createToken");
const jsonServer = require("json-server");
const router = jsonServer.router("./db.json");

function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password is required" });
  }

  const dbData = fs.readFileSync("./db.json");
  const newData = JSON.parse(dbData);

  const user = newData.users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  const token = createToken({ id: user.id, email: user.email });
  return res
    .status(200)
    .json({ token, user: { id: user.id, email: user.email } });
}

function register(req, res) {
  const { email, password, ...rest } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password is required" });
  }

  const existingUser = router.db.get("users").find({ email }).value();
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: crypto.randomUUID(),
    password,
    email,
    ...rest,
  };

  router.db.get("users").push(newUser).write();

  return res.status(201).json({ user: newUser });
}

module.exports = {
  login,
  register,
};
