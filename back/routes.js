const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./data/database');
const auth = require('./auth/auth')();
const cfg = require('./auth/config');
const saltRounds = 10;

routes.use(auth.initialize());

routes.get('/users/:id', auth.authenticate(), (req, res) => {
    db.get('SELECT user_id AS id, user_username AS username, user_password AS password, user_firstname AS firstname, user_lastname AS lastname, user_adresse AS adresse, user_mail AS mail, user_photo AS photo, user_role AS role, user_spec AS spec FROM users WHERE user_id=$id', {$id: req.params.id}, (err, row) => {
        if (err){
            return res.status(500).json(err);
        }else {
            return res.status(200).json(row);
        }
    })
})

routes.get('/chefs/liste', auth.authenticate(), (req, res) => {
    db.all('SELECT user_id AS id, user_firstname AS firstname, user_lastname AS lastname, user_adresse AS adresse, user_mail AS mail, user_photo AS photo, user_role AS role, user_spec AS spec FROM users WHERE user_role="chef"', (err, rows) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json(rows);
        }
    })
})

routes.get('/reservation/:id', auth.authenticate(), (req, res) => {
    db.all('SELECT reserv_id AS id, reserv_id_client AS id_client, reserv_id_chef AS id_chef, reserv_name_chef AS name_chef, reserv_name_client AS name_client, reserv_adresse AS adresse, reserv_jour AS jour, reserv_creneau AS creneau, reserv_photo AS photo FROM reservation WHERE reserv_id_client=$id_client OR reserv_id_chef=$id_chef ORDER BY jour ASC', {$id_client: req.params.id, $id_chef: req.params.id}, (err, rows) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json(rows);
        }
    })
})

routes.post('/reservation', auth.authenticate(), (req, res) => {
    db.run('INSERT INTO reservation(reserv_id_client, reserv_id_chef, reserv_name_chef, reserv_name_client, reserv_adresse, reserv_jour, reserv_creneau, reserv_photo) VALUES ($id_client, $id_chef, $name_chef, $name_client, $adresse, datetime($jour, "localtime"), $creneau, $photo)', {
        $id_client: req.body.id_client,
        $id_chef: req.body.id_chef,
        $name_chef: req.body.name_chef,
        $name_client: req.body.name_client,
        $adresse: req.body.adresse,
        $jour: req.body.jour,
        $creneau: req.body.creneau,
        $photo: req.body.photo
    }, (err) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            return res.status(200);
        }
    })
})

routes.delete('/reservation/:id_client/:id', auth.authenticate(), (req, res) => {
    db.run('DELETE FROM reservation WHERE reserv_id_client=$id_client AND reserv_id=$id', {
        $id_client: req.params.id_client,
        $id: req.params.id
    }, (err) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            return res.status(200);
        }
    })
})

routes.get('/planning/:id', auth.authenticate(), (req, res) => {
    db.all('SELECT plan_id AS id, plan_id_chef AS id_chef, plan_jour AS jour, plan_petit_dejeuner AS petit_dejeuner, plan_dejeuner AS dejeuner, plan_gouter AS gouter, plan_repas AS repas FROM planning WHERE plan_id_chef=$id_chef ORDER BY plan_jour ASC', {$id_chef: req.params.id}, (err, rows) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json(rows);
        }
    })
})

routes.post('/planning', auth.authenticate(), (req, res) => {
    db.run('INSERT INTO planning(plan_id_chef, plan_jour, plan_petit_dejeuner, plan_dejeuner, plan_gouter, plan_repas) VALUES ($id_chef, datetime($jour, "localtime"), $petit_dejeuner, $dejeuner, $gouter, $repas)', {
        $id_chef: req.body.id_chef,
        $jour: req.body.jour,
        $petit_dejeuner: req.body.petit_dejeuner,
        $dejeuner: req.body.dejeuner,
        $gouter: req.body.gouter,
        $repas: req.body.repas
    }, (err) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            return res.status(200);
        }
    })
})

routes.put('/planning/:id_chef/:id', auth.authenticate(), (req, res) => {
    db.run('UPDATE planning SET plan_petit_dejeuner = $petit_dejeuner, plan_dejeuner = $dejeuner, plan_gouter = $gouter, plan_repas = $repas WHERE plan_id_chef=$id_chef AND plan_id=$id', {
        $petit_dejeuner: req.body.petit_dejeuner,
        $dejeuner: req.body.dejeuner,
        $gouter: req.body.gouter,
        $repas: req.body.repas,
        $id_chef: req.params.id_chef,
        $id: req.params.id
    }, (err) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            return res.status(200);
        }
    })
})

routes.delete('/planning/:id_chef/:id', auth.authenticate(), (req, res) => {
    db.run('DELETE FROM planning WHERE plan_id_chef=$id_chef AND plan_id=$id', {
        $id_chef: req.params.id_chef,
        $id: req.params.id
    }, (err) => {
        if(err) {
            return res.status(500).json(err);
        } else {
            return res.status(200);
        }
    })
})

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
                return res.status(500).json(err);
            } else {
                return res.status(200).json({id: row.user_id});
            }
        });
    })
})

routes.post('/login', (req, res) => {
    db.get('SELECT * FROM users WHERE user_username = $username', {
        $username: req.body.username
    }, async (err, row) => {
        if(err) {
            return res.status(500).json(err);
        }

        if(!row) {
            return res.status(400).json("Le compte n'existe pas");
        }

        const match = await bcrypt.compare(req.body.password, row.user_password);
        if(match) {
            const id = row.user_id;
            const role = row.user_role;
            const token = jwt.sign({id: row.user_id}, cfg.jwtSecret, {expiresIn: '1H'});
            return res.status(200).json({token: token, id: id, role: role});
        } else {
            res.status(400).json('Le mot de passe est incorrect');
        }
    })
})

module.exports = routes;