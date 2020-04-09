const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../helpers/databaseConfig');
const con = mysql.createConnection(config);
let middleware = require('../helpers/middleware');

con.connect(function (err) {
    if (err) throw err;
});

router.get('/', middleware.checkToken, function (req, res, next) {
    console.log(req.decoded);
    res.send("index");
});

router.get('/result/:from/:to/:maxPricePerDay/:minCapacity', middleware.checkToken, function (req, res, next) {
    const query = `SELECT * from Reservations NATURAL JOIN Rooms WHERE NOT \
    ("${req.params.from}" <= dateEnd AND "${req.params.to}" >= dateStart) AND \
    pricePerDay <= ${req.params.maxPricePerDay} AND capacity >= ${req.params.minCapacity};`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/add/:idUsers/:idRooms/:from/:to', middleware.checkToken, function (req, res, next) {
    const query = `INSERT INTO Reservations (idUsers, idRooms, dateStart, dateEnd, price, status) VALUES \
    ("${req.params.idUsers}", "${req.params.idRooms}", "${req.params.from}", "${req.params.to}", \
    (SELECT DATEDIFF('${req.params.to}', '${req.params.from}')+1)* \
    (SELECT pricePerDay from Rooms where idRooms=${req.params.idRooms}), "pending");`;

    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
