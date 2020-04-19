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

router.get('/users', middleware.checkAdmin, function (req, res, next) {
    const getUsersData = `SELECT * from Users ORDER BY surname DESC, name DESC;`;

    con.query(getUsersData, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

router.get('/pending', middleware.checkAdmin, function (req, res, next) {
    const status = 'pending';
    const getPendingReservations = `SELECT * from Reservations NATURAL JOIN Users NATURAL JOIN Rooms\
    WHERE Reservations.status="${status}" ORDER BY Reservations.dateStart;`;

    con.query(getPendingReservations, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

router.get('/reservations', middleware.checkAdmin, function (req, res, next) {
    const status = 'pending';
    const getAllReservations = `SELECT * from Reservations NATURAL JOIN Users NATURAL JOIN Rooms\
    WHERE Reservations.status!="${status}" ORDER BY Reservations.dateStart;`;

    con.query(getAllReservations, function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});


router.put('/accept', middleware.checkAdmin, function (req, res, next) {
    const idReservations = req.body.idReservations;
    const newStatus = 'confirmed';

    const confirmPendingReservation = `UPDATE Reservations SET status="${newStatus}"\
    WHERE idReservations="${idReservations}" LIMIT 1;`;

    console.log(confirmPendingReservation);
    con.query(confirmPendingReservation, function (err, result, fields) {
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


router.delete('/delete', middleware.checkAdmin, function (req, res, next) {
    const idReservations = req.body.idReservations;

    const deleteReservation = `DELETE FROM Reservations WHERE idReservations="${idReservations}" LIMIT 1;`;

    console.log(deleteReservation);
    con.query(deleteReservation, function (err, result, fields) {
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


router.put('/update', middleware.checkAdmin, function (req, res, next) {
    const idReservations = req.body.idReservations;
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;
    const idRooms = req.body.idRooms;

    const collidingReservations = `SELECT COUNT(*) as collidingReservations from Reservations NATURAL JOIN Rooms \
    WHERE ("${dateStart}" <= dateEnd AND "${dateEnd}" >= dateStart ) AND idRooms=${idRooms} AND idReservations!=${idReservations};`;

    const calculatePrice = `(SELECT DATEDIFF('${dateEnd}', '${dateStart}')+1)* \
    (SELECT pricePerDay from Rooms where idRooms=${idRooms})`;

    const editReservation = `UPDATE Reservations SET dateStart="${dateStart}", dateEnd="${dateEnd}", price=${calculatePrice}\
    WHERE idReservations="${idReservations}" LIMIT 1;`;

    console.log(collidingReservations);
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


router.delete('/user', middleware.checkAdmin, function (req, res, next) {
    const idUsers = req.body.idUsers;

    const deleteQuery = `DELETE FROM Users WHERE idUsers="${idUsers}" LIMIT 1;`;

    console.log(deleteQuery);
    con.query(deleteQuery, function (err, result, fields) {
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
