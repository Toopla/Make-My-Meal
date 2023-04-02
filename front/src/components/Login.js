import React, { useState } from 'react';
import { post_login } from '../services/api';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
    const [dataLogin, setDataLogin] = useState({name: '', password: ''});

    const handleName = (e) => {
        setDataLogin({...dataLogin, name: e.target.value});
    }

    const handlePassword = (e) => {
        setDataLogin({...dataLogin, password: e.target.value});
    }

    const handleSubmit = (e) => {
        let name = dataLogin.name;
        let password = dataLogin.password;
        post_login(name, password).then((values) => {
            if(values.token !== undefined) {
                props.setCookie('BearerToken', {
                    name: name,
                    token: values.token
                }, '/');
                navigate('/home')
            } else {
                alert(values);
            }
        })
        setDataLogin({name: '', password: ''});
        e.preventDefault();
    }

    return (
        <div style={{marginLeft: 50, marginTop: 20}}>
            <div style={{fontSize: 30}}>Connexion</div>
            <form onSubmit={handleSubmit}>
                <label style={{marginTop: 10}} htmlFor='name'>Identifiant :</label>
                <input style={{marginLeft: 10}} type='text' id='name' value={dataLogin.name} onChange={handleName}></input>
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