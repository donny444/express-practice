const express = require("express");
const app = express();
const port = 3000;

app.use("/static", express.static("public"));

app.listen(port, () => {
    console.log(`Example app listen on port ${port}`);
});