let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        console.log('token missing!');
    }
};

let checkAdmin = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log(err);
            } else if (decoded.userData.superuser === 1) {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        console.log('token missing!');
    }
};

module.exports = {
    checkAdmin: checkAdmin,
    checkToken: checkToken
};