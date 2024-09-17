const connection = require('./db_connection');

function add_value(var_id, var_value, display_style, comment, callback) {
    const sqlQuery = `INSERT INTO VALUE (VAR_ID, VAR_VALUE, DISPLAY_STYLE, COMMENT, DELETE_FLAG) 
                    VALUES (${var_id}, ${var_value}, ${display_style}, \'${comment}\', 0);`;
    connection.query(sqlQuery, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, {var_id: var_id});
        }
    });
}

module.exports = add_value;
