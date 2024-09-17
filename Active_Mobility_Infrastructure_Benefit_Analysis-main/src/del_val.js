const connection = require('./db_connection');

function delete_value(value_id, callback) {
    const sqlQuery = `UPDATE VALUE SET DELETE_FLAG = 1 WHERE VALUE_ID = ${value_id};`;
    connection.query(sqlQuery, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, {val_id: value_id});
        }
    });
}

module.exports = delete_value;
