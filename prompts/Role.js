const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Index = require("../index");
const Class = require("../Classes");
// const DepartmentsData = require("../index");
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

// let rolesArray = [];
let choicesArray = [];

const addRole = async () => {
    // TODO: deal with - cannot read property 'map' of undefined
    await connection.query("SELECT * FROM department",
        async function (err, res) {
            if (err) throw err;
            // let departmentsArray = res;
            // console.log(departmentsArray);


            for (i = 0; i < res.length - 1; i++) {
                choicesArray.push(JSON.stringify(res[i].name));
                // console.log(res[i].name);
            }

            // let choicesArray = departmentsArray.forEach(dept => console.log(dept.name));
            console.log(choicesArray);


            await inquirer.prompt([
                {
                    type: "input",
                    message: "What is this Role title?",
                    name: "title",
                    // validate: stringValidator
                }
                , {
                    type: "input",
                    message: "What is the Salary for this Role?",
                    name: "salary",
                    // validate: stringValidator
                },
                {
                    type: "list",
                    message: "In which Department is this Role?",
                    name: "department",
                    choices: choicesArray

                    // validate: intValidator
                }
            ]).then(async function (answers) {
                await connection.query("INSERT INTO role SET ?",
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department: answers.department,
                    }, function (err, results) {
                        if (err) throw err;
                        console.log("New Role Created!");
                        Index.start();
                    }
                )
            });
        }
    );

};



const viewRoles = async () => {
    await connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            let newRole = new Class.RoleClass(res.id, res.title, res.salary);
            let rolesArray = [newRole, ...res];
            console.log(rolesArray);
            Index.start();
        })
};

module.exports.addRole = addRole;
module.exports.viewRoles = viewRoles;