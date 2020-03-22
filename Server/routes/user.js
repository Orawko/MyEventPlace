const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../helpers/databaseConfig');
const con = mysql.createConnection(config);

con.connect(function (err) {
    if (err) throw err;
});

router.get('/', function (req, res, next) {
    res.send("home");
});

//select my reservation
router.get('/:idUser', function (req, res, next) {
    const query = `SELECT * from Reservations NATURAL JOIN Rooms WHERE idUsers=${req.params.idUser};`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//edit date of my reservation
router.get('/edit/:from/:to/:idRooms/:idUsers/:idReservations', function (req, res, next) {
    const collidingReservationsQuery = `SELECT COUNT(*) as count from Reservations NATURAL JOIN Rooms WHERE \
    ("${req.params.from}" <= dateEnd AND "${req.params.to}" >= dateStart ) AND idRooms=${req.params.idRooms};`;
    console.log(collidingReservationsQuery);
    con.query(collidingReservationsQuery, function (err, result, fields) {
        if (err) throw err;
        if (result[0].count === 1) {
            const deleteQuery = `DELETE FROM Reservations WHERE idReservations=${req.params.idReservations} LIMIT 1;`;
            console.log(deleteQuery);
            con.query(deleteQuery, function (err, result, fields) {
                if (err) throw err;
            });

            const newReservationQuery = `INSERT INTO Reservations (idUsers, idRooms, dateStart, dateEnd, price, status) VALUES \
            ("${req.params.idUsers}", "${req.params.idRooms}", "${req.params.from}", "${req.params.to}", \
            (SELECT DATEDIFF('${req.params.to}', '${req.params.from}')+1)* \
            (SELECT pricePerDay from Rooms where idRooms=${req.params.idRooms}), "pending");`;
            console.log(newReservationQuery);
            con.query(newReservationQuery, function (err, result, fields) {
                if (err) throw err;
                res.send(true);
            });

        } else {
            res.send(false);
        }
    });
});

//delete reservation
router.get('/delete/:idReservations', function (req, res, next) {
    const deleteQuery = `DELETE FROM Reservations WHERE idReservations=${req.params.idReservations} LIMIT 1;`;
    console.log(deleteQuery);
    con.query(deleteQuery, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send(false);
        }
        res.send(true);
    });
});

module.exports = router;
