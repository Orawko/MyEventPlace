const express = require('express');
const router = express.Router();
const config = require('../helpers/databaseConfig');
const mysql = require('mysql');
const con = mysql.createConnection(config);

con.connect(function (err) {
    if (err) {
        console.log(err);
    }
});

router.post('/', function (req, res, next) {
    const email = req.body.email;
    const name = req.body.name;
    const surname = req.body.surname;
    const phone = req.body.phone;
    const password = req.body.password;

    const query = `INSERT INTO Users (email, name, surname, phone, password, superuser) \
    VALUES ("${email}", "${name}", "${surname}", "${phone}", "${password}", 0);`;
    console.log(query);
    con.query(query,
        function (err, result, fields) {
            if (err) {
                console.log(err);
            }
            res.send(result);
        });
});

module.exports = router;
