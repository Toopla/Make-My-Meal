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
                    token: values.token,
                    role: values.role
                }, '/');
                navigate('/')
            } else {
                alert(values);
            }
        })
        setDataLogin({username: '', password: ''});
        e.preventDefault();
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Connexion</h1>
                <label htmlFor='username'>Identifiant :</label><br/>
                <input type='text' id='username' value={dataLogin.username} onChange={handleName}/>
                <br/>
                <label htmlFor='password'>Mot de passe :</label><br/>
                <input type='password' id='password' value={dataLogin.password} onChange={handlePassword}/>
                <br/>
                <Button variant={"outline-light"} type='submit'>Connexion</Button>
                <Button className={"btn-signup"} style={{color: "white"}} variant={"..."} onClick={() => navigate('/signup')}>Je veux créer un compte</Button>
            </form>
        </div>
    )
}

export default Login;