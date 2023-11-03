INSERT INTO User (id, username,password, email, is_enabled, dtype) values (1, 'admin', '$2a$12$qk8Q.r6V55hWspxroY95ie9AzMSwxKFBBLyUMe20GLQ6j9HQH1HWi', 'admin@gmail.com', 1, 'User');
INSERT INTO User (id, username,password, email, is_enabled, dtype) values (2, 'student', '$2a$12$qk6VqZOxl/9FAocnItzg3uOXZ1sYCee9ungorANY/L1evGvy0gPnK', 'student@gmail.com',1, 'Student');

INSERT INTO Role (id, name) values (1, 'admin');
INSERT INTO Role (id, name) values (2, 'student');

INSERT INTO user_roles(user_id, role_id) values (1,1);
INSERT INTO user_roles(user_id, role_id) values (2,2);