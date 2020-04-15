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
    const findCollidingRoomNumbers = `SELECT DISTINCT Rooms.roomNumber\
    from Reservations NATURAL JOIN Rooms WHERE \
    ("${req.params.from}" <= dateEnd AND "${req.params.to}" >= dateStart) AND \
    pricePerDay < ${req.params.maxPricePerDay} AND capacity >= ${req.params.minCapacity}`;

    const reservationLength = `SELECT DATEDIFF('${req.params.to}', '${req.params.from}')+1`;

    const query = `SELECT *, (${reservationLength}) as days FROM Rooms WHERE Rooms.roomNumber NOT IN (${findCollidingRoomNumbers});`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/add', middleware.checkToken, function (req, res, next) {
    let idRooms = req.body.idRooms;
    let from = req.body.from;
    let to = req.body.to;

    const findCollidingReservations = `SELECT COUNT(*) as collidingReservations from Reservations NATURAL JOIN Rooms WHERE \
    ("${from}" <= dateEnd AND "${to}" >= dateStart ) AND idRooms=${idRooms};`;

    const insertNewReservation = `INSERT INTO Reservations (idUsers, idRooms, dateStart, dateEnd, price, status) VALUES \
    ("${req.decoded.userData.idUsers}", "${idRooms}", "${from}", "${to}", \
    (SELECT DATEDIFF('${to}', '${from}')+1)* \
    (SELECT pricePerDay from Rooms where idRooms=${idRooms}), "pending");`;

    con.query(findCollidingReservations, function (err, result, fields) {
        if (err) throw err;
        if (result[0].collidingReservations === 0) {
            console.log(insertNewReservation);
            con.query(insertNewReservation, function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            });
        } else {
            res.send(false);
        }
    });
});

module.exports = router;
