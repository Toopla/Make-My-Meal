import React, {useEffect, useState} from "react";
import {get_chefs_liste} from "../services/api";

const Home = (props) => {
    const [dataChefsListe,setDataChefsListe] = useState([]);
    const [searchCategory, setSearchCategory] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchCity, setSearchCity] = useState("");

    const chefsListe = () => {
        if (props.cookies.BearerToken){
            get_chefs_liste(props.cookies.BearerToken.token).then((values) => {
                setDataChefsListe(values);
            })
        }
    };

    useEffect(() => {
        chefsListe();
    }, []);

    let token_verify;
    if(props.cookies.BearerToken) {
        token_verify = props.cookies.BearerToken.token;
    }

    if (token_verify === undefined){
        return (
            <div>
                <div className={"logo-content"}>
                    <img className={"logo"} src="images/Make_My_Meal.png" alt="logo" />
                </div>

                <div className={"description-content"}>
                    <p className={"description"}>
                        Vous pouvez réserver un chef cuisinier pour qu’il vienne cuisiner à domicile en fonction de l’heure du repas (petit déjeuner, déjeuner, goûter, repas)
                        et choisir le chef qu’il souhaite réserver parmi une liste de chefs.
                        Quant à lui, le chef pourra accepter ou refuser votre réservation.
                    </p>
                </div>
            </div>
        );
    } else {
        const filteredChefs = dataChefsListe.filter(
            (chef) =>
                chef.spec.toLowerCase().includes(searchCategory.toLowerCase()) &&
                `${chef.firstname} ${chef.lastname}`
                    .toLowerCase()
                    .includes(searchName.toLowerCase()) &&
                    chef.adresse.toLowerCase().includes(searchCity.toLowerCase())
        )


        return (
            <div className={"accueil-client"}>
                <h1>Liste des chefs</h1>
                <div className={"content-accueil"}>
                    <div className={"search-bar"}>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="name">Nom :</label><br/>
                            <input
                                type="text"
                                id="name"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="city">Ville :</label><br/>
                            <input
                                type="text"
                                id="city"
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="category">Catégorie :</label><br/>
                            <input
                                type="text"
                                id="category"
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                            />
                        </div>
                    </div>

                    <table>
                        <thead>
                        <tr>
                            <th>Prénom - Nom</th>
                            <th>Ville</th>
                            <th>E-mail</th>
                            <th>Spécialité</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredChefs.map((prop, key) => {
                            return (
                                <tr>
                                    <td key={key}>
                                        <img src={prop.photo} alt={"Photo profil"}/>{prop.firstname} {prop.lastname}
                                    </td>
                                    <td key={key}>
                                        {prop.adresse}
                                    </td>
                                    <td>
                                        {prop.mail}
                                    </td>
                                    <td>
                                        {prop.role} {prop.spec}
                                    </td>
                                </tr>

                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default Home;
