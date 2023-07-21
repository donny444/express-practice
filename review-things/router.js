const express = require("express");
const reviews = require("./reviews.js");
const routes = express.Router();


//get matched reviews array by thing
routes.get("/thing/:thing", (req, res) => {
    const thing = req.params.thing;
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
routes.put("/:user", (req, res) => {
    const user = req.params.user;
    var filteredReviews = reviews.filter((review) => review["User"] == user);
    if (filteredReviews.length > 0) {
        let user = req.query.user;
        
        if(user) {
            for(review of filteredReviews) {
                review["User"] = user;
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