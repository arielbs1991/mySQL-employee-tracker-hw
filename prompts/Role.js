const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Index = require("../index");
const Class = require("../Classes");
const DepartmentsData = require("./Department");
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

let rolesArray = [];
let id = 0;

const addRole = async () => {
    console.log(DepartmentsData.departmentsArray);
    let result = DepartmentsData.departmentsArray.map(el => el.name);
    console.log(result);
    };
    
    // await inquirer.prompt([
    //     {
    //         type: "input",
    //         message: "What is this Role title?",
    //         name: "title",
    //         // validate: stringValidator
    //     }
    //     , {
    //         type: "input",
    //         message: "What is the Salary for this Role?",
    //         name: "salary",
    //         // validate: stringValidator
    //     },
    //     {
    //         type: "list",
    //         message: "In which Department is this Role?",
    //         name: "department",
    //         choices: {
    //             choicesArray
    //         }
    //         // validate: intValidator
    //     }
    // ]).then(async function (answers) {
    //     id++;
    //     let newRole = new Class.RoleClass(id, answers.title, answers.salary);
    //     rolesArray.push(newRole);
    //     console.log(rolesArray);
    //     console.log("ansers", answers);
    //     await connection.query("INSERT INTO role SET ?",
    //         {
    //             title: answers.title,
    //             salary: answers.salary,
    //             department_id: answers.department_id,
    //         }, function (err, results) {
    //             if (err) throw err;
    //             console.log("New Role Created!");
    //             Index.start();
    //         })
    // })
// };

const viewRoles = async () => {
    await connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            Index.start();
        })
};

module.exports.addRole = addRole;
module.exports.viewRoles = viewRoles;