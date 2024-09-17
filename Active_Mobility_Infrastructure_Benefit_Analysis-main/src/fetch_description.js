// fetch_description.js
const connection = require('./db_connection');

function getDescription(callback) {
    const sqlQuery = 'SELECT * FROM VAR_DESCRIPT';
    connection.query(sqlQuery, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

module.exports = { getDescription };
