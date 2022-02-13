const inquirer = require('inquirer');
const mysql2 = require('mysql2');

// Functions
const addRole = require('./addRole.js');
console.log(addRole)

const init = () => {
    inquirer.prompt(
        {message: "What would you like to do?",
        type: 'list',
        name: 'mc',
        choices: ["View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"]}
    ).then((answer) => {
        console.log(answer)
        if (answer.mc === 'Add Employee'){
            addEmployee()
            init()}
        else if (answer.mc === 'Update Employee Role'){
            updateEmployee()
            init()}
        else if (answer.mc === 'View All Roles'){viewRoles()}
        else if (answer.mc === 'Add Role'){
            addRole();}
        else if (answer.mc === 'View All Departments'){
            viewDepartments()
            init()}
        else if (answer.mc === 'Add Department'){
            addDepartment()
            init()}
        else {console.log("no option")
            process.exit()}
    });
}

module.exports = init;