
var mysql = require('mysql');
require('dotenv').config();
var connection = mysql.createConnection({
  host : process.env.HOST_SQL,
  user : "272665",
  password : process.env.PASSWORD,
  database: 'mcordonnance_mysql',
  multipleStatements: true
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;