import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Button} from 'react-bootstrap';
import { delete_reservation, get_chefs_liste, get_planning_chef, get_reservation_client, get_user, post_reservation } from '../services/api';
import moment from 'moment';

const Reservation = (props) => {
    const [dataGetReservation, setDataGetReservation] = useState([]);
    const [dataGetPlanning, setDataGetPlanning] = useState([]);
    const [dataGetUser, setDataGetUser] = useState([]);
    const [dataGetChefs, setGetChefs] = useState([]);
    const [selectedChef, setSelectedChef] = useState(0);
    const token = props.cookies.BearerToken.token;
    const id_utilisateur = props.cookies.BearerToken.id_utilisateur;

    const user = () => {
        get_user(token, id_utilisateur).then((values) => {
            setDataGetUser(values);
        });
    }

    const chefs = () => {
        get_chefs_liste(token).then((values) => {
            setGetChefs(values);
            setSelectedChef({id: values[0].id, name: values[0].firstname + ' ' + values[0].lastname});
            planning(values[0].id);
        })
    }

    const planning = (id_selectedChef) => {
        get_planning_chef(token, id_selectedChef).then((values) => {
            setDataGetPlanning(values);
        })
    }

    const reservation = () => {
        get_reservation_client(token, id_utilisateur).then((values) => {
            setDataGetReservation(values);
        })
    }

    const handleChef = (e) => {
        for(let i = 0; i < dataGetChefs.length; i++) {
            if(dataGetChefs[i].id == e.target.value) {
                setSelectedChef({id: dataGetChefs[i].id, name: dataGetChefs[i].firstname + ' ' + dataGetChefs[i].lastname});
            }
        }
        planning(e.target.value);
    }

    const reservationPetitDejeuner = (jour, creneau) => {
        post_reservation(token, id_utilisateur, selectedChef.id, selectedChef.name, dataGetUser.firstname + ' ' + dataGetUser.lastname, dataGetUser.adresse, jour, creneau, dataGetUser.photo).then((values) => {});
        alert('Réservation enregistrée.');
        reservation();
    }

    const reservationDejeuner = (jour, creneau) => {
        post_reservation(token, id_utilisateur, selectedChef.id, selectedChef.name, dataGetUser.firstname + ' ' + dataGetUser.lastname, dataGetUser.adresse, jour, creneau, dataGetUser.photo).then((values) => {});
        alert('Réservation enregistrée.');
        reservation();
    }

    const reservationGouter = (jour, creneau) => {
        post_reservation(token, id_utilisateur, selectedChef.id, selectedChef.name, dataGetUser.firstname + ' ' + dataGetUser.lastname, dataGetUser.adresse, jour, creneau, dataGetUser.photo).then((values) => {});
        alert('Réservation enregistrée.');
        reservation();
    }

    const reservationRepas = (jour, creneau) => {
        post_reservation(token, id_utilisateur, selectedChef.id, selectedChef.name, dataGetUser.firstname + ' ' + dataGetUser.lastname, dataGetUser.adresse, jour, creneau, dataGetUser.photo).then((values) => {});
        alert('Réservation enregistrée.');
        reservation();
    }

    const deleteReservation = (id) => {
        delete_reservation(token, id_utilisateur, id).then((values) => {});
        alert('Réservation supprimée.');
        reservation();
    }

    useEffect(() => {
        user();
        chefs();
        reservation();
    }, [])

    return (
        <div style={{marginLeft: 50, marginTop: 20}}>
            <label htmlFor='chefs'>Liste des chefs :</label><br/>
            <select id='chefs' value={dataGetChefs.id} onChange={handleChef} required>
                {dataGetChefs.map((prop, key) => {
                    return (
                        <option key={key} value={prop.id}>{prop.firstname + ' ' + prop.lastname}</option>
                    )
                })}
            </select>
            <div className='planning'>
                {dataGetPlanning.map((prop, key) => {
                    return (
                        <div key={key} className='planningForOneDay'>
                            {prop.petit_dejeuner === 1 &&
                                <div className='planningForPetitDejeuner'>
                                    Date: {moment(prop.jour).format('DD/MM/YYYY')} 
                                    Créneau: Petit Déjeuner (7h - 10h) 
                                    <Button variant={"outline-light"} onClick={() => reservationPetitDejeuner(prop.jour, 'petit_dejeuner')}>Réserver</Button>
                                </div>
                            }
                            {prop.dejeuner === 1 &&
                                <div className='planningForDejeuner'>
                                    Date: {moment(prop.jour).format('DD/MM/YYYY')}
                                    Créneau: Déjeuner (11h - 14h) 
                                    <Button variant={"outline-light"} onClick={() => reservationDejeuner(prop.jour, 'dejeuner')}>Réserver</Button>
                                </div>
                            }
                            {prop.gouter === 1 &&
                                <div className='planningForGouter'>
                                    Date: {moment(prop.jour).format('DD/MM/YYYY')} 
                                    Créneau: Goûter (15h - 17h) 
                                    <Button variant={"outline-light"} onClick={() => reservationGouter(prop.jour, 'gouter')}>Réserver</Button>
                                </div>
                            }
                            {prop.repas === 1 &&
                                <div className='planningForRepas'>
                                    Date: {moment(prop.jour).format('DD/MM/YYYY')} 
                                    Créneau: Repas (18h - 22h) 
                                    <Button variant={"outline-light"} onClick={() => reservationRepas(prop.jour, 'repas')}>Réserver</Button>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
            <label htmlFor='chefs'>Vos réservations :</label><br/>
            <div className='reservation'>
                {dataGetReservation.map((prop, key) => {
                    return (
                        <div key={key} className='reservationForCreneau'>
                            Chef: {prop.name_chef}
                            Date: {moment(prop.jour).format('DD/MM/YYYY')}
                            Créneau: {prop.creneau === 'petit_dejeuner' ? 'Petit déjeuner (7h - 10h)' : prop.creneau === 'dejeuner' ? 'Déjeuner (11h - 14h)' : prop.creneau === 'gouter' ? 'Goûter (15h - 17h)' : 'Repas (18h - 22h)'}
                            <Button variant={"outline-light"} onClick={() => deleteReservation(prop.id)}>Supprimer</Button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Reservation;