const { Pool } = require('pg');

const pool = new Pool({
    host: 'postgres',      // matches the service name in docker-compose.yaml
    port: 5432,
    database: 'database',
    user: 'admin',
    password: 'admin'
});

exports.getAll = async () => {
    let result = await pool.query('SELECT id, employee_id, username, role FROM users');
    return result.rows;
}

exports.getUser = async (id) => {
    let result = await pool.query('SELECT id, employee_id, username, role FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

exports.addUser = async (employee_id, username, password, role = 0) => {
    try {
        let result = await pool.query("INSERT INTO users (employee_id, username, password, role) VALUES ($1, $2, $3, $4) RETURNING id", [employee_id, username, password, role]);
        return result.rows[0].id;
    } catch (err) {
        console.error(err);
        return -1;
    }
}

exports.deleteUser = async (id) => {
    try {
        let result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        return 0;
    } catch (err) {
        console.error(err);
        return -1;
    }
}

exports.checkUser = async (username, password) => {
    let result = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);
    return result.rows[0];
}

// (async () => {
//     console.log(await exports.getAll());
//     console.log(await exports.getUser("jeffreyk"));
// })();