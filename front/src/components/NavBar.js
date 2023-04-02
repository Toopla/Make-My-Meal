import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Button } from 'react-bootstrap';

const NavBar = (props) => {
    const navigate = useNavigate();

    let name;
    if(props.cookies.BearerToken) {
        name = props.cookies.BearerToken.name;
    }

    return (
        <Navbar bg='light' expand='lg'>
            <Container>
                <Button variant="..." onClick={() => navigate('/home')}>Accueil</Button>
                <Button variant="..." onClick={() => navigate('/items')}>Items</Button>
                {name === undefined ?
                    <Button variant="outline-success" onClick={() => navigate('/login')}>Connexion / Créer compte</Button> : <Button variant="outline-danger" onClick={() => { props.removeCookie('BearerToken', '/'); navigate('/home') }}>Déconnexion</Button>
                }
            </Container>
        </Navbar>
    )
}

export default NavBar;