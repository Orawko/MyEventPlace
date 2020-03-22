const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../helpers/databaseConfig');
const con = mysql.createConnection(config);

con.connect(function (err) {
    if (err) throw err;
});

router.get('/:email/:name/:surname/:phone/:password', function (req, res, next) {
    const query = `INSERT INTO Users (email, name, surname, phone, password, superuser) VALUES \
    ("${req.params.email}", "${req.params.name}", "${req.params.surname}", \
    "${req.params.phone}", "${req.params.password}", 0);`;
    console.log(query);
    con.query(query,
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
});

module.exports = router;
