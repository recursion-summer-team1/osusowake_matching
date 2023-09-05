const mysql = require('mysql');

const pool = mysql.createPool({
  host : 'db',
  user : 'root',
  password : 'pass',
  port : 3306,
  database: 'dbname'
});

module.exports = pool;