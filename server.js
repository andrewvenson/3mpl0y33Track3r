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
                    "View/Add/Del Employees",
                    "View/Add/Del Departments",
                    "View/Add/Del Roles",
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
                        `Select title, dept_id from role where role_id = ${query}`,
                        (err, res) => {
                            if (err) reject(err);
                            connection.query(
                                `Select name from department where dept_id = ${res[0].dept_id}`,
                                (error, response) => {
                                    if (error) reject(error);
                                    resolve([res[0].title, response[0].name]);
                                }
                            );
                        }
                    );
                });
            }

            function managerPromise(query) {
                return new Promise((resolve, reject) => {
                    connection.query(
                        `Select first_name, last_name from employees where employee_id = ${query}`,
                        (err, res) => {
                            if (err) throw err;

                            if (query === null) {
                                resolve("none");
                            } else {
                                resolve(
                                    `${res[0].first_name} ${res[0].last_name}`
                                );
                            }
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
                            return managerPromise(row.manager_id).then(resp => {
                                newData.push({
                                    id: row.employee_id,
                                    first_name: row.first_name,
                                    last_name: row.last_name,
                                    title: response[0],
                                    department: response[1],
                                    salary: row.salary,
                                    manager: resp
                                });
                            });
                        });
                    })
                ).then(() => {
                    console.table(newData);
                    main();
                });
            });

            break;
        case "dept":
            connection.query(`Select * from department`, (err, res) => {
                if (err) throw err;
                console.table(res);
                main();
            });
            break;
        case "role":
            const deptPromise = query => {
                return new Promise((resolve, reject) => {
                    connection.query(
                        `Select name from department where dept_id = ${query};`,
                        (err, res) => {
                            if (err) reject(err);
                            resolve(res[0].name);
                        }
                    );
                });
            };

            let newRay = [];

            connection.query(`Select * from role;`, (err, res) => {
                if (err) throw err;
                Promise.all(
                    res.map(row => {
                        return deptPromise(row.dept_id).then(response => {
                            newRay.push({
                                role_id: row.role_id,
                                title: row.title,
                                department: response
                            });
                        });
                    })
                ).then(() => console.table(newRay));
            });
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
