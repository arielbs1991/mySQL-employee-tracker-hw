const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Index = require("../index");
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

// let roleArray = [];


// const generateRoleArray = async () => {
//     function clearArray(roleArray) {
//         while (roleArray.length) {
//             roleArray.pop();
//         }
//     }

//     clearArray();

//     await connection.query("SELECT * FROM role",
//         async function (err, res) {
//             if (err) throw err;

//             for (i = 0; i < res.length; i++) {
//                 roleArray.push(res[i].id);
//             }
//         })
// };

const addEmployee = async () => {
    await connection.query("SELECT * FROM role",
        async function (err, res) {
            if (err) throw err;
            let choicesArray = [];

            for (i = 0; i < res.length; i++) {
                choicesArray.push(res[i].id);
            }
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
                    type: "list",
                    message: "What is this Employee's Role ID?",
                    name: "role_id",
                    choices: choicesArray
                    // validate: stringValidator
                },
                {
                    type: "input",
                    message: "What is this Employee's Manager's ID?",
                    name: "manager_id",
                    // validate: intValidator
                }
            ]).then(async function (answers) {
                console.log("answers", answers);
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
        });
};

const viewEmployees = async () => {
    await connection.query("SELECT * FROM employee",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            Index.start();
        })
};

const updateEmpRole = async () => {
    await connection.query("SELECT * FROM role",
        async function (err, res) {
            if (err) throw err;
            let roleArray = [];

            for (i = 0; i < res.length; i++) {
                roleArray.push(res[i].id);
            }
            await connection.query("SELECT * FROM employee",
                async function (err, res) {
                    if (err) throw err;

                    let employeeArray = [];

                    for (i = 0; i < res.length; i++) {
                        employeeArray.push(res[i].first_name);

                    }
                    await inquirer.prompt([
                        {
                            type: "list",
                            name: "first_name",
                            message: "Which Employee would you like to update?",
                            choices: employeeArray
                        },
                        {
                            type: "list",
                            name: "new_role",
                            message: "What would you like this Employee's new Role ID to be?",
                            choices: roleArray
                        }]).then(async function (answers) {
                            await connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [answers.new_role, answers.first_name], async function (err, res) {
                                if (err) throw err;
                                console.log(`Employee Role updated to ${res.role_id}!`);
                                Index.start();
                            }
                            )
                        });
                }
            )
        }
    );
};

module.exports.addEmployee = addEmployee;
module.exports.viewEmployees = viewEmployees;
module.exports.updateEmpRole = updateEmpRole;