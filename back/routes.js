const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./data/database');
const auth = require('./auth/auth')();
const cfg = require('./auth/config');
const saltRounds = 10;

routes.use(auth.initialize());

routes.get('/home', (req, res) => {
    return res.json("Bienvenue sur la page d'accueil").status(200);
});

routes.get('/items', auth.authenticate(), (req, res) => {
    db.all('SELECT item_id AS id, item_name AS name FROM items', (err, rows) => {
        if(err) {
            return res.json(err).status(500);
        } else {
            return res.json(rows).status(200);
        }
    })
});

routes.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        db.get('INSERT INTO users(user_username, user_password, user_firstname, user_lastname, user_adresse, user_mail, user_photo, user_role, user_spec) VALUES ($username, $password, $firstname, $lastname, $adresse, $mail, $photo, $role, $spec) returning user_id', {
            $username: req.body.username,
            $password: hash,
            $firstname: req.body.firstname,
            $lastname: req.body.lastname,
            $adresse: req.body.adresse,
            $mail: req.body.mail,
            $photo: req.body.photo,
            $role: req.body.role,
            $spec: req.body.spec
        }, (err, row) => {
            if(err) {
                return res.json(err).status(500);
            } else {
                return res.json({id: row.user_id}).status(200);
            }
        });
    })
})

routes.post('/login', (req, res) => {
    db.get('SELECT * FROM users WHERE user_username = $username', {
        $username: req.body.username
    }, async (err, row) => {
        if(err) {
            return res.json(err).status(500);
        }

        if(!row) {
            return res.json("Le compte n'existe pas").status(400);
        }

        const match = await bcrypt.compare(req.body.password, row.user_password);
        if(match) {
            const token = jwt.sign({id: row.user_id}, cfg.jwtSecret, {expiresIn: '1H'});
            return res.json({token: token}).status(200);
        } else {
            res.json('Le mot de passe est incorrect').status(400);
        }
    })
})

module.exports = routes;