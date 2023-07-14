const express = require("express");
let reviews = require("reviews.js");
const routes = express.Router();

routes.get("/thing/:thing", (req, res) => {
    const thing = req.params.thing;
    let reviewsArray = Object.values(reviews);
    let filteredReviews = []

    for(let review of reviewsArray) {
        if (review.thing === thing) {
            filteredReviews.push(review);
        }
    }
    return res.status(200).json({ message: filteredReviews});
})

routes.post("/review", (req, res) => {
    var user = req.query.user;
    var thing = req.query.thing;
    var stars = req.query.stars;
    var description = req.query.description;
    const count = reviews.length;

    const newReview = {count: {"User": user, "Thing": thing, "Stars": stars, "Description": description}};

    reviews.push(newReview);

    return res.status(200).json({message: newReview});
})

module.exports.general = routes;