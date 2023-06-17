const express = require('express');
const routes = require('./routes/users.js');

const app = express();
const port = 5000;

app.use(express.json());

app.use("/user", routes);

app.listen(port, () => console.log("Server is running at port "+port))