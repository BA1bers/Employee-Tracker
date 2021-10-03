DROP DATABASE Employees;
CREATE DATABASE Employees;

USE Employees;


CREATE TABLE Department (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR (30)
);



CREATE TABLE Role (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id int,
    FOREIGN KEY (department_id) REFERENCES Department(id)
);


CREATE TABLE Employee(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES Role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) 
);
