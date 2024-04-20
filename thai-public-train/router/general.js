const express = require("express");
let train = require("./thailand_public_train_data.json");
const user = express.Router();

user.get("/", function (req, res) {
    return res.status(200).json(train);
})

user.get("/stationId/:stationId", function (req, res) {
    const stationId = req.params.stationId;
    const result = train.find((station) => station.stationId === stationId)

    return res.status(200).json(result);
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
    const result = train.find((station) => station.nameEng === nameEng);

    return res.status(200).json(result);
})

user.get("/lineName/:lineName", function (req, res) {
    const lineName = req.params.lineName;
    let filtered_station = [];

    for (let station of train) {
        if(station.lineName === lineName) {
            filtered_station.push(station);
        }
    }
    
    return res.status(200).json(filtered_station);
})

user.get("/lineNameEng/:lineNameEng", function (req, res) {
    const lineNameEng = req.params.lineNameEng;
    let filtered_station = [];

    for (let station of train) {
        if(station.lineNameEng === lineNameEng) {
            filtered_station.push(station);
        }
    }

    return res.status(200).json(filtered_station);
})

module.exports = user