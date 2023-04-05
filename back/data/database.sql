DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS planning;

CREATE TABLE users (
    user_id INTEGER primary key autoincrement,
    user_username VARCHAR NOT NULL,
    user_password VARCHAR NOT NULL,
    user_firstname VARCHAR NOT NULL,
    user_lastname VARCHAR NOT NULL,
    user_adresse VARCHAR NOT NULL,
    user_mail VARCHAR NOT NULL,
    user_photo VARCHAR,
    user_role VARCHAR NOT NULL,
    user_spec VARCHAR
);

CREATE TABLE planning (
    plan_id INTEGER primary key autoincrement,
    plan_id_chef INTEGER NOT NULL,
    plan_jour DATE NOT NULL,
    plan_petit_dejeuner BOOLEAN NOT NULL,
    plan_dejeuner BOOLEAN NOT NULL,
    plan_gouter BOOLEAN NOT NULL,
    plan_repas BOOLEAN NOT NULL
);

INSERT INTO users (user_username, user_password, user_firstname, user_lastname, user_adresse, user_mail, user_photo, user_role, user_spec) VALUES 
('alexis_grislin', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e', 'Alexis', 'Grislin', 'Biache-Saint-Vaast', 'alexis.grislin@outlook.fr', '', 'client', ''),
('tom_cuvelier', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e', 'Tom', 'Cuvelier', 'Liévin', 'cuvelier.tom62@gmail.com', '', 'chef', 'Italien'),
('guillaume_lisse', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e', 'Guillaume', 'Lisse', 'Hénin-Beaumont', 'lisseguillaume@gmail.com', '', 'client', ''),
('enzo_blois', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e', 'Enzo', 'Blois', 'Grenay', 'enzoblois4@gmail.com', '', 'chef', 'Indien');