const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: `${process.env.MYSQL_UN}`,
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
                    "View/Add Employees",
                    "View/Add Departments",
                    "View/Add Roles",
                    "Update Employee Roles",
                    "View Budget",
                    "Exit"
                ]
            }
        ])
        .then(res => {
            console.log(res.option);
            switch (res.option) {
                case "View/Add Departments":
                    dept("dept");
                    break;
                case "View/Add Roles":
                    role("role");
                    break;
                case "View/Add Employees":
                    emp("emp");
                    break;
                case "Update Employee Roles":
                    empRole();
                    break;
                case "View Budget":
                    viewBudg();
                    break;
                case "Exit":
                    console.log("Good bye");
                    break;
                default:
                    main();
            }
        });
};

const viewAdd = {
    name: "type",
    type: "list",
    message: "View or Add?",
    choices: ["View", "Add", "Exit"]
};

const add = categ => {
    switch (categ) {
        case "emp":
            let rolePromise = new Promise((resolve, reject) => {
                connection.query(`Select title from role`, (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                });
            });
            let managerPromise = new Promise((resolve, reject) => {
                connection.query(
                    `Select first_name, last_name, employee_id from employees`,
                    (err, res) => {
                        if (err) reject(err);
                        resolve(res);
                    }
                );
            });
            const employeePrompt = async () => {
                const roles = await rolePromise;
                const managers = await managerPromise;
                inquirer
                    .prompt([
                        {
                            name: "first_name",
                            type: "input",
                            message: "Employee's First Name: "
                        },
                        {
                            name: "last_name",
                            type: "input",
                            message: "Employee's Last Name: "
                        },
                        {
                            name: "role",
                            type: "list",
                            message: "Employee's Role: ",
                            choices: roles.map(role => {
                                return role.title;
                            })
                        },
                        {
                            name: "manager",
                            type: "list",
                            message: "Employee's Manager: ",
                            choices: managers
                                .map(manager => {
                                    return `${manager.first_name} ${manager.last_name}`;
                                })
                                .concat(["None"])
                        },
                        {
                            name: "salary",
                            type: "input",
                            message: "Employee's Salary: "
                        }
                    ])
                    .then(res => {
                        connection.query(
                            `Select employee_id from employees where first_name='${
                                res.manager.split(" ")[0]
                            }' && last_name='${
                                res.manager.split(" ")[2] !== undefined
                                    ? res.manager.split(" ")[1] +
                                      " " +
                                      res.manager.split(" ")[2]
                                    : res.manager.split(" ")[1]
                            }';`,
                            (error, resp) => {
                                let manager_id;
                                if (res.manager === "None") {
                                    manager_id = null;
                                } else {
                                    manager_id = resp[0].employee_id;
                                }

                                connection.query(
                                    `Select role_id from role where title = '${res.role}'`,
                                    (err, response) => {
                                        if (err) throw err;
                                        connection.query(
                                            "Insert into employees set ?",
                                            {
                                                first_name: res.first_name,
                                                last_name: res.last_name,
                                                role_id: response[0].role_id,
                                                salary: res.salary,
                                                manager_id: manager_id
                                            },
                                            (err, res) => {
                                                if (err) throw err;
                                                console.log(
                                                    "Employee added successfully"
                                                );
                                                main();
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    });
            };
            employeePrompt();
            break;
        case "dept":
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Enter Department Name: ",
                        name: "dept"
                    }
                ])
                .then(res => {
                    connection.query(
                        `insert into department set ?`,
                        { name: res.dept },
                        (err, response) => {
                            if (err) throw err;
                            console.log("Department added successfully");
                            main();
                        }
                    );
                });
            break;
        case "role":
            connection.query("Select name from department;", (err, resp) => {
                if (err) throw err;
                let deps = resp.map(dep => {
                    return dep.name;
                });

                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Enter Role Name: ",
                            name: "role"
                        },
                        {
                            type: "list",
                            message: "Select Department",
                            name: "dept",
                            choices: deps
                        }
                    ])
                    .then(res => {
                        connection.query(
                            `Select dept_id from department where name = '${res.dept}'`,
                            (err, response) => {
                                if (err) throw err;
                                connection.query(
                                    `Insert into role set ?`,
                                    {
                                        title: res.role,
                                        dept_id: response[0].dept_id
                                    },
                                    (err, respo) => {
                                        if (err) throw err;
                                        console.log("Role added successfully");
                                        main();
                                    }
                                );
                            }
                        );
                    });
            });
            break;
        default:
            add(categ);
    }
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
                                    employee_id: row.employee_id,
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
                ).then(() => {
                    console.table(newRay);
                    main();
                });
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
        default:
            main();
    }
};

const dept = categ => {
    inquirer.prompt([viewAdd]).then(res => {
        switchCategory(res, categ);
    });
};

const role = categ => {
    inquirer.prompt([viewAdd]).then(res => {
        switchCategory(res, categ);
    });
};

const emp = categ => {
    inquirer.prompt([viewAdd]).then(res => {
        switchCategory(res, categ);
    });
};

const empRole = () => {
    connection.query(
        "Select first_name, last_name from employees",
        (error, response) => {
            if (error) throw error;
            let employees = response.map(emp => {
                return `${emp.first_name} ${emp.last_name}`;
            });

            connection.query("Select title from role", (err, res) => {
                if (err) throw err;
                const roles = res.map(role => {
                    return role.title;
                });

                inquirer
                    .prompt([
                        {
                            type: "list",
                            message: "Select Employee",
                            name: "emp",
                            choices: employees
                        },
                        {
                            type: "list",
                            message: "Select New Role",
                            name: "role",
                            choices: roles
                        }
                    ])
                    .then(resp => {
                        connection.query(
                            `Select role_id from role where title = '${resp.role}';`,
                            (err, roleresponse) => {
                                if (err) throw err;
                                connection.query(
                                    `Update employees set ? where first_name = '${
                                        resp.emp.split(" ")[0]
                                    }' && last_name = '${
                                        resp.emp.split(" ")[2] !== undefined
                                            ? resp.emp.split(" ")[1] +
                                              " " +
                                              resp.emp.split(" ")[2]
                                            : resp.emp.split(" ")[1]
                                    }' `,
                                    { role_id: roleresponse[0].role_id },
                                    (err, res) => {
                                        if (err) throw err;
                                        console.log(
                                            "Employee role successfully updated"
                                        );

                                        main();
                                    }
                                );
                            }
                        );
                    });
            });
        }
    );
};

const viewBudg = () => {
    connection.query("Select salary from employees", (err, res) => {
        let budget = 0;
        res.forEach(sal => (budget += parseInt(sal.salary)));
        console.log(`Total utilized budget is ${budget}.`);
        main();
    });
};
