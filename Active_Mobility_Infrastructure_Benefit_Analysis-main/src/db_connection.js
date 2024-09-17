// app.js
const mysql = require('mysql2');

// Create and configure the database connection
const dbConfig = {
    host: '3.93.197.252',
    port: 3306,
    user: 'root',
    password: 'VTstat2024**',
    database: 'wb_website',
    allowPublicKeyRetrieval: true,
    useSSL: false
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.message);
        return;
    }
    console.log('Connected to the MySQL server.');
});

module.exports = connection;
