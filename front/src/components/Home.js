import React, {useEffect, useState} from "react";
import {get_chefs_liste, get_reservation_client} from "../services/api";
import moment from "moment";

const Home = (props) => {
    const [dataChefsListe,setDataChefsListe] = useState([]);
    const [searchCategory, setSearchCategory] = useState("");
    const [dataReservation, setDataReservation] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchCity, setSearchCity] = useState("");

    const chefsListe = () => {
        if (props.cookies.BearerToken){
            get_chefs_liste(props.cookies.BearerToken.token).then((values) => {
                setDataChefsListe(values);
            })
        }
    };

    const reservation = () => {
        if (props.cookies.BearerToken){
            get_reservation_client(props.cookies.BearerToken.token, props.cookies.BearerToken.id_utilisateur).then((values) => {
                console.log(values);
                setDataReservation(values);
            })
        }
    }

    useEffect(() => {
        chefsListe();
        reservation();
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
        if(props.cookies.BearerToken.role === 'client') {
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
                                    <tr key={key}>
                                        <td>
                                            <img src={prop.photo} alt={"Photo profil"}/>{prop.firstname} {prop.lastname}
                                        </td>
                                        <td>
                                            {prop.adresse}
                                        </td>
                                        <td>
                                            {prop.mail}
                                        </td>
                                        <td>
                                            Chef {prop.spec}
                                        </td>
                                    </tr>
    
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"accueil-client"}>
                    <h1>Liste des réservations</h1>
                    <div className={"content-accueil"}>
                        <table>
                            <thead>
                            <tr>
                                <th>Prénom - Nom</th>
                                <th>Ville</th>
                                <th>Jour</th>
                                <th>Créneau</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dataReservation.map((prop, key) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            <img src={prop.photo} alt={"Photo profil"}/>{prop.name_client}
                                        </td>
                                        <td>
                                            {prop.adresse}
                                        </td>
                                        <td>
                                            {moment(prop.jour).format('DD/MM/YYYY')}
                                        </td>
                                        <td>
                                            {prop.creneau === 'petit_dejeuner' ? 'Petit déjeuner (7h - 10h)' : prop.creneau === 'dejeuner' ? 'Déjeuner (11h - 14h)' : prop.creneau === 'gouter' ? 'Goûter (15h - 17h)' : 'Repas (18h - 22h)'}
                                        </td>
                                    </tr>
    
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
};

export default Home;
