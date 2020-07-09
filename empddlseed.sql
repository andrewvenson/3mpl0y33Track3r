DROP DATABASE IF EXISTS  employeetracker;

CREATE DATABASE employeetracker;

USE employeetracker;


CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL, 
);

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL,
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL, 
);

