import React from "react";

const Home = (props) => {
    let name;
    if(props.cookies.BearerToken) {
        name = props.cookies.BearerToken.name;
    }

    return (
        <div style={{marginLeft: 50, marginTop: 20}}>
            <div style={{fontSize: 30, fontWeight: 'bold'}}>{name === undefined ? 'Bienvenue sur le projet Javascript' : 'Bienvenue ' + name}</div>
        </div>
    )
}

export default Home;