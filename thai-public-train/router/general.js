const express = require("express");
let train = require("./thailand_public_train_data.json");
const user = express.Router();

user.get("/", function (req, res) {
    return res.status(200).json(train);
})

user.get("/stationId/:stationId", function (req, res) {
    const stationId = req.params.stationId;
    let filtered_station = [];
    for (let station of train) {
        if (station.stationId === stationId) {
            filtered_station.push(station);
        }
    }
    return res.status(200).json(filtered_station);
})

user.get("/lineServiceName/:lineServiceName", function (req, res) {
    const lineServiceName = req.params.lineServiceName;
    let filtered_station = [];
    for (let station of train) {
        if (station.lineServiceName === lineServiceName) {
            filtered_station.push(station);
        }
    }
    return res.status(200).json(filtered_station);
})

user.get("/nameEng/:nameEng", function (req, res) {
    const nameEng = req.params.nameEng;
    let filtered_station = [];
    for (let station of train) {
        if (station.nameEng === nameEng) {
            filtered_station.push(station);
        }
    }
    return res.status(200).json(filtered_station);
})

module.exports = user