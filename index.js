const express = require("express");
const router = require("./router.js");

const app = express();

app.use(express.json());

const { API_PORT } = process.env;
const port = process.env.API_PORT || API_PORT;

app.use("/", router);

app.listen(port,() => console.log(`Server is running on port ${port}`));