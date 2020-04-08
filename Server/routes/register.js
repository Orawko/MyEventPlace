const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../helpers/databaseConfig');
const con = mysql.createConnection(config);

con.connect(function (err) {
    if (err) throw err;
});

router.post('/', function (req, res, next) {
    let email = req.body.email;
    let name = req.body.name;
    let surname = req.body.surname;
    let phone = req.body.phone;
    let password = req.body.password;

    const query = `INSERT INTO Users (email, name, surname, phone, password, superuser) VALUES \
    ("${email}", "${name}", "${surname}", "${phone}", "${password}", 0);`;
    console.log(query);
    con.query(query,
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
});

module.exports = router;
