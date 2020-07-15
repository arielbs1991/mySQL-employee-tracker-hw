const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Index = require("../index");
const Class = require("../Classes");
const test = Index.test;
test;

// const connection = Index.connection;
// const stringValidator = Index.stringValidator;
// const intValidator = Index.intValidator;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_managingDB"
});

let employeesArray = [];
let id = 0;
const addEmployee = async () => {
    await inquirer.prompt([
        {
            type: "input",
            message: "What is this Employee's first name?",
            name: "first_name",
            // validate: stringValidator
        }
        , {
            type: "input",
            message: "What is this Employee's last name?",
            name: "last_name",
            // validate: stringValidator
        },
        {
            type: "input",
            message: "What is the Role of this Employee",
            name: "role_id",
            // validate: stringValidator
        },
        {
            type: "input",
            message: "Who is this Employee's Manager?",
            name: "manager_id",
            // validate: intValidator
        }
    ]).then(async function (answers) {
        console.log("answers", answers);
        id++;
        let newEmployee = new Class.EmployeeClass(id, answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
        employeesArray.push(newEmployee);
        console.log(employeesArray);
        await connection.query("INSERT INTO employee SET ?",
            {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role_id,
                manager_id: answers.manager_id
            }, function (err, results) {
                if (err) throw err;
                console.log("New Employee Created!");
                Index.start();
            })
    })
};

const viewEmployees = async () => {
    await connection.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            Index.start();
        })
};

// const updateEmpRole = async () => {
//     await inquirer.prompt(
//         {
//             type: "list",
//             name: "empToUpdate",
//             message: "Which Employee would you like to update?",
//             choices: [employeesArray]
//         })
// };

module.exports.addEmployee = addEmployee;
module.exports.viewEmployees = viewEmployees;