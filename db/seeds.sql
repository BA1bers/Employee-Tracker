INSERT INTO Department (name)
VALUES 
    ("Animation"),
    ("Finance"),
    ("Legal"),
    ("Writing");


INSERT INTO Role (title, salary, department_id)
VALUES 
    ("Animation Lead", 80000, 1),
    ("Finance Analyst", 80000, 2),
    ("Lawyer", 95000, 3),
    ("Lead Writer", 70000, 4);


INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Bob", "Jones", NULL, 1),
    ("Timmothy", "Turner", NULL, 2),
    ("Stan", "Lee", NULL, 3),
    ("Joe", "Shmoe", NULL, 4);