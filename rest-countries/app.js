const http = require("http");
const app = require("./app.js");
const express = require("express");

const jj = express();
const server = http.createServer(app);
jj.use("/", express.static("public"));
server.listen(8000, () => console.log("Server is running on port 8000"));