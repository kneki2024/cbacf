const connection = require('./db_connection');

function login(username, callback) {
    const sqlQuery = `SELECT PASSWORD FROM USER WHERE USERNAME = \'${username}\'`;
    connection.query(sqlQuery, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

module.exports = login;