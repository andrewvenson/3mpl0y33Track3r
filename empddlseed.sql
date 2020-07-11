DROP DATABASE IF EXISTS  employeetracker;

CREATE DATABASE employeetracker;

USE employeetracker;

CREATE TABLE department(
    dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL
);

CREATE TABLE role(
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    dept_id INT NOT NULL, 
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

CREATE TABLE employees(
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL, 
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);


