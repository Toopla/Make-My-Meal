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
        <Navbar className={"bg-navbar"} expand='lg'>
            <img style={{width: 100}} src="images/Make_My_Meal.png" alt="logo"/>
            <Container>
                <Button style={{color: "white"}} className="item-list" variant="..." onClick={() => navigate('/home')}>Accueil</Button>
                <Button style={{color: "white"}} className="item-list" variant="..." onClick={() => navigate('/items')}>Items</Button>
                {name === undefined ?
                    <Button variant="outline-light" onClick={() => navigate('/login')} >Connexion / Créer compte</Button> : <Button variant="outline-light" onClick={() => { props.removeCookie('BearerToken', '/'); navigate('/home') }}>Déconnexion</Button>
                }
            </Container>
        </Navbar>
    )
}

export default NavBar;