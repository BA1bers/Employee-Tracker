const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3001",
    user: "root",
    password: "1H34ryoukn0ck1ng!",
    database: "Employees",
});

connection.connect(function (err) {
    if (err) throw err
});
module.exports = connection