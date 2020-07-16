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

const addDepartment = async () => {
    await inquirer.prompt(
        {
            type: "input",
            message: "What is the name of this Department?",
            name: "name",
            // validate: stringValidator
        }
    ).then(async function (answer) {
        await connection.query("INSERT INTO department SET ?",
            {
                name: answer.name
            }, function (err, results) {
                if (err) throw err;
                console.log("New Department Created!");
                Index.start();
            })
    })
    
};

const viewDepartments = async () => {
    await connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            Index.start();
        })
};

const rmvDepartment = async () => {
    await connection.query("SELECT * FROM department",
        async function (err, res) {
            if (err) throw err;

            let departmentArray = [];

            for (i = 0; i < res.length; i++) {
                departmentArray.push(res[i].name);

            }
            await inquirer.prompt(
                {
                    type: "list",
                    name: "name",
                    message: "Which Department would you like to remove?",
                    choices: departmentArray
                }).then(async function (answers) {
                    await connection.query("DELETE FROM department WHERE name = ?", [answers.title], async function (err, res) {
                        if (err) throw err;
                        console.log(`Department Successfully Removed!`);
                        Index.start();
                    }
                    )
                });
        }

    );
};

module.exports.addDepartment = addDepartment;
module.exports.viewDepartments = viewDepartments;
module.exports.rmvDepartment = rmvDepartment;