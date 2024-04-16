require("dotenv").config();
const jsonServer = require("json-server");
const bodyParser = require("body-parser");

const { routerAuth } = require("./routers/routerAuth");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

server.use(routerAuth);
server.use(router);

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log(`fake-auth: server running. Port: ${PORT}`);
});
