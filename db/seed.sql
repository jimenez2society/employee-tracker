DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;
CREATE TABLE department(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30)
);
CREATE TABLE role(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE

);
CREATE TABLE employee(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE

);

-- Seed data for the "department" table
INSERT INTO department (name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance'),
    ('Engineering');

-- Seed data for the "role" table
INSERT INTO role (title, salary, department_id) VALUES
    ('Sales Manager', 50000, 1),
    ('Sales Representative', 30000, 1),
    ('Marketing Coordinator', 35000, 2),
    ('Financial Analyst', 45000, 3),
    ('Software Engineer', 60000, 4),
    ('Quality Assurance Engineer', 55000, 4);

-- Seed data for the "employee" table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Michael', 'Johnson', 3, 1),
    ('Emily', 'Davis', 4, NULL),
    ('David', 'Wilson', 5, 4),
    ('Sarah', 'Anderson', 5, 4),
    ('Thomas', 'Taylor', 5, 4),
    ('Olivia', 'Brown', 6, 4),
    ('William', 'Miller', 6, 4),
    ('Sophia', 'Clark', 6, 4),
    ('James', 'Martin', 5, 4),
    ('Ava', 'Thompson', 5, 4),
    ('Joseph', 'Rodriguez', 6, 4),
    ('Mia', 'Garcia', 6, 4),
    ('Robert', 'Lee', 5, 4),
    ('Charlotte', 'Hall', 5, 4),
    ('Daniel', 'Lewis', 6, 4),
    ('Amelia', 'Young', 6, 4),
    ('Matthew', 'Walker', 6, 4),
    ('Abigail', 'Allen', 5, 4);