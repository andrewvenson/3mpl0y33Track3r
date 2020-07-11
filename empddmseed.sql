USE employeetracker;

INSERT INTO department (name) VALUES("Information Technology");
INSERT INTO department (name) VALUES("Research & Development");
INSERT INTO department (name) VALUES("Marketing");
INSERT INTO department (name) VALUES("Human Resources");
INSERT INTO department (name) VALUES("Accounting & Finance");

INSERT INTO role(title, dept_id) VALUES("HR Analyst",  4);
INSERT INTO role(title, dept_id) VALUES("HR Generalist",  4);
INSERT INTO role(title, dept_id) VALUES("HR Coordinator",  4);

INSERT INTO role(title,  dept_id) VALUES("Software Engineer",  1);
INSERT INTO role(title,  dept_id) VALUES("Network Engineer", 1);
INSERT INTO role(title,  dept_id) VALUES("Computer Technician", 1);
INSERT INTO role(title,  dept_id) VALUES("Systems Engineer",  1);


INSERT INTO employees(first_name,  last_name, role_id, salary, manager_id) VALUES("Andrew", "Venson IV", 4,69000, 4);
INSERT INTO employees(first_name,  last_name, role_id, salary, manager_id) VALUES("Arianna", "Venson", 1,80000, 2);
INSERT INTO employees(first_name,  last_name, role_id, salary, manager_id) VALUES("Andrew", "Venson III", 5,100000, 4);
INSERT INTO employees(first_name,  last_name, role_id, salary, manager_id) VALUES("Lorenzo", "Dudlin", 7,120000, NULL);
