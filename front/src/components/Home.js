import React, {useEffect, useState} from "react";
import {get_users_chefs} from "../services/api";

const Home = (props) => {
    const [dataUsersChefs,setDataUsersChefs] = useState([]);

    const usersChefs = () => {
        if (props.cookies.BearerToken){
            get_users_chefs(props.cookies.BearerToken.token).then((values) => {
                setDataUsersChefs(values);
                console.log(values);
            })
        }
    }

    useEffect(() => {
        usersChefs();
    }, []);

    let name;
    if(props.cookies.BearerToken) {
        name = props.cookies.BearerToken.name;
    }

    if (name === undefined){
        return (
            <h1 className={'titre-h1 autre-classe'}>no log</h1>
        )
    }else {
        return (
            <div style={{marginLeft: 50, marginTop: 20}}>
                <div style={{fontSize: 30}}>Liste des chefs</div>
                <ul>
                    {dataUsersChefs.map((prop, key) =>{
                        return(
                            <li key={key}>{prop.firstname} {prop.lastname} {prop.adresse} {prop.mail} {prop.role} {prop.spec}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Home;