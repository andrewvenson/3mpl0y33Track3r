USE employeetracker;

INSERT INTO department (name) VALUES("Information Technology");
INSERT INTO department (name) VALUES("Research & Development");
INSERT INTO department (name) VALUES("Marketing");
INSERT INTO department (name) VALUES("Human Resources");
INSERT INTO department (name) VALUES("Accounting & Finance");

INSERT INTO role(title, salary, dept_id) VALUES("HR Analyst", 50000, 4);
INSERT INTO role(title, salary, dept_id) VALUES("HR Generalist", 60000, 4);
INSERT INTO role(title, salary, dept_id) VALUES("HR Coordinator", 70000, 4);

INSERT INTO role(title, salary, dept_id) VALUES("Software Engineer", 80000, 1);
INSERT INTO role(title, salary, dept_id) VALUES("Network Engineer", 75000, 1);
INSERT INTO role(title, salary, dept_id) VALUES("Computer Technician", 45000, 1);
INSERT INTO role(title, salary, dept_id) VALUES("Systems Engineer", 120000, 1);


INSERT INTO employees(first_name,  last_name, role_id, manager_id) VALUES("Andrew", "Venson IV", 4, 4);
INSERT INTO employees(first_name,  last_name, role_id, manager_id) VALUES("Arianna", "Venson", 1, 2);
INSERT INTO employees(first_name,  last_name, role_id, manager_id) VALUES("Andrew", "Venson III", 5, 4);
INSERT INTO employees(first_name,  last_name, role_id, manager_id) VALUES("Lorenzo", "Dudlin", 7, NULL);
