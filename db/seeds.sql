INSERT INTO department (name)
VALUES  ('Gryffindor'),
        ('Hufflepuff'),
        ('Ravenclaw');

INSERT INTO role (title, salary, department_id)
VALUES  ('The Chosen One', 10, 1),
        ('The Clever One', 10, 2),
        ('The Sidekick', 10, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Harry', 'Potter', 1, 1),
        ('Hermione', 'Granger', 2, 2),
        ('Ron', 'Weasley', 3, 3);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;