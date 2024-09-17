// fetchData.js
const connection = require('./db_connection');

function getAllData(callback) {
    const sqlQuery = 'SELECT * FROM VALUE WHERE DELETE_FLAG = 0';
    connection.query(sqlQuery, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

module.exports = { getAllData };
