const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const { moveCursor } = require('readline');




const init = () => {
    inquirer.prompt(
        {message: "What would you like to do?",
        type: 'list',
        name: 'mc',
        options: ["View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"]}
    ).then((answer) => {
        if (answer === 'Add Employee'){addEmployee()}
        else if (answer === 'Update Employee Role'){updateEmployee()}
        else if (answer === 'View All Roles'){viewRoles()}
        else if (answer === 'Add Role'){addRole()}
        else if (answer === 'View All Departments'){viewDepartments()}
        else if (answer === 'Add Department'){addDepartment()}
        else {return}
    });
}