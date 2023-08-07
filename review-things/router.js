require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const reviews = require("./reviews.js");
const users = require("./users.js");
const auth = require("./auth.js");
const routes = express.Router();

//Register
routes.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!(username && password)) {
            res.status(400).send("Please provide username and password");
        }
        const existUser = await users.filter((user) => user.username === username);
        if(existUser.length > 0) {
            return res.status(409).send("Username existed");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        user = {username: username, password: password};
        users.push(user);

        const token = jwt.sign(
            { username, password },
            process.env.TOKEN_KEY,
            {
                expiresIn: 60 * 60
            }
        )

        user.token = token;

        res.status(201).json(user);
    } catch(err) {
        console.log(err);
    }
})

//Login
routes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.query;

        if(!(username && password)) {
            res.status(400).send("Please provide username and password");
        }

        const user = await users.find((user) => user.username === username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { username, password },
                process.env.TOKEN_KEY,
                {
                    expiresIn: 60 * 60
                }
            )
            
            user.token = token;

            res.status(200).send(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch(err) {
        console.log(err);
    }
})

routes.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome");
})

//get matched reviews array by thing
routes.get("/thing/:thing", (req, res) => {
    const thing = req.params.thing || req.query.thing;
    let filteredReviews = [];

    for(let review of reviews) {
        if(review.Thing === thing) {
            filteredReviews.push(review);
        }
    }
    return res.status(200).json(filteredReviews);
});

//Add review object to reviews array
routes.post("/review", (req, res) => {
    const user = req.query.user
    const thing = req.query.thing
    const stars = req.query.stars
    const description = req.query.description

    const newReview = {"User": user, "Thing": thing, "Stars": stars, "Description": description};
    reviews.push(newReview);
    return res.status(200).json(newReview);
});

//Change user value
routes.put("/:olduser/:newuser", (req, res) => {
    const olduser = req.params.olduser || req.query.olduser;
    var filteredReviews = reviews.filter((review) => review["User"] == olduser);
    if (filteredReviews.length > 0) {
        const newuser = req.params.newuser || req.query.newuser
        
        if(newuser) {
            for(review of filteredReviews) {
                review["User"] = newuser;
            }
        }
    }
    return res.status(200).json(filteredReviews);
});


//Delete review object with matched user value
routes.delete("/:user", (req, res) => {
    const user = req.params.user;
    filteredReviews = reviews.filter((review) => review["User"] == user);
    for(let review of reviews) {
        if(review["User"] == user) {
            reviews.splice(review, 1);
        }
    }
    return res.status(200).json(filteredReviews);
});

module.exports = routes;