const inquirer = require('inquirer');
const mysql2 = require('mysql2');


const db = mysql2.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '193214',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

// init function

const init = () => {
    inquirer.prompt(
        {message: "What would you like to do?",
        type: 'list',
        name: 'mc',
        choices: ["View All Employees",
        "Add Employee",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"]}
    ).then((answer) => {
        console.log(answer)
        if (answer.mc === 'Add Employee'){
            addEmployee()}
        else if (answer.mc === 'View All Roles'){
            viewRoles()}
        else if (answer.mc === 'View All Employees'){
            viewEmployees()}
        else if (answer.mc === 'Add Role'){
            addRole();}
        else if (answer.mc === 'View All Departments'){
            viewDepartments()}
        else if (answer.mc === 'Add Department'){
            addDepartment()}
        else {console.log("no option")
            process.exit()}
    });
}

// viewDepartments function

viewRoles = () => {
    console.log('Showing all roles\n');
    const sql = `SELECT * FROM roles`; 
  
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      init();
    });
  };


//   viewRoles function

  viewDepartments = () => {
    console.log('Showing all departments\n');
    const sql = `SELECT * FROM departments`; 
  
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      init();
    });
  };


// viewEmployees function
  
viewEmployees = () => {
    console.log('Showing all employees\n');
    const sql = `SELECT * FROM employees`; 
  
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      init();
    });
  };


//   addEmployee function

addEmployee = () => {

    db.query(`SELECT * FROM roles`, (err, data) => {
        if (err) throw err;

        const roles = data.map(({id, title}) => ({name:title, value: id}))

        console.log(roles)

    inquirer.prompt([
        {message: "What is the employee's first name?",
        name: 'fn',
        type: 'input'},
        {message: "What is the employee's last name?",
        name: 'ln',
        type: 'input'},
        {message: "What is the employee's role",
        name: 'role',
        type: 'list',
        choices: roles}
      ]).then((answers) => {
          const fn = answers.fn;
          const ln = answers.ln;
          const role = answers.role;
          db.query(`SELECT * FROM employees`, (err, data) => {
              const employees = data.map(({id, first_name, last_name}) => ({name: first_name + ' ' + last_name, value: id}))

              inquirer.prompt(
                {message: "Who is this employee's manager",
                name:'manager',
                type: 'list',
                choices: employees}
              ).then((answers) => {
                db.query(`INSERT INTO employees SET ?`,
                    {first_name: fn,
                    last_name: ln,
                    role_id: role,
                    manager_id: answers.manager},
                (err, res) => {
                    if (err) throw err;
                    init()
                })
              })
          })
      })
    })
};


// addDepartment function

const addDepartment = () => {
    inquirer.prompt(
        {message: 'What department do you want to add?',
        name:'dept',
        type:'input'})
    .then((answer) => {
        db.query(`INSERT INTO departments SET ?`,
            {name: answer.dept}, (err, res) => {
        if (err) throw err;
        init()
    })
        })
}



// addRole function

const addRole = () => {
    db.query('SELECT * FROM departments',(err, data) => {
        if (err) throw err;

        const depts = data.map(({id, name}) => ({name:name, value: id}));

        inquirer.prompt([
            {message: "What is the new role?",
            name: 'role',
            type: 'input'},
            {message: "What is this role's salary?",
            name: 'salary',
            type: 'input'},
            {message: "What department does this role belong to?",
            name: 'dept',
            type: 'list',
            choices: depts}
        ]).then((answers) => {
            db.query(`INSERT INTO roles SET ?`,
                {title: answers.role,
                salary: answers.salary,
                department_id: answers.dept},
            (err, res) => {
                if (err) throw err;
                init()
            })
          })
    });
};

console.log("***********************************")
console.log("*                                 *")
console.log("*        EMPLOYEE TRACKER         *")
console.log("*                                 *")
console.log("***********************************")

init()