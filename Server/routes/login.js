const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../helpers/databaseConfig');
const con = mysql.createConnection(config);

con.connect(function (err) {
    if (err) throw err;
});

router.get('/:email/:password', function (req, res, next) {
    const query = `SELECT COUNT(*) as count from Users where email="${req.params.email}" AND password="${req.params.password}";`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        if (result[0].count === 1) {
            console.log(`Successful login: ${req.params.email}`);
            res.send(true);
        } else {
            console.log(`Failed to login user: ${req.params.email}`);
            res.send(false);
        }
    });
});

module.exports = router;
