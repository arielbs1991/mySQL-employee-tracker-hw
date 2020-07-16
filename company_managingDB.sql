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
    department_name INT NOT NULL REFERENCES department(name),
    PRIMARY KEY (id)
);
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_title INT NOT NULL REFERENCES role(title),
    manager_name INT REFERENCES employee(name),
    PRIMARY KEY (id)
);