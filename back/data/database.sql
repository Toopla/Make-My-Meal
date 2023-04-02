DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;

CREATE TABLE users (user_id integer primary key autoincrement, user_name varchar not null, user_password varchar not null);
CREATE TABLE items (item_id integer primary key autoincrement, item_name varchar not null);

INSERT INTO users (user_name, user_password) VALUES ('alexis_grislin', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e'),('tom_cuvelier', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e'),('guillaume_lisse', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e'),('enzo_blois', '$2b$10$S4YwMLwSz4h.l1HCJjtZTuMbHkjjE3JXFNxoyrcQlg5m0sGwfyy0e');
INSERT INTO items (item_name) VALUES ('épée'),('arc'),('pioche'),('hache'),('pelle');