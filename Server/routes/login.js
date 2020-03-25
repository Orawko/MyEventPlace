const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const databaseConfig = require('../helpers/databaseConfig');
const con = mysql.createConnection(databaseConfig);
const config = require('../helpers/config');
let jwt = require('jsonwebtoken');

con.connect(function (err) {
    if (err) throw err;
});

router.post('/', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        const query = `SELECT COUNT(*) as count from Users WHERE\
             email="${username}" AND password="${password}";`;
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            if (result[0].count === 1) {
                let token = jwt.sign({username: username},
                    config.secret,
                    {
                        expiresIn: '2h' // expires in 2 hours
                    }
                );
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                console.log('Incorrect username or password');
                res.sendStatus(403);
            }
        });
    } else {
        console.log('No credentials');
        res.sendStatus(400);
    }
});

module.exports = router;
