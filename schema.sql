DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT, 
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(30),
    salary DECIMAL(100,2),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO departments (department) VALUE ("default");
INSERT INTO roles (title, salary, department_id) VALUE ("default", 10000.00, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE ("default", "employee", 1, 1);
