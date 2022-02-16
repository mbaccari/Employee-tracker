USE company_db;

INSERT INTO departments(name)
VALUES('Sales'),
('Marketing'),
('HR');

INSERT INTO roles(title, salary, department_id)
VALUES('Sales Leader', 74894.47, 1),
('Junior Salesman', 59486.86, 1),
('Marketing Leader', 89372.64, 2),
('Junior Associate', 53967.55, 2),
('HR Manager', 93758.54, 3),
('Secretary', 49583.55, 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES('Peter', 'Parker', 1, NULL),
('Larry', 'Byrd', 2, 1),
('Eddie', 'Van Halen', 2, 1),
('Rivers', 'Cuomo', 3, NULL),
('James', 'Brown', 4, 4),
('Michael', 'Jackson', 4, 4),
('Kurt', 'Cobain', 5, NULL),
('Billy', 'Corgan', 6, 7),
('Michael', 'Jones', 6, 7);
