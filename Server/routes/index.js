const express = require('express');
const router = express.Router();
const config = require('../helpers/databaseConfig');
const middleware = require('../helpers/middleware');
const mysql = require('mysql');
const con = mysql.createConnection(config);

con.connect(function (err) {
    if (err) {
        console.log(err);
    }
});

router.get('/result/:dateStart/:dateEnd/:maxPricePerDay/:minCapacity', middleware.checkToken, function (req, res, next) {
    const {dateStart, dateEnd, maxPricePerDay, minCapacity} = req.params;

    const findCollidingRoomNumbers = `SELECT DISTINCT Rooms.roomNumber from Reservations NATURAL JOIN Rooms\
    WHERE ("${dateStart}" <= dateEnd AND "${dateEnd}" >= dateStart)`;

    const reservationLength = `SELECT DATEDIFF('${dateEnd}', '${dateStart}')+1`;

    const findRooms = `SELECT *, (${reservationLength}) as days FROM Rooms WHERE Rooms.roomNumber NOT IN (${findCollidingRoomNumbers})\
    AND pricePerDay < ${maxPricePerDay} AND capacity >= ${minCapacity};`;

    con.query(findRooms, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

router.post('/add', middleware.checkToken, function (req, res, next) {
    const idRooms = req.body.idRooms;
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;

    const findCollidingReservations = `SELECT COUNT(*) as collidingReservations from Reservations NATURAL JOIN Rooms\
    WHERE ("${dateStart}" <= dateEnd AND "${dateEnd}" >= dateStart ) AND idRooms=${idRooms};`;

    const calculatePrice = `(SELECT DATEDIFF('${dateEnd}', '${dateStart}')+1)\
    * (SELECT pricePerDay from Rooms where idRooms=${idRooms})`;

    const createReservation = `INSERT INTO Reservations (idUsers, idRooms, dateStart, dateEnd, price, status) 
    VALUES ("${req.decoded.userData.idUsers}", "${idRooms}", "${dateStart}", "${dateEnd}", ${calculatePrice}, "pending");`;

    con.query(findCollidingReservations, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        if (result[0].collidingReservations === 0) {
            console.log(createReservation);
            con.query(createReservation, function (err, result, fields) {
                if (err) {
                    console.log(err);
                }
                res.send(result);
            });
        } else {
            res.send({success: false});
        }
    });
});

module.exports = router;
