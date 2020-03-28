let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.redirect('../login');
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.redirect('../login');
    }
};

let checkAdmin = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                if (decoded.email !== "jan@o2.pl") {
                    return res.json({
                        success: false,
                        message: 'You are not authorized!'
                    });
                    //res.redirect
                } else {
                    req.decoded = decoded; //passes data to request
                    next();
                }
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkAdmin: checkAdmin,
    checkToken: checkToken
};