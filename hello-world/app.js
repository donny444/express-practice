const express = require("express");
const app = express();

app.use(function (req, res, next) {
    console.log('Middleware Time: %d', Date.now());
    console.log(req.baseUrl);
    next();
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
})
app.route("/any")
    .get(function (req, res, next) {
        res.set("Content-Type", "text/html");
        return res.send("Hello GET");
    })
    .post(function (req, res, next) {
        res.set("Content-Type", "text/html");
        return res.send("Hello POST");
    })
    .put(function (req, res, next) {
        res.set("Content-Type", "text/html");
        return res.send("Hello PUT");
    })
    .delete(function (req, res, next) {
        res.set("Content-Type", "text/html");
        return res.send("Hello DELETE");
    })

app.listen(3000, () => {
    console.log(`Example app listen on port 3000`);
})