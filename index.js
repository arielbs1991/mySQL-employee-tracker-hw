const mysql = require("mysql");
const inquirer = require("inquirer");

const Employee = require("./prompts/Employee");
const Department = require("./prompts/Department");
const Role = require("./prompts/Role");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_managingDB"
});

connection.connect(function (err) {
    if (err) throw err;
    start()
});
const endConnection = async () => {
    connection.end();
}
const getDepartmentsData = async () => {
    await connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
        })
};

const getRolesData = async () => {
    await connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
        })
};

const getEmployeesData = async () => {
    await connection.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
        })
};
// module.exports.getDepartmentsData = getDepartmentsData;
const start = async () => {
    await inquirer.prompt({
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
            "Remove a Role",
            "Add a Department",
            "View all Departments",
            "Remove a Department",
            // "View Employees by Manager ID",
            "Exit"
        ]
    }).then(function (answer) {
        if (answer.initialTask === "Add Employee") {
            Employee.addEmployee();
        }
        else if (answer.initialTask === "View all Employees") {
            Employee.viewEmployees();
        }
        else if (answer.initialTask === "Remove Employee") {
            Employee.rmvEmployee();
        }
        else if (answer.initialTask === "Update Employee Role") {
            Employee.updateEmpRole();
        }
        else if (answer.initialTask === "Add a Role") {
            Role.addRole();
        }
        else if (answer.initialTask === "View all Roles") {
            Role.viewRoles();
        }
        else if (answer.initialTask === "Remove a Role") {
            Role.rmvRole();
        }
        else if (answer.initialTask === "Add a Department") {
            Department.addDepartment();
        }
        else if (answer.initialTask === "Remove a Department") {
            Department.rmvDepartment();
        }
        else if (answer.initialTask === "View all Departments") {
            Department.viewDepartments();
        }
        // else if (answer.initialTask === "View Employees by Manager ID") {
        //     Employee.viewByManager();
        // }

        else {
            // endConnection();
            return console.log("Thank you for using our program!");
            // connection.end(function (err) {
            //     if (err) throw err;
            // });
            // break;
        };
    })
    getDepartmentsData();
    getRolesData();
    getEmployeesData();
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

   // "View all employees by Role",
            // "View all employees by Manager",
            // "View all employees by Department",
            // "Update employee Manager",
            // "Update employee Role",
            // "View all Managers",
            // "Add Manager",
            // "Remove Manager",
  