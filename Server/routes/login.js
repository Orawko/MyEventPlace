const express = require('express');
const router = express.Router();
const databaseConfig = require('../helpers/databaseConfig');
const middleware = require('../helpers/middleware');
const config = require('../helpers/config');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const con = mysql.createConnection(databaseConfig);

con.connect(function (err) {
    if (err) {
        console.log(err);
    }
});

router.get('/', middleware.checkToken, function (req, res, next) {
    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    res.send({timeLeft: req.decoded.exp - secondsSinceEpoch});
});

router.post('/', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        const findUser = `SELECT * from Users WHERE email="${email}" AND password="${password}";`;

        con.query(findUser, function (err, result, fields) {
            if (err) {
                console.log(err);
            }
            if (result.length === 1) {
                let token = jwt.sign({userData: result[0]},
                    config.secret,
                    {
                        expiresIn: '2h'
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
