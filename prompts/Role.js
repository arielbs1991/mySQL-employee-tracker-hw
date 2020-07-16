const mysql = require("mysql");
const inquirer = require("inquirer");

const Index = require("../index");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_managingDB"
});

const addRole = async () => {
    await connection.query("SELECT * FROM department",
        async function (err, res) {
            if (err) throw err;
            let choicesArray = [];

            for (i = 0; i < res.length; i++) {
                choicesArray.push(res[i].id);
            }

            await inquirer.prompt([
                {
                    type: "input",
                    message: "What is this Role title?",
                    name: "title",
                    // validate: stringValidator
                },
                {
                    type: "input",
                    message: "What is the Salary for this Role?",
                    name: "salary",
                    // validate: stringValidator
                },
                {
                    type: "list",
                    message: "What is the department id for this role?",
                    name: "department_id",
                    choices: choicesArray

                    // validate: intValidator
                }
            ]).then(async function (answers) {
                await connection.query("INSERT INTO role SET ?",
                    {
                        title: answers.title,
                        salary: answers.salary,
                        department_id: answers.department_id,
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
            Index.start();
        })
};

const rmvRole = async () => {
    await connection.query("SELECT * FROM role",
        async function (err, res) {
            if (err) throw err;

            let roleArray = [];

            for (i = 0; i < res.length; i++) {
                roleArray.push(res[i].title);
            }
            await inquirer.prompt(
                {
                    type: "list",
                    name: "title",
                    message: "Which Role would you like to remove?",
                    choices: roleArray
                }).then(async function (answers) {
                    await connection.query("DELETE FROM role WHERE title = ?", [answers.title], async function (err, res) {
                        if (err) throw err;
                        console.log(`Role Successfully Removed!`);
                        Index.start();
                    }
                    )
                });
        }

    );
};

module.exports.addRole = addRole;
module.exports.viewRoles = viewRoles;
module.exports.rmvRole = rmvRole;