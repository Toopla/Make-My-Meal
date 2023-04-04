import React, { useEffect, useState } from "react";
import { get_users_chefs } from "../services/api";

const Home = (props) => {
    const [dataUsersChefs, setDataUsersChefs] = useState([]);
    const [searchCategory, setSearchCategory] = useState("");
    const [searchName, setSearchName] = useState("");

    const usersChefs = () => {
        if (props.cookies.BearerToken) {
            get_users_chefs(props.cookies.BearerToken.token).then((values) => {
                setDataUsersChefs(values);
                console.log(values);
            });
        }
    };

    useEffect(() => {
        usersChefs();
    }, []);

    let name;
    if (props.cookies.BearerToken) {
        name = props.cookies.BearerToken.name;
    }

    if (name === undefined) {
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
        const filteredChefs = dataUsersChefs.filter(
            (chef) =>
                chef.spec.toLowerCase().includes(searchCategory.toLowerCase()) &&
                `${chef.firstname} ${chef.lastname}`
                    .toLowerCase()
                    .includes(searchName.toLowerCase())
        );

        return (
            <div style={{ marginLeft: 50, marginTop: 20 }}>
                <div style={{ fontSize: 30 }}>Liste des chefs</div>
                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="category">Catégorie :</label>
                    <input
                        type="text"
                        id="category"
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="name">Nom :</label>
                    <input
                        type="text"
                        id="name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>
                <ul>
                    {filteredChefs.map((prop, key) => {
                        return (
                            <li key={key}>
                                {prop.firstname} {prop.lastname} {prop.adresse} {prop.mail}{" "}
                                {prop.role} {prop.spec}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
};

export default Home;
