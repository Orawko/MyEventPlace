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
    const query = `SELECT * from Reservations NATURAL JOIN Rooms WHERE idUsers=${req.decoded.userData.idUsers};`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//edit date of my reservation
router.get('/edit/:from/:to/:idRooms/:idUsers/:idReservations', middleware.checkToken, function (req, res, next) {
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
            ("${req.decoded.userData.idUsers}", "${req.params.idRooms}", "${req.params.from}", "${req.params.to}", \
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
router.delete('/delete', middleware.checkToken, function (req, res, next) {
    let idReservations = req.body.idReservations;

    const deleteMyReservation = `DELETE FROM Reservations WHERE idReservations=${idReservations} \
    AND idUsers=${req.decoded.userData.idUsers} LIMIT 1;`;
    console.log(deleteMyReservation);
    con.query(deleteMyReservation, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        if (result.affectedRows === 1) {
            res.send({success: true});
        } else {
            res.send({success: false});
        }
    });
});

// //delete reservation
// router.get('/delete/:idReservations', middleware.checkToken, function (req, res, next) {
//     const deleteQuery = `DELETE FROM Reservations WHERE idReservations=${req.params.idReservations} LIMIT 1;`;
//     console.log(deleteQuery);
//     con.query(deleteQuery, function (err, result, fields) {
//         if (err) {
//             console.log(err);
//         }
//         if (result.affectedRows === 1) {
//             res.send(true);
//         } else {
//             res.send(false);
//         }
//     });
// });

module.exports = router;
