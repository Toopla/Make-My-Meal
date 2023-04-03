import React, { useState } from 'react';
import { post_signup } from '../services/api';
import {Button, Col, Row} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [dataSignup, setDataSignup] = useState({username: '', password: '', firstname: '', lastname: '', adresse: '', mail: '', photo: '', role: '', spec: ''});

    const handleName = (e) => {
        setDataSignup({...dataSignup, username: e.target.value});
    }

    const handlePassword = (e) => {
        setDataSignup({...dataSignup, password: e.target.value});
    }

    const handleFirstname = (e) => {
        setDataSignup({...dataSignup, firstname: e.target.value});
    }

    const handleLastname = (e) => {
        setDataSignup({...dataSignup, lastname: e.target.value});
    }

    const handleAdresse = (e) => {
        setDataSignup({...dataSignup, adresse: e.target.value});
    }

    const handleMail = (e) => {
        setDataSignup({...dataSignup, mail: e.target.value});
    }

    const handlePhoto = (e) => {
        setDataSignup({...dataSignup, photo: e.target.value});
    }

    const handleRole = (e) => {
        console.log(e.target.value);
        setDataSignup({...dataSignup, role: e.target.value});
    }

    const handleSpec = (e) => {
        setDataSignup({...dataSignup, spec: e.target.value});
    }

    const handleSubmit = (e) => {
        let username = dataSignup.username;
        let password = dataSignup.password;
        let firstname = dataSignup.firstname;
        let lastname = dataSignup.lastname;
        let adresse = dataSignup.adresse;
        let mail = dataSignup.mail;
        let photo = dataSignup.photo;
        let role = dataSignup.role;
        let spec = dataSignup.spec;
        if(username.length !== 0 && password.length !== 0 && firstname.length !== 0 && lastname.length !== 0 && adresse.length !== 0 && mail.length !== 0 && role.length !== 0) {
            post_signup(username, password, firstname, lastname, adresse, mail, photo, role, spec).then((values) => {
                navigate('/login');
            })
            setDataSignup({username: '', password: '', firstname: '', lastname: '', adresse: '', mail: '', photo: '', role: '', spec: ''});
        } else {
            alert('Certains champs sont vides');
        }
        e.preventDefault();
    }

    return (
        <div className={"login-container"}>
            <form onSubmit={handleSubmit}>
                <h1>Inscription</h1>
                <Row>
                    <Col>
                        <label htmlFor='username'>Identifiant :</label>
                        <input type='text' id='username' value={dataSignup.username} onChange={handleName} required/>
                    </Col>
                    <Col>
                        <label htmlFor='password'>Mot de passe :</label>
                        <input type='password' id='password' value={dataSignup.password} onChange={handlePassword} required/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label htmlFor='firstname'>Prénom :</label>
                        <input type='text' id='firstname' value={dataSignup.firstname} onChange={handleFirstname} required/>
                    </Col>
                    <Col>
                        <label  htmlFor='lastname'>Nom :</label>
                        <input  type='text' id='lastname' value={dataSignup.lastname} onChange={handleLastname} required/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label  htmlFor='adresse'>Ville :</label>
                        <input  type='text' id='adresse' value={dataSignup.adresse} onChange={handleAdresse} required/>
                    </Col>
                    <Col>
                        <label  htmlFor='mail'>Email :</label>
                        <input  type='text' id='mail' value={dataSignup.mail} onChange={handleMail} required/>
                    </Col>
                </Row>
                <label  htmlFor='photo'>Photo :</label>
                <input type='text' id='photo' value={dataSignup.photo} onChange={handlePhoto}/>
                <br/>
                <label htmlFor='role'>Rôle :</label><br/>
                <select id='role' value={dataSignup.role} onChange={handleRole} required>
                    <option value='client'>Client</option>
                    <option value='chef'>Chef</option>
                </select>
                <br/>
                {dataSignup.role === 'chef' &&
                    <>
                        <label htmlFor='spec'>Spécialité culinaire :</label>
                        <input type='text' id='spec' value={dataSignup.spec} onChange={handleSpec}/>
                        <br/>
                    </>
                }
                <Button variant={"outline-light"} type='submit'>Envoyer</Button>
                <Button className={"btn-signup"} style={{color: "white"}} variant={"..."} onClick={() => navigate('/login')}>J'ai déjà un compte</Button>
            </form>
        </div>
    )
}

export default Signup;