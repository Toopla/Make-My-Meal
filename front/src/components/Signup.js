import React, { useState } from 'react';
import { post_signup } from '../services/api';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [dataSignup, setDataSignup] = useState({name: '', password: ''});

    const handleName = (e) => {
        setDataSignup({...dataSignup, name: e.target.value});
    }

    const handlePassword = (e) => {
        setDataSignup({...dataSignup, password: e.target.value});
    }

    const handleSubmit = (e) => {
        let name = dataSignup.name;
        let password = dataSignup.password;
        if(name.length !== 0 && password.length !== 0) {
            post_signup(name, password).then((values) => {
                alert('Compte créé avec succès');
                navigate('/login');
            })
            setDataSignup({name: '', password: ''});
        } else {
            alert('Certains champs sont vides');
        }
        e.preventDefault();
    }

    return (
        <div style={{marginLeft: 50, marginTop: 20}}>
            <div style={{fontSize: 30}}>Inscription</div>
            <form onSubmit={handleSubmit}>
                <label style={{marginTop: 10}} htmlFor='name'>Identifiant :</label>
                <input style={{marginLeft: 10}} type='text' id='name' value={dataSignup.name} onChange={handleName}></input>
                <br/>
                <label style={{marginTop: 10}} htmlFor='password'>Mot de passe :</label>
                <input style={{marginLeft: 10}} type='password' id='password' value={dataSignup.password} onChange={handlePassword}></input>
                <br/>
                <Button style={{marginTop: 10}} type='submit'>Envoyer</Button>
            </form>
            <Button style={{marginTop: 20}} onClick={() => navigate('/login')}>J'ai déjà un compte</Button>
        </div>
    )
}

export default Signup;