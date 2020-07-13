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
    switch (categ) {
        case "emp":
            break;
        case "dept":
            break;
        case "role":
            break;
        default:
            del(categ);
    }
    main();
};

const add = categ => {
    switch (categ) {
        case "emp":
            break;
        case "dept":
            break;
        case "role":
            break;
        default:
            add(categ);
    }
    main();
};

const view = categ => {
    switch (categ) {
        case "emp":
            function rolePromise(query) {
                return new Promise((resolve, reject) => {
                    connection.query(
                        `Select title from role where role_id = ${query}`,
                        (err, res) => {
                            if (err) reject(err);
                            resolve(res[0].title);
                        }
                    );
                });
            }

            let newData = [];

            connection.query("Select * from employees;", (err, res) => {
                if (err) throw err;
                Promise.all(
                    res.map((row, index) => {
                        return rolePromise(row.role_id).then(response => {
                            newData.push({
                                id: row.employee_id,
                                first_name: row.first_name,
                                last_name: row.last_name,
                                title: response
                            });
                        });
                    })
                ).then(() => console.table(newData));
            });

            break;
        case "dept":
            break;
        case "role":
            break;
        default:
            view(categ);
    }
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
