const express = require("express");
const router = require("router.js").general;

const app = express();

app.use(express.json());

const port = 8000;

app.use("/", router);

app.listen(port,() => console.log("Server is running on port " + port));