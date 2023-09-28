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
        const existUser = await users.find((user) => user.username === username);
        if(existUser) {
            return res.status(409).send("Username existed");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        user = {username: username, password: encryptedPassword};
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
        return res.status(500),send("An error occurred");
    }
})

//Login
routes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!(username && password)) {
            return res.status(400).send("Please provide username and password");
        }

        const user = await users.find((user) => user.username === username);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch /*Error*/) {
            const token = jwt.sign(
                { username, password },
                process.env.TOKEN_KEY,
                {
                    expiresIn: 60 * 60
                }
            )
            
            user.token = token;

            return res.status(200).send(user);
        } else {
            return res.status(400).send("Invalid Credentials");
        }
    } catch(err) {
        console.error(err);
        return res.status(500),send("An error occurred");
    }
})

routes.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome");
})

//get matched reviews array by thing
routes.get("/thing/:thing", async (req, res) => {
    const thing = req.params.thing;
    try {
        if(!thing) {
            return res.status(406).send("Please enter thing to find");
        }
        let filteredReviews = reviews.filter((review) => review["Thing"] === thing);
        return res.status(200).json(filteredReviews);
    } catch(err) {
        console.error(err);
    }
});

//Add review object to reviews array
routes.post("/review", async (req, res) => {
    const user = req.body.user
    const thing = req.body.thing
    const stars = req.body.stars
    const description = req.body.description
    try {
        if(!(user && thing && stars && description)) {
            return res.status(406).send("All input is required");
        }
        if(stars > 5 || stars < 1) {
            return res.status(406).send("Stars have to be between 1-5");
        }
        if(description.length > 200) {
            return res.status(406).send("The description text is limited to 200");
        }
        const newReview = {"User": user, "Thing": thing, "Stars": stars, "Description": description};
        reviews.push(newReview);
        return res.status(200).json(newReview);
    } catch(err) {
        console.error(err);
    }
});

//Change user value
routes.put("/:oldUsername", async (req, res) => {
    const oldUsername = req.params.oldUsername;
    const newUsername = req.body.newUsername;
    try {
        if(!oldUsername) {
            return res.status(406).send("Please enter old username");
        }
        const existUser = reviews.find((review) => review["User"] == oldUsername);
        if (!existUser) {
            return res.status(404).send("The username doesn't exist");
        }
        if(!newUsername) {
            return res.status(406).send("Please enter new username");
        }
        existUser["User"] = newUsername;
        return res.status(200).json(existUser);
    } catch(err) {
        console.error(err);
    }
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