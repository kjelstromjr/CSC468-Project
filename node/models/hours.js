const { Pool } = require('pg');

const pool = new Pool({
    host: 'postgres',      // matches the service name in docker-compose.yaml
    port: 5432,
    database: 'database',
    user: 'admin',
    password: 'admin'
});

exports.getHours = async (id) => {
    let result = await pool.query('SELECT * FROM hours WHERE employee_id = $1', [id]);
    return result.rows;
}

exports.addHours = async (employee_id, date, amount) => {
    try {
        let result = await pool.query("INSERT INTO hours (employee_id, date, amount) VALUES ($1, $2, $3)", [employee_id, date, amount]);
        return 0;
    } catch (err) {
        console.error(err);
        return -1;
    }
}

// (async () => {
//     console.log(await exports.getAll());
//     console.log(await exports.getUser("jeffreyk"));
// })();