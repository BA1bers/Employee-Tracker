const { prompt } = require("inquirer");
const mysql = require("mysql2");
const db = require("./db/connection");
const table = require("console.table");

function mainMenu() {
    console.log(`
    ---------------------------------
        ╭━━━╮╱╱╱╱╱╭╮
        ┃╭━━╯╱╱╱╱╱┃┃
        ┃╰━━┳╮╭┳━━┫┃╭━━┳╮ ╭┳━━┳━━╮
        ┃╭━━┫╰╯┃╭╮┃┃┃╭╮┃┃ ┃┃┃━┫┃━┫
        ┃╰━━┫┃┃┃╰╯┃╰┫╰╯┃╰━╯┃┃━┫┃━┫
        ╰━━━┻┻┻┫╭━┻━┻━━┻━╮╭┻━━┻━━╯
        ╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╭━╯┃
        ╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╰━━╯
    
        ╭━━━━╮╱╱╱╱╱╱╭╮
        ┃╭╮╭╮┃╱╱╱╱╱╱┃┃
        ╰╯┃┃┣┻┳━━┳━━┫┃╭┳━━┳━╮
        ╱╱┃┃┃╭┫╭╮┃╭━┫╰╯┫┃━┫╭╯
        ╱╱┃┃┃┃┃╭╮┃╰━┫╭╮┫┃━┫┃
        ╱╱╰╯╰╯╰╯╰┻━━┻╯╰┻━━┻╯
    ---------------------------------
    `)
    prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "list",
            choices: [
                "View all Employees",
                "Add Employee",
                "Delete Employee",
                "View all Roles",
                "Add Role",
                "Delete Role",
                "View all Departments",
                "Add Department",
                "Delete Department",
                "Exit"
            ],
        },
    ]).then((answers) => {
        if (answers.list === "View All Employees") {
            viewAllEmployees();
        } else if (answers.list === "Add Employee") {
            addEmployee();
        } else if (answers.list === "Delete Employee") {
            deleteEmployee();
        } else if (answers.list === "View All Roles") {
            viewAllRoles();
        } else if (answers.list === "Add Role") {
            addRole();
        } else if (answers.list === "Delete Role") {
            deleteRole();
        } else if (answers.list === "View All Departments") {
            viewAllDepartments();
        } else if (answers.list === "Add Department") {
            addDepartment();
        } else if (answers.list === "Delete Department") {
            deleteDepartment();
        } else if (answers.list === "Exit") {
            db.end();
        }
    });
};

function viewAllEmployees() {
    console.log(`
    ------------------------------------
        ╭━━━╮╱╱╱╱╱╭╮
        ┃╭━━╯╱╱╱╱╱┃┃
        ┃╰━━┳╮╭┳━━┫┃╭━━┳╮╱╭┳━━┳━━┳━━╮
        ┃╭━━┫╰╯┃╭╮┃┃┃╭╮┃┃╱┃┃┃━┫┃━┫━━┫
        ┃╰━━┫┃┃┃╰╯┃╰┫╰╯┃╰━╯┃┃━┫┃━╋━━┃
        ╰━━━┻┻┻┫╭━┻━┻━━┻━╮╭┻━━┻━━┻━━╯
        ╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╭━╯┃
        ╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╰━━╯
    ------------------------------------
    `)
    const sql = `
    SELECT employee.first_name, 
    employee.last_name, 
    role.title, 
    role.salary, 
    department.name, 
    manager.first_name AS 'manager_firstname', 
    manager.last_name AS 'manager_lastname' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`
    db.query(
        sql,
        (err, rows) => {
            if (err) throw err;
            console.table(rows);
            mainMenu();
        }
    );
};

function addEmployee() {
    db.query("select id, title from role", (err, role) => {
        db.query("select id, last_name from employee", (err, manager) => {
            prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "Please Enter Employee's First Name",
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "Please Enter Employee's Last Name",
                },
                {
                    name: "role_id",
                    type: "list",
                    choices: role.map(x => ({ name: x.title, value: x.id })),
                    message: "Please Enter Employee's Role id",
                },
                {
                    name: "manager_id",
                    type: "list",
                    choices: manager.map(x => ({ name: x.last_name, value: x.id })),
                    message: "Please Enter Manager's id for this Employee",
                },
            ]).then(function (answer) {
                db.query("INSERT INTO employee SET ?", [answer], function (err) {
                    if (err) throw err;
                    console.log("Complete");
                    mainMenu();
                });
            });
        });
    });
};

