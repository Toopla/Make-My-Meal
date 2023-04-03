DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS items;

CREATE TABLE users (user_id integer primary key autoincrement, user_username varchar not null, user_password varchar not null, user_firstname varchar not null, user_lastname varchar not null, user_adresse varchar not null, user_mail varchar not null, user_photo varchar, user_role varchar not null, user_spec varchar);
CREATE TABLE items (item_id integer primary key autoincrement, item_name varchar not null);

INSERT INTO users (user_username, user_password, user_firstname, user_lastname, user_adresse, user_mail, user_photo, user_role, user_spec) VALUES ('alexis_grislin', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e', 'Alexis', 'Grislin', 'Biache-Saint-Vaast', 'alexis.grislin@outlook.fr', '', 'client', ''),('tom_cuvelier', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e', 'Tom', 'Cuvelier', 'Liévin', 'cuvelier.tom62@gmail.com', '', 'chef', 'Italien'),('guillaume_lisse', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e', 'Guillaume', 'Lisse', 'Hénin-Beaumont', 'lisseguillaume@gmail.com', '', 'client', ''),('enzo_blois', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e', 'Enzo', 'Blois', 'Grenay', 'enzoblois4@gmail.com', '', 'chef', 'Indien');
INSERT INTO items (item_name) VALUES ('épée'),('arc'),('pioche'),('hache'),('pelle');