const express = require("express");
let reviews = require("./reviews.json");
const routes = express.Router();

routes.get("/thing/:thing", (req, res) => {
    const thing = req.params.thing;
    let filteredReviews = [];

    for(let review of reviews) {
        if (review.Thing === thing) {
            filteredReviews.push(review);
        }
    }
    return res.status(200).json({ result: filteredReviews});
});

routes.post("/review", (req, res) => {
    const user = req.query.user;
    const thing = req.query.thing;
    const stars = req.query.stars;
    const description = req.query.description;

    const newReview = {"User": user, "Thing": thing, "Stars": stars, "Description": description};

    reviews.push(newReview);

    return res.status(200).json({result: [newReview]});
});

routes.put("/:user", (req, res) => {
    const user = req.params.user;
    var filteredReviews = reviews.filter((review) => review.User = user);
    if (filteredReviews.length > 0) {
        let user = req.query.user;
        let thing = req.query.thing;
        let stars = req.query.stars;
        let description = req.query.description;
        
        if(user) {
            filteredReviews.User = user;
        }
        if(thing) {
            filteredReviews.Thing = thing;
        }
        if(stars) {
            filteredReviews.Stars = stars;
        }
        if(description) {
            filteredReviews.Description = description;
        }
    }
    return res.status(200).json({result: filteredReviews});
});

routes.delete("/:user", (req, res) => {
    const user = req.params.user;
    filteredReviews = reviews.filter((review) => review.User = user);
    return res.status(200).json({result: filteredReviews});
});

module.exports = routes;