INSERT INTO Department (name)
VALUES 
    ("Sales"),
    ("Finance"),
    ("Legal"),
    ("Engineering");


INSERT INTO Role (title, salary, department_id)
VALUES 
    ("Sales Lead", 80000, 1),
    ("Sales Marketing", 65000, 1),
    ("Client Services", 60000, 1),
    ("Account Manager", 75000, 2),
    ("Finance Analyst", 80000, 2),
    ("Legal Team Lead", 100000, 3),
    ("Contract Admin", 110000, 3),
    ("Lawyer", 95000, 3),
    ("Lead Engineer", 110000, 4),
    ("Software Engineer", 85000, 4),
    ("Systems Engineer", 85000, 4);


INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Bob", "Jones", NULL, 1),
    ("Timmothy", "Turner", NULL, 2),
    ("Stan", "Lee", NULL, 3),
    ("Joe", "Shmoe", NULL, 4);