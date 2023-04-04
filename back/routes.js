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

routes.get('/users/:id', auth.authenticate(), (req, res) => {
    db.get('SELECT user_id AS id, user_username AS username, user_password AS password, user_firstname AS firstname, user_lastname AS lastname, user_adresse AS adresse, user_mail AS mail, user_photo AS photo, user_role AS role, user_spec AS spec FROM users WHERE user_id=$id', {$id: req.params.id}, (err, row) => {
        if (err){
            return res.json(err).status(500);
        }else {
            return res.json(row).status(200);
        }
    })
})

routes.get('/chefs/liste', auth.authenticate(), (req, res) => {
    db.all('SELECT user_id AS id, user_firstname AS firstname, user_lastname AS lastname, user_adresse AS adresse, user_mail AS mail, user_photo AS photo, user_role AS role, user_spec AS spec FROM users WHERE user_role="chef"', (err, rows) => {
        if(err) {
            return res.json(err).status(500);
        } else {
            return res.json(rows).status(200);
        }
    })
});

routes.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        db.run('INSERT INTO users(user_username, user_password, user_firstname, user_lastname, user_adresse, user_mail, user_photo, user_role, user_spec) VALUES ($username, $password, $firstname, $lastname, $adresse, $mail, $photo, $role, $spec) returning user_id', {
            $username: req.body.username,
            $password: hash,
            $firstname: req.body.firstname,
            $lastname: req.body.lastname,
            $adresse: req.body.adresse,
            $mail: req.body.mail,
            $photo: req.body.photo,
            $role: req.body.role,
            $spec: req.body.spec
        }, (err) => {
            if(err) {
                return res.json(err).status(500);
            } else {
                return res.status(200);
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
            const id = row.user_id;
            const role = row.user_role;
            const token = jwt.sign({id: row.user_id}, cfg.jwtSecret, {expiresIn: '1H'});
            return res.json({token: token, id: id, role: role}).status(200);
        } else {
            res.json('Le mot de passe est incorrect').status(400);
        }
    })
})

module.exports = routes;