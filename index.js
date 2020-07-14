const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Employee = require("./constructors");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_managingDB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt({
        type: "list",
        name: "initialTask",
        message: "What would you like to do?",
        choices: [
            "View all Employees",
            "Add Employee",
            "Remove Employee"
        ]
    }).then(function (answer) {
        if (answer.initialTask === "Add Employee") {
            console.log("add employee");
            addEmployee();
        }
        else if (answer.initialTask === "View all Employees") {
            console.log("view all employees");
            // viewEmployees();
        }
        else if (answer.initialTask === "Remove Employee") {
            console.log("remove employee");
            // rmvEmployee();
        }

        else {
            console.log("Thank you for using our program!");
        };
    })
    
};

async function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        //control for having no employees in db? console.log("You don't have any employees in our database")
    })
};
const stringValidator = async (input) => {
    if (input === '') {
        console.log('Oh no! Please enter your answer.');
    } else {
        return true;
    }
};

const intValidator = async (input) => {
    if (isNaN(input) === false) {
        return true;
    }
    console.log("Please enter a valid ID number.")
    return false;
};
// const employeesArray = [];

async function addEmployee() {
    await inquirer.prompt([
        {
            type: "input",
            message: "What is this Employee's first name?",
            name: "first_name",
            validate: stringValidator
        }
        ,{
            type: "input",
            message: "What is this Employee's last name?",
            name: "last_name",
            validate: stringValidator
        },
        {
            type: "list",
            message: "What is the Role ID for this Employee",
            name: "role_id",
            choices: [1, 2, 3, 4, 5, 6]
        },
        {
            type: "input",
            message: "What is the ID of the Manager for this Employee",
            name: "manager_id",
            validate: intValidator
        }
    ]).then(function (answers) {
        // const employee = new Employee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
        console.log(answers);
        // console.log(employee);
        // connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(${employee})`, function (err, results) {
        //     if (err) throw err;
        //control for having no employees in db? console.log("You don't have any employees in our database")
    });
};
//     })
// };

// async function rmvEmployee() {

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