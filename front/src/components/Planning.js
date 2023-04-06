import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Button, Col, Row} from 'react-bootstrap';
import { delete_planning, get_planning_chef, post_planning, put_planning } from "../services/api";
import moment from 'moment';
import '../assets/styles/Calendar.css';

const Planning = (props) => {
    const [dataPostPlanning, setDataPostPlanning] = useState({jour: new Date(), petit_dejeuner: false, dejeuner: false, gouter: false, repas: false});
    const [dataGetPlanning, setDataGetPlanning] = useState([]);
    const token = props.cookies.BearerToken.token;
    const id_utilisateur = props.cookies.BearerToken.id_utilisateur;

    const planning = () => {
        get_planning_chef(token, id_utilisateur).then((values) => {
            setDataGetPlanning(values);
            let currentDate = new Date();
            let result = {jour: dataPostPlanning.jour, petit_dejeuner: dataPostPlanning.petit_dejeuner, dejeuner: dataPostPlanning.dejeuner, gouter: dataPostPlanning.gouter, repas: dataPostPlanning.repas};
            for(let i = 0; i < values.length; i++) {
                if(moment(currentDate).format('DD/MM/YYYY') === moment(values[i].jour).format('DD/MM/YYYY')) {
                    result = {id: values[i].id, jour: values[i].jour, petit_dejeuner: values[i].petit_dejeuner, dejeuner: values[i].dejeuner, gouter: values[i].gouter, repas: values[i].repas};
                }
            }
            setDataPostPlanning(result);
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

    const handleSubmit = async (e) => {
        let jour = dataPostPlanning.jour;
        let petit_dejeuner = dataPostPlanning.petit_dejeuner;
        let dejeuner = dataPostPlanning.dejeuner;
        let gouter = dataPostPlanning.gouter;
        let repas = dataPostPlanning.repas;
        if(dataPostPlanning.id === undefined) {
            post_planning(token, id_utilisateur, jour, petit_dejeuner, dejeuner, gouter, repas).then((values) => {});
        } else {
            let id = dataPostPlanning.id;
            if((petit_dejeuner === false || petit_dejeuner === 0) && (dejeuner === false || dejeuner === 0) && (gouter === false || gouter === 0) && (repas === false || repas === 0)) {
                delete_planning(token, id_utilisateur, id).then((values) => {});
                setDataPostPlanning({jour: dataPostPlanning.jour, petit_dejeuner: false, dejeuner: false, gouter: false, repas: false});
            } else {
                put_planning(token, id_utilisateur, id, petit_dejeuner, dejeuner, gouter, repas).then((values) => {});
            }
        }
        alert('Planning du jour enregistré.');
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