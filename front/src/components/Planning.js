import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { get_planning, post_planning, put_planning } from "../services/api";
import {Button, Col, Row} from 'react-bootstrap';
import moment from 'moment';
import '../assets/styles/Calendar.css';

const Planning = (props) => {
    const [dataPostPlanning, setDataPostPlanning] = useState({jour: new Date(), petit_dejeuner: false, dejeuner: false, gouter: false, repas: false});
    const [dataGetPlanning, setDataGetPlanning] = useState([]);
    const token = props.cookies.BearerToken.token;
    const id_utilisateur = props.cookies.BearerToken.id_utilisateur;

    const planning = () => {
        get_planning(token, id_utilisateur).then((values) => {
            setDataGetPlanning(values);
        })
    }

    const handleJour = (e) => {
        let result = {jour: e, petit_dejeuner: false, dejeuner: false, gouter: false, repas: false};
        for(let i = 0; i < dataGetPlanning.length; i++) {
            if(moment(e).format('DD/MM/YYYY') === moment(dataGetPlanning[i].jour).format('DD/MM/YYYY')) {
                result = {id: dataGetPlanning[i].id, jour: e, petit_dejeuner: dataGetPlanning[i].petit_dejeuner, dejeuner: dataGetPlanning[i].dejeuner, gouter: dataGetPlanning[i].gouter, repas: dataGetPlanning[i].repas};
            }
        }
        setDataPostPlanning(result);
    }

    const handlePetitDejeuner = (e) => {
        setDataPostPlanning({...dataPostPlanning, petit_dejeuner: e.target.checked});
    }

    const handleDejeuner = (e) => {
        setDataPostPlanning({...dataPostPlanning, dejeuner: e.target.checked});
    }

    const handleGouter = (e) => {
        setDataPostPlanning({...dataPostPlanning, gouter: e.target.checked});
    }

    const handleRepas = (e) => {
        setDataPostPlanning({...dataPostPlanning, repas: e.target.checked});
    }

    const handleSubmit = (e) => {
        let jour = dataPostPlanning.jour;
        let petit_dejeuner = dataPostPlanning.petit_dejeuner;
        let dejeuner = dataPostPlanning.dejeuner;
        let gouter = dataPostPlanning.gouter;
        let repas = dataPostPlanning.repas;
        if(dataPostPlanning.id === undefined) {
            post_planning(token, id_utilisateur, jour, petit_dejeuner, dejeuner, gouter, repas).then((values) => {});
        } else {
            let id = dataPostPlanning.id;
            put_planning(token, id_utilisateur, id, petit_dejeuner, dejeuner, gouter, repas).then((values) => {});
        }
        planning();
        e.preventDefault();
    }

    useEffect(() => {
        planning();
    }, [])

    return (
        <div className={"planning-chef"} style={{marginLeft: 50, marginTop: 20}}>
            <h1>Planning</h1>
            <div className={"planning-content"}>
                <Calendar onChange={handleJour} value={dataPostPlanning.jour}/>
                <div className={"planning-content-form"}>
                    <span className='bold'>Date selectionnée: {(dataPostPlanning.jour).toLocaleDateString()}</span>
                    <form onSubmit={handleSubmit}>
                        <Row className={"row"}>
                            <Col>
                                <div className={"btn-form"}>
                                    <label htmlFor='petit-dejeuner'>Petit déjeuner (7h - 10h) :</label>
                                    <input type='checkbox' id='petit-dejeuner' value={dataPostPlanning.petit_dejeuner} onChange={handlePetitDejeuner} checked={dataPostPlanning.petit_dejeuner}/>
                                </div>
                                <div className={"btn-form"}>
                                    <label htmlFor='dejeuner'>Déjeuner (11h - 14h) :</label>
                                    <input type='checkbox' id='dejeuner' value={dataPostPlanning.dejeuner} onChange={handleDejeuner} checked={dataPostPlanning.dejeuner}/>
                                </div>
                            </Col>
                            <Col>
                                <div className={"btn-form"}>
                                    <label htmlFor='gouter'>Gouter (15h - 17h) :</label>
                                    <input type='checkbox' id='gouter' value={dataPostPlanning.gouter} onChange={handleGouter} checked={dataPostPlanning.gouter}/>
                                </div>
                                <div className={"btn-form"}>
                                    <label htmlFor='repas'>Repas (18h - 22h) :</label>
                                    <input type='checkbox' id='repas' value={dataPostPlanning.repas} onChange={handleRepas} checked={dataPostPlanning.repas}/>
                                </div>
                            </Col>
                        </Row>
                        <Button className={"button"} variant={"outline-light"} type='submit'>Valider</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Planning;