function deleteEmployee() {
    prompt([
        {
            type: "number",
            name: "id",
            message: "Please Enter Employee's id"
        }
    ]).then(answers => {
        db.query("DELETE FROM employee WHERE ?", {
            id: answers.id
        },
            function (err, res) {
                if (err) throw err;
                console.log("Complete");
                mainMenu();
            });
    });
};

function viewAllRoles() {
    console.log(`
    -----------------------
        ╭━━━╮╱╱╭╮
        ┃╭━╮┃╱╱┃┃
        ┃╰━╯┣━━┫┃╭━━┳━━╮
        ┃╭╮╭┫╭╮┃┃┃┃━┫━━┫
        ┃┃┃╰┫╰╯┃╰┫┃━╋━━┃
        ╰╯╰━┻━━┻━┻━━┻━━╯
    -----------------------
    `)
    const sql = `SELECT role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id`
    db.query(
        sql,
        (err, rows) => {
            if (err) throw err;
            console.table(rows);
            mainMenu();
        }
    );
};

function addRole() {
    db.query("select id, name from department", (err, department) => {

        prompt([
            {
                name: "title",
                type: "input",
                message: "Enter the role you would like to add",
            },
            {
                name: "salary",
                type: "input",
                message: "Enter the salary for this role",
            },
            {
                name: "department_id",
                type: "list",
                choices: department.map(x => ({ name: x.name, value: x.id })),
                message: "Enter the department for this role",
            },
        ]).then(function (answer) {
            db.query("INSERT INTO role SET ?", [answer], function (err) {
                if (err) throw err;
                console.log("Success");
                mainMenu();
            });
        });
    });
};

function deleteRole() {
    prompt([
        {
            type: "number",
            name: "id",
            message: "Enter role id"
        }
    ]).then(answers => {
        db.query("DELETE FROM role WHERE ?", {
            id: answers.id
        },
            function (err, res) {
                if (err) throw err;
                console.log("Complete");
                mainMenu();
            });
    });
};


function viewAllDepartments() {
    console.log(`
    -----------------------------------------
        ╭━━━╮╱╱╱╱╱╱╱╱╱╱╭╮╱╱╱╱╱╱╱╱╱╭╮
        ╰╮╭╮┃╱╱╱╱╱╱╱╱╱╭╯╰╮╱╱╱╱╱╱╱╭╯╰╮
        ╱┃┃┃┣━━┳━━┳━━┳┻╮╭╋╮╭┳━━┳━╋╮╭╋━━╮
        ╱┃┃┃┃┃━┫╭╮┃╭╮┃╭┫┃┃╰╯┃┃━┫╭╮┫┃┃━━┫
        ╭╯╰╯┃┃━┫╰╯┃╭╮┃┃┃╰┫┃┃┃┃━┫┃┃┃╰╋━━┃
        ╰━━━┻━━┫╭━┻╯╰┻╯╰━┻┻┻┻━━┻╯╰┻━┻━━╯
        ╱╱╱╱╱╱╱┃┃
        ╱╱╱╱╱╱╱╰╯
    -----------------------------------------
    `)
    const sql = `SELECT * FROM department`
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        mainMenu();
    });
};

function addDepartment() {
    prompt([
        {
            name: "name",
            type: "input",
            message: "Enter the name of the department you would like to add",
        },
    ]).then(function (answer) {
        db.query("INSERT INTO department SET ?", [answer], function (err) {
            if (err) throw err;
            console.log("Complete");
            mainMenu();
        });
    });
};

function deleteDepartment() {
    prompt([
        {
            type: "number",
            name: "id",
            message: "Enter department id"
        }
    ]).then(answers => {
        db.query("DELETE FROM department WHERE ?", {
            id: answers.id
        },
            function (err, res) {
                if (err) throw err;
                console.log("Complete");
                mainMenu();
            });
    });
};

mainMenu()
//Getting Mysql12 Error, can't figure out why