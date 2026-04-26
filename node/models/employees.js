const { Pool } = require('pg');

const pool = new Pool({
    host: 'postgres',      // matches the service name in docker-compose.yaml
    port: 5432,
    database: 'database',
    user: 'admin',
    password: 'admin'
});

exports.getAll = async () => {
    let result = await pool.query('SELECT id, first_name, last_name, pay FROM employees');
    return result.rows;
}

exports.getEmployee = async (id) => {
    let result = await pool.query('SELECT id, first_name, last_name, pay FROM employees WHERE id = $1', [id]);
    return result.rows[0];
}

exports.addEmployee = async (firstName, lastName, pay) => {
    try {
        let result = await pool.query("INSERT INTO employees (first_name, last_name, pay) VALUES ($1, $2, $3) RETURNING id", [firstName, lastName, pay]);
        return result.rows[0].id;
    } catch (err) {
        console.error(err);
        return -1;
    }
}

exports.deleteEmployee = async (id) => {
    try {
        let result = await pool.query("DELETE FROM employees WHERE id = $1", [id]);
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