import React, {useEffect, useState} from "react";
import {get_users_chefs} from "../services/api";

const Home = (props) => {
    const [dataUsersChefs,setDataUsersChefs] = useState([]);

    const usersChefs = () => {
        if (props.cookies.BearerToken){
            get_users_chefs(props.cookies.BearerToken.token).then((values) => {
                setDataUsersChefs(values);
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
            <div>
                <div className={"logo-content"}>
                    <img className={"logo"} src="images/Make_My_Meal.png" alt="logo"/>
                </div>

                <div className={"description-content"}>
                    <p className={"description"}>
                        Vous pouvez réserver un chef cuisinier pour qu’il vienne cuisiner à domicile en fonction de l’heure du repas (petit déjeuner, déjeuner, goûter, repas)
                        et choisir le chef qu’il souhaite réserver parmi une liste de chefs.
                        Quant à lui, le chef pourra accepter ou refuser votre réservation.
                    </p>
                </div>
            </div>
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