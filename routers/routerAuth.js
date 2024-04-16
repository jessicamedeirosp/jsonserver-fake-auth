const jsonServer = require("json-server");

const { login, register } = require("../controllers/auth");

const routerAuth = jsonServer.create();

routerAuth.post("/login", login);

routerAuth.post("/register", register);

module.exports = {
  routerAuth,
};
