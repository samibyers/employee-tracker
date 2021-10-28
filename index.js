const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


//comnnect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

//Starts the inquirer prompt and creates the main menu
const startMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Choose from the following options:',
            name: 'menu',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Add an updated employee role', 'Quit']
        },
    ]).then(answers => {
        switch (answers.menu) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add an updated employee role':
                updateEmployeeRole();
                break;
            case 'Quit':
                quit();
                break;
        };
    });
};
//call startMenu to start the inquirer prompt
startMenu();

//displays the department table
const viewDepartments = () => {
    // Query database
    db.query('SELECT * FROM department', function (err, results) {
        console.log('\n');
        console.table(results);
        startMenu();
    });
};

//dispays the role table
const viewRoles = () => {
    // Query database
    db.query('SELECT * FROM role', function (err, results) {
        console.log('\n');
        console.table(results);
        startMenu();
    });
};

//displays the employee table
const viewEmployees = () => {
    // Query database
    db.query('SELECT * FROM employee', function (err, results) {
        console.log('\n');
        console.table(results);
        startMenu();
    });
};

//adds a new department to the department table
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the department.',
            name: 'name',
        },
    ]).then(({ name }) => {
        db.query('INSERT INTO department (name) VALUES (?)', name, (err, results) => {
            console.log('\n');
            console.table(results);
            viewDepartments();
        });
    });
};

//adds a new role to the role table
const addRole = () => {
    const departmentsArr = [];
    db.query('SELECT name FROM department', (err, results) => {
        for (i = 0; i < results.length; i++) {
            departmentsArr.push(results[i].name);
        };
        inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the title of the role.',
                name: 'title',
            },
            {
                type: 'input',
                message: 'Enter the salary of the role.',
                name: 'salary',
            },
            {
                type: 'list',
                message: 'Which department does the role belong?',
                name: 'department_name',
                choices: departmentsArr,//choose from existing departments
            },
        ]).then(({ title, salary, department_name }) => {
            db.query('SELECT id FROM department WHERE name = ?', department_name, (err, results) => {
                console.log(results)
                db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [title, salary, results[0].id], (err, results) => {
                    console.log('\n');
                    console.table(results);
                    viewRoles();
                });
            });
        });
    });
};

//adds a new employee to the employee table
const addEmployee = () => {
    const roleArr = [];
    const employeeArr = [];
    db.query('SELECT title FROM role', (err, results) => {
        for (i = 0; i < results.length; i++) {
            roleArr.push(results[i].title);
        };
        db.query('SELECT first_name FROM employee', (err, res) => {
            for (i = 0; i < res.length; i++) {
                employeeArr.push(res[i].first_name);
            };
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Enter the employee\'s first name.',
                    name: 'first_name',
                },
                {
                    type: 'input',
                    message: 'Enter the employee\'s last name.',
                    name: 'last_name',
                },
                {
                    type: 'list',
                    message: 'What is the employee\'s role.',
                    name: 'role',
                    choices: roleArr,//choose from existing roles
                },
                {
                    type: 'list',
                    message: 'Who is the employee\'s manager.',
                    name: 'manager',
                    choices: employeeArr,// choose from existing employees
                },
            ]).then(({ first_name, last_name, role, manager }) => {
                db.query('SELECT id FROM role WHERE title = ?', role, (err, roleResults) => {
                    console.log(roleResults)
                    db.query('SELECT id FROM employee WHERE first_name = ?', manager, (err, managerResults) => {
                        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [first_name, last_name, roleResults[0].id, managerResults[0].id], (err, results) => {
                            console.log('\n');
                            console.table(results);
                            viewEmployees();
                        });
                    });
                });
            });
        });
    });
};

//updates an employee's role
const updateEmployeeRole = () => {
    const roleArr = [];
    const employeeArr = [];
    db.query('SELECT title FROM role', (err, results) => {
        for (i = 0; i < results.length; i++) {
            roleArr.push(results[i].title);
        };
        db.query('SELECT first_name FROM employee', (err, res) => {
            for (i = 0; i < res.length; i++) {
                employeeArr.push(res[i].first_name);
            };
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Select an employee to update:',
                    name: 'name',
                    choices: employeeArr, //choose from existing employees
                },
                {
                    type: 'list',
                    message: 'Select the employee\'s new role:',
                    name: 'title',
                    choices: roleArr, //choose from existing roles
                },
            ]).then(({ name, title }) => {
                db.query('SELECT id FROM employee WHERE first_name = ?', name, (err, nameResults) => {
                    console.log(nameResults)
                    db.query('SELECT id FROM role WHERE title = ?', title, (err, titleResults) => {
                        console.log(titleResults)
                        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [titleResults[0].id, nameResults[0].id], (err, results) => {
                            console.log('\n');
                            console.table(results);
                            viewEmployees();
                        });
                    });
                });
            });
        });
    });
};

const quit = () => {
    console.log('To quit this application, press "control C" on your keyboard.');
};