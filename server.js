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
    console.log("mysql connection successful");
    main();
});

const main = () => {
    inquirer
        .prompt([
            {
                name: "option",
                type: "list",
                message: "Choose option",
                choices: [
                    "View/Add/Del Departments",
                    "View/Add/Del Roles",
                    "View/Add/Del Employees",
                    "Update Employee Roles",
                    "Update Employee Managers",
                    "View Employees by Manager",
                    "View Budget"
                ]
            }
        ])
        .then(res => {
            console.log(res.option);
            switch (res.option) {
                case "View/Add/Del Departments":
                    dept("dept");
                    break;
                case "View/Add/Del Roles":
                    role("role");
                    break;
                case "View/Add/Del Employees":
                    emp("emp");
                    break;
                case "Update Employee Roles":
                    empRole();
                    break;
                case "Update Employee Managers":
                    updateMgr();
                    break;
                case "View Employees by Manager":
                    viewEmpByMgr();
                    break;
                case "View Budget":
                    viewBudg();
                    break;
                default:
                    main();
            }
        });
};

const viewAddDel = {
    name: "type",
    type: "list",
    message: "View, Add or Delete?",
    choices: ["View", "Add", "Delete", "Exit"]
};

const del = categ => {
    console.log("deleting", categ);
};

const add = categ => {
    console.log("adding", categ);
};

const view = categ => {
    console.log("viewing", categ);
};

const switchCategory = (res, categ) => {
    switch (res.type) {
        case "View":
            view(categ);
            break;
        case "Add":
            add(categ);
            break;
        case "Delete":
            del(categ);
            break;
        case "Exit":
            main();
        default:
            main();
    }
};

const dept = categ => {
    inquirer.prompt([viewAddDel]).then(res => {
        switchCategory(res, categ);
    });
};

const role = categ => {
    inquirer.prompt([viewAddDel]).then(res => {
        switchCategory(res, categ);
    });
};

const emp = categ => {
    inquirer.prompt([viewAddDel]).then(res => {
        switchCategory(res, categ);
    });
};

const empRole = () => {};

const updateMgr = () => {};

const viewEmpByMgr = () => {};

const viewBudg = () => {};
