import React, { useState } from 'react';
import { post_login } from '../services/api';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
    const [dataLogin, setDataLogin] = useState({username: '', password: ''});

    const handleName = (e) => {
        setDataLogin({...dataLogin, username: e.target.value});
    }

    const handlePassword = (e) => {
        setDataLogin({...dataLogin, password: e.target.value});
    }

    const handleSubmit = (e) => {
        let username = dataLogin.username;
        let password = dataLogin.password;
        post_login(username, password).then((values) => {
            if(values.token !== undefined) {
                props.setCookie('BearerToken', {
                    name: username,
                    token: values.token
                }, '/');
                navigate('/home')
            } else {
                alert(values);
            }
        })
        setDataLogin({username: '', password: ''});
        e.preventDefault();
    }

    return (
        <div style={{marginLeft: 50, marginTop: 20}}>
            <div style={{fontSize: 30}}>Connexion</div>
            <form onSubmit={handleSubmit}>
                <label style={{marginTop: 10}} htmlFor='username'>Identifiant :</label>
                <input style={{marginLeft: 10}} type='text' id='username' value={dataLogin.username} onChange={handleName}></input>
                <br/>
                <label style={{marginTop: 10}} htmlFor='password'>Mot de passe :</label>
                <input style={{marginLeft: 10}} type='password' id='password' value={dataLogin.password} onChange={handlePassword}></input>
                <br/>
                <Button style={{marginTop: 10}} type='submit'>Envoyer</Button>
            </form>
            <Button style={{marginTop: 20}} onClick={() => navigate('/signup')}>Je veux créer un compte</Button>
        </div>
    )
}

export default Login;