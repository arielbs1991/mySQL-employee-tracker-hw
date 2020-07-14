DROP DATABASE IF EXISTS company_managingDB;
CREATE DATABASE company_managingDB;
USE company_managingDB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL FOREIGN KEY,
    PRIMARY KEY (id)
);
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL FOREIGN KEY,
    manager_id INT FOREIGN KEY,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ();

INSERT INTO role (title, salary, department_id)
VALUES();

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES();