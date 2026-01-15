const mySQL = require("mysql2/promise");

const connection = mySQL.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "apbatech",
    port: 8889
});

connection.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection;