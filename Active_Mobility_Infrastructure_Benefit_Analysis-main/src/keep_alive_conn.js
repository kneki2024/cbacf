const connection = require('./db_connection');

function keep_alive_conn() {
    console.log('Start');
    const keepAliveQuery = () => {
        connection.query('SELECT 1', (err, results) => {
            if (err) {
                console.error('Error executing keep-alive query:', err);
                return;
            }
                console.log('Keep-alive query executed at', new Date());
            });
    };

    setInterval(keepAliveQuery, 10 * 60 * 1000);
}


module.exports = keep_alive_conn;