const express = require("express");
const routes = require("./router/general.js");

const app = express();

app.use(express.json());

app.use("/", routes);

const port = 5000;

app.listen(port, () => console.log("Server is running on port " + port));