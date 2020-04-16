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
    // console.log(req.decoded);
    const query = `SELECT * from Reservations NATURAL JOIN Rooms WHERE idUsers=${req.decoded.userData.idUsers};`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//edit date of my reservation
router.post('/edit', middleware.checkToken, function (req, res, next) {
    let idReservations = req.body.idReservations;
    let from = req.body.from;
    let to = req.body.to;
    let idRooms = req.body.idRooms;

    const collidingReservations = `SELECT COUNT(*) as count from Reservations NATURAL JOIN Rooms WHERE \
    ("${from}" <= dateEnd AND "${to}" >= dateStart ) AND idRooms=${idRooms};`;
    console.log(collidingReservations);
    con.query(collidingReservations, function (err, result, fields) {
        if (err) throw err;
        if (result[0].count === 0) {
            const deleteReservation = `DELETE FROM Reservations WHERE idReservations=${idReservations} \
            AND idUsers=${req.decoded.userData.idUsers} LIMIT 1;`;
            console.log(deleteReservation);
            con.query(deleteReservation, function (err, result, fields) {
                if (err) throw err;
            });

            const addNewReservation = `INSERT INTO Reservations (idUsers, idRooms, dateStart, dateEnd, price, status) VALUES \
            ("${req.decoded.userData.idUsers}", "${idRooms}", "${from}", "${to}", \
            (SELECT DATEDIFF('${to}', '${from}')+1)* \
            (SELECT pricePerDay from Rooms where idRooms=${idRooms}), "pending");`;
            console.log(addNewReservation);
            con.query(addNewReservation, function (err, result, fields) {
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
