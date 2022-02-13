const inquirer = require('inquirer');
const mysql2 = require('mysql2');


const addRole = () => { 
    console.log("here")
    inquirer.prompt([
        {message:'Enter Role Name',
        name: 'name',
        type: 'text'},
        {message:'Enter Role Salary',
        name: 'salary',
        type: 'text'},
        {message:'Enter Roles Department',
        name: 'dept',
        type: 'text'}
    ]).then((answers) => {
        // const sql = `INSERT INTO roles (movie_name)
        // VALUES (? ? ? ?)`;
        // db.query(sql, answers, (err, result) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        // })
        console.log(answers.dept)
    })
}


module.exports = addRole;