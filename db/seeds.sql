INSERT INTO department (id, name)
VALUES  (1, 'IT'),
        (2, 'Accounting'),
        (3, 'Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, 'Engineer', 1.3, 123),
        (2, 'Engineer', 3.4, 456),
        (3, 'Engineer', 2.2, 789);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Harry', 'Potter', 4, 5),
        (2, 'Hermione', 'Granger', 6, 7),
        (3, 'Ron', 'Weasley', 8, 9);