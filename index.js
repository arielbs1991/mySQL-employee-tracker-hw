const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Employee = require("./constructors/Employee");
const Department = require("./constructors/Department");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_managingDB"
});

module.exports.connection = connection;
const test = console.log("test", Date.now());
module.exports.test = test;

connection.connect(function (err) {
    if (err) throw err;
    start();
});

const start = () => {
    inquirer.prompt({
        type: "list",
        name: "initialTask",
        message: "What would you like to do?",
        choices: [
            "View all Employees",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Add a Role",
            "View all Roles",
            "Add a Department",
            "View all Departments",
            "Exit"
        ]
    }).then(function (answer) {
        if (answer.initialTask === "Add Employee") {
            // console.log("add employee");
            Employee.addEmployee();
        }
        else if (answer.initialTask === "View all Employees") {
            console.log("view all employees");
            Employee.viewEmployees();
        }
        else if (answer.initialTask === "Remove Employee") {
            console.log("remove employee");
            // rmvEmployee();
        }
        else if (answer.initialTask === "Update Employee Role") {
            console.log("update employee role");
            // updateRole()
        }
        else if (answer.initialTask === "Add a Role") {
            addRole();
        }
        else if (answer.initialTask === "View all Roles") {
            viewRoles();
        }
        else if (answer.initialTask === "Add a Department") {
            Department.addDepartment();
        }
        else if (answer.initialTask === "View all Departments") {
            Department.viewDepartments();
        }
        

        else {
            console.log("Thank you for using our program!");
            // break;
        };
    })

};

module.exports.start = start;


const stringValidator = async (input) => {
    if (input === '') {
        console.log('Oh no! Please enter your answer.');
    } else {
        return true;
    }
};

module.exports.stringValidator = stringValidator;

const intValidator = async (input) => {
    if (isNaN(input) === false) {
        return true;
    }
    console.log("Please enter a valid ID number.")
    return false;
};
//rather than validating, what about splitting the input at commas and/or dollar signs and putting it back together

module.exports.intValidator = intValidator;

async function addRole() {
    await inquirer.prompt([
        {
            type: "input",
            message: "What is this Role title?",
            name: "title",
            validate: stringValidator
        }
        , {
            type: "input",
            message: "What is the Salary for this Role?",
            name: "salary",
            validate: stringValidator
        },
        {
            type: "number",
            message: "What is the Department ID for this Role?",
            name: "department_id",
            validate: intValidator
        }
    ]).then(async function (answers) {
        console.log("ansers", answers);
        await connection.query("INSERT INTO role SET ?",
            {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department_id,
            }, function (err, results) {
            if (err) throw err;
            console.log("New Role Created!");
            start();
        })
    })
};

async function viewRoles() {
    await connection.query("SELECT * FROM role",
    function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

// async function rmvEmployee() {

// };

// async function updateRole() {

// };

   // "View all employees by Role",
            // "View all employees by Manager",
            // "View all employees by Department",
            // "Update employee Manager",
            // "Update employee Role",
            // "View all Managers",
            // "Add Manager",
            // "Remove Manager",
            // "View all Departments",
            // "Add Department",
            // "Remove Department"