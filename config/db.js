const mysql = require('mysql2');

const pool = mysql.createPool({

    host: 'localhost',

    user: 'root',

    password: 'Rajesh@123',

    database: 'Recordent',

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});


// ✅ Test connection and show log

pool.getConnection((err, connection) => {

    if(err){

        console.log("Database connection failed:", err.message);

    }
    else{

        console.log("Connected to database successfully");

        connection.release();

    }

});


module.exports = pool;
