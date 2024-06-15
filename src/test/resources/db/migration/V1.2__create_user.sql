INSERT INTO users (username, email, password, is_active, created_at, updated_at)
VALUES ('username', 'email@email.com', '123', true, NOW(), NOW());

INSERT INTO roles (name) VALUES ('DOCTOR');

INSERT INTO users_roles (user_id, role_id) VALUES (1, 1);