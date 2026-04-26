CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    pay INT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role INT DEFAULT 0,
    CONSTRAINT employee FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

CREATE TABLE hours (
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    amount INT CHECK (amount > 0 AND amount <= 24) NOT NULL,
    CONSTRAINT employee FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- For testing
INSERT INTO employees (first_name, last_name, pay) VALUES ('Jeffrey', 'Kjelstrom', 20);
INSERT INTO users (employee_id, username, password) VALUES (1, 'jeffreyk', 'password');
INSERT INTO hours (employee_id, date, amount) VALUES (1, '2024-01-01', 8);