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

router.get('/', function (req, res, next) {
    res.send("Sign in!");
});

router.post('/', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    if (email && password) {
        const query = `SELECT * from Users WHERE\
             email="${email}" AND password="${password}";`;
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            if (result.length === 1) {
                let token = jwt.sign({userData: result[0]},
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
