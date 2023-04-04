import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Button } from 'react-bootstrap';

const NavBar = (props) => {
    const navigate = useNavigate();

    let token_verify;
    if(props.cookies.BearerToken) {
        token_verify = props.cookies.BearerToken.token;
    }

    return (
        <Navbar className={"bg-navbar"} expand='lg'>
            <img style={{width: 100}} src="images/Make_My_Meal.png" alt="logo"/>
            <Container>
                <Button style={{color: "white"}} className="item-list" variant="..." onClick={() => navigate('/')}>Accueil</Button>
                <Button style={{color: "white"}} className="item-list" variant="..." onClick={() => navigate('/reservation')}>Réservation</Button>
                {token_verify === undefined ? "" : <Button style={{color: "white"}} className="item-list" variant="..." onClick={() => navigate('/profil')}>Profil</Button>}
                {token_verify === undefined ?
                    <Button variant="outline-light" onClick={() => navigate('/login')} >Connexion / Créer compte</Button> : <Button variant="outline-light" onClick={() => { props.removeCookie('BearerToken', '/'); navigate('/') }}>Déconnexion</Button>
                }
            </Container>
        </Navbar>
    )
}

export default NavBar;