const mysql = require("mysql2");

const pool = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    port: 3306,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0,

    connectTimeout: 10000

});

pool.getConnection((err, connection) => {

    if (err) {

        console.log("Database connection failed:", err.message);

    } else {

        console.log("Connected to Database");

        connection.release();

    }

});

module.exports = pool;
