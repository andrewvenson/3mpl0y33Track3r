const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: `${process.env.MYSQL_PW}`,
    database: "employeetracker"
});

connection.connect(err => {
    if (err) throw err;
    console.log("mysql connected");
    main();
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
