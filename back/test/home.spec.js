const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require("express");
const app = express();
const router = require('../routes.js')

const expect = chai.expect;
chai.use(chaiHttp);

app.use('/', router);

describe('POST /login', () => {
    it('devrait retourner un token JWT valide si les informations d\'identification sont correctes', (done) => {

        chai.request(app)
            .post('/login',{username:'enzo_blois',password:'123'})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.token).to.be.a('string');
                expect(res.body.role).to.equal('chef'); // Remplacer par la valeur attendue du rôle de l'utilisateur

                done();
            });
    });

    it('devrait renvoyer une erreur 400 si le nom d\'utilisateur est incorrect', (done) => {
        const user = {
            username: 'wrongusername',
            password: 'testpassword'
        };

        chai.request(app)
            .post('/login',{username:'wrongusername',password:'123'})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.equal("Le compte n'existe pas");

                done();
            });
    });

    it('devrait renvoyer une erreur 400 si le mot de passe est incorrect', (done) => {
        const user = {
            username: 'enzo_blois',
            password: 'wrongpassword'
        };

        chai.request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.equal('Le mot de passe est incorrect');

                done();
            });
    });
});
