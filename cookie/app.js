const http = require("https");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

app.get("/", async (req, res) => {
    try {
        return res.status(200).cookie("name", "Alice", { maxAge: 3600000});
    } catch(err) {
        return res.status(500).send("Unexpected Error");
    }
})