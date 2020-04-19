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

router.get('/', middleware.checkToken, function (req, res, next) {
    const getUserReservations = `SELECT * from Reservations NATURAL JOIN Rooms WHERE idUsers=${req.decoded.userData.idUsers};`;

    con.query(getUserReservations, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

router.put('/edit', middleware.checkToken, function (req, res, next) {
    const status = "pending";
    const idReservations = req.body.idReservations;
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;
    const idRooms = req.body.idRooms;

    const collidingReservations = `SELECT COUNT(*) as collidingReservations from Reservations NATURAL JOIN Rooms \
    WHERE ("${dateStart}" <= dateEnd AND "${dateEnd}" >= dateStart ) AND idRooms=${idRooms} AND idReservations!=${idReservations};`;

    const calculatePrice = `(SELECT DATEDIFF('${dateEnd}', '${dateStart}')+1)* \
    (SELECT pricePerDay from Rooms where idRooms=${idRooms})`;

    const editReservation = `UPDATE Reservations SET dateStart="${dateStart}", dateEnd="${dateEnd}", price=${calculatePrice},\
    status="${status}" WHERE idReservations="${idReservations}" AND idUsers=${req.decoded.userData.idUsers} LIMIT 1;`;

    con.query(collidingReservations, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        if (result[0].collidingReservations === 0) {

            console.log(editReservation);
            con.query(editReservation, function (err, result, fields) {
                if (err) {
                    console.log(err);
                }
                res.send({success: true});
            });
        } else {
            res.send({success: false});
        }
    });
});

router.delete('/delete', middleware.checkToken, function (req, res, next) {
    const idReservations = req.body.idReservations;

    const deleteUserReservation = `DELETE FROM Reservations\
    WHERE idReservations=${idReservations} AND idUsers=${req.decoded.userData.idUsers} LIMIT 1;`;

    console.log(deleteUserReservation);
    con.query(deleteUserReservation, function (err, result, fields) {
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

module.exports = router;
