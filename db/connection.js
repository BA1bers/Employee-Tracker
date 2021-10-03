const mysql = require("mysql12");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3001",
    user: "root",
    password: "root",
    database: "employee_DB",
});

connection.connect(function (err) {
    if (err) throw err
});
module.exports = connection