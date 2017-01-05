# -- insert data into role, user tables

# -- !Ups

INSERT INTO "user" (id, name, password) VALUES
  (1, 'admin', 'admin'),
  (2, 'teacher', 'teacher'),
  (3, 'student', 'student'),
  (4, 'user', 'user');

INSERT INTO role (id, name, description) VALUES
  (1, 'admin', 'admin role'),
  (2, 'student', 'user role'),
  (3, 'teacher', 'user role'),
  (4, 'user', 'user role');

INSERT INTO user_cr_role (user_id, role_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4);

# -- !Downs

DELETE FROM user_cr_role;
DELETE FROM "user";
DELETE FROM role;