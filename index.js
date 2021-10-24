const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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

console.table([
    {
        name: 'foo',
        age: 10
    },
    {
        name: 'bar',
        age: 20
    }
]);


function startMenu() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Choose from the following options:',
            name: 'menu',
            choices: ['View all departments', 'View all roles', 'view all employees', 'Add a department', 'Add a role', 'Add an Employee', 'Add an updated employee role']
        },
    ]);

};

//view all departments shows the department table

//view all roles shows the role table

//view all employees shows you the employee table

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name if the department.',
            name: 'department name',
        },
    ]); //add to database
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the role.',
            name: 'role name',
        }, 
        {
            type: 'input',
            message: 'Enter the salary of the role.',
            name: 'role salary',
        }, 
        {
            type: 'input',
            message: 'Enter the department of the role.',
            name: 'role department',
        }, 
    ]); //add to database
};

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the employee\'s first name.',
            name: 'first name',
        }, 
        {
            type: 'input',
            message: 'Enter the employee\'s last name.',
            name: 'last name',
        }, 
        {
            type: 'input',
            message: 'Enter the employee\'s role.',
            name: 'role',
        }, 
        {
            type: 'input',
            message: 'Enter the employee\'s manager.',
            name: 'manager',
        }, 
    ]); //add to database
};

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select an employee to update:',
            name: 'select employee',
            choices: [], //choose from database??
        }, 
        {
            type: 'list',
            message: 'Select the employee\'s new role:',
            name: 'new role',
            choices: [], //choose from database??
        }, 
    ]); //add to database
};