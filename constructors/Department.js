const mysql = require("mysql");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Index = require("../index")

// const test = Index.test;
// test;

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

module.exports.addDepartment = addDepartment;
module.exports.viewDepartments = viewDepartments;