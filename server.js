const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeetracker"
});

const main = () => {
    inquirer.prompt([]).then(res => {});
};

const addDept = () => {};

const addRole = () => {};

const addEmp = () => {};

const viewDep = () => {};

const viewRole = () => {};

const viewEmp = () => {};

const updateMgr = () => {};

const viewEmpByMgr = () => {};

const delDep = () => {};

const delRole = () => {};

const delEmp = () => {};

const viewBud = () => {};
