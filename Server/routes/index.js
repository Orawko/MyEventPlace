let express = require('express');
let router = express.Router();
let mysql = require('mysql');
const config = require('../helpers/databaseConfig');
const con = mysql.createConnection(config);

con.connect(function(err) {
  if (err) throw err;
});


router.get('/', function(req, res, next) {
  con.query("SELECT * FROM Rooms",
      function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});



module.exports = router;
