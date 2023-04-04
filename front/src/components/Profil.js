import React, {useEffect, useState} from "react";
import {get_user, put_user} from "../services/api";
import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Profil = (props) => {
    const [dataProfil, setDataProfil] = useState({username: '', password: '', firstname: '', lastname: '', adresse: '', mail: '', photo: '', role: '', spec: ''});
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    const user = () => {
        if (props.cookies.BearerToken){
            get_user(props.cookies.BearerToken.token, props.cookies.BearerToken.id_utilisateur).then((values) => {
                setDataProfil(values);
            })
        }
    }

    useEffect(() => {
        user();
    }, []);

    const handleName = (e) => {
        setDataProfil({...dataProfil, username: e.target.value});
    }
    
    const handlePassword = (e) => {
        setDataProfil({...dataProfil, password: e.target.value});
    }
    
    const handleFirstname = (e) => {
        setDataProfil({...dataProfil, firstname: e.target.value});
    }
    
    const handleLastname = (e) => {
        setDataProfil({...dataProfil, lastname: e.target.value});
    }

    const handleAdresse = (e) => {
        setDataProfil({...dataProfil, adresse: e.target.value});
    }

    const handleMail = (e) => {
        setDataProfil({...dataProfil, mail: e.target.value});
    }

    const handlePhoto = (e) => {
        setDataProfil({...dataProfil, photo: e.target.value});
    }

    const handleRole = (e) => {
        console.log(e.target.value);
        setDataProfil({...dataProfil, role: e.target.value});
    }

    const handleSpec = (e) => {
        setDataProfil({...dataProfil, spec: e.target.value});
    }

    const handleSubmit = (e) => {
        let username = dataProfil.username;
        let password = dataProfil.password;
        let firstname = dataProfil.firstname;
        let lastname = dataProfil.lastname;
        let adresse = dataProfil.adresse;
        let mail = dataProfil.mail;
        let photo = dataProfil.photo;
        let role = dataProfil.role;
        let spec = dataProfil.spec;
        if(username.length !== 0 && password.length !== 0 && firstname.length !== 0 && lastname.length !== 0 && adresse.length !== 0 && mail.length !== 0 && role.length !== 0) {
            put_user(username, password, firstname, lastname, adresse, mail, photo, role, spec).then((values) => {});
            window.location.reload(true);
        } else {
            alert('Certains champs sont vides');
        }
        e.preventDefault();
    }

        return (
            <div className={"login-container"}>
                <form onSubmit={handleSubmit}>
                    {disabled === true &&
                        <>
                            <Row>
                                <Col>
                                    <label htmlFor='username'>Identifiant :</label>
                                    <input type='text' id='username' value={dataProfil.username} disabled  style={{cursor: "not-allowed"}}/>
                                </Col>
                                <Col>
                                    <label htmlFor='password'>Mot de passe :</label>
                                    <input type='password' id='password' value={dataProfil.password} disabled   style={{cursor: "not-allowed"}}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor='firstname'>Prénom :</label>
                                    <input type='text' id='firstname' value={dataProfil.firstname} disabled   style={{cursor: "not-allowed"}}/>
                                </Col>
                                <Col>
                                    <label  htmlFor='lastname'>Nom :</label>
                                    <input  type='text' id='lastname' value={dataProfil.lastname} disabled   style={{cursor: "not-allowed"}}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label  htmlFor='adresse'>Ville :</label>
                                    <input  type='text' id='adresse' value={dataProfil.adresse} disabled  style={{cursor: "not-allowed"}}/>
                                </Col>
                                <Col>
                                    <label  htmlFor='mail'>Email :</label>
                                    <input  type='text' id='mail' value={dataProfil.mail} disabled  style={{cursor: "not-allowed"}}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label  htmlFor='photo'>Photo :</label>
                                    <input type='text' id='photo' value={dataProfil.photo} disabled style={{cursor: "not-allowed"}}/>
                                </Col>
                                <Col>
                                    <label htmlFor='role'>Rôle :</label><br/>
                                        <select id='role' value={dataProfil.role} disabled  style={{cursor: "not-allowed"}}>
                                        <option value='client'>Client</option>
                                        <option value='chef'>Chef</option>
                                    </select>
                                </Col>
                            </Row>
                            {dataProfil.role === 'chef' &&
                                <>
                                <label htmlFor='spec'>Spécialité culinaire :</label>
                                <input type='text' id='spec' value={dataProfil.spec}  disabled style={{cursor: "not-allowed"}}/>
                                <br/>
                                </>
                            }
                            <Button variant="outline-light" onClick={() => {setDisabled(false)}}>Modifier</Button>
                        </>
                    }
                    {disabled === false &&
                        <>
                            <Row>
                                <Col>
                                    <label htmlFor='username'>Identifiant :</label>
                                    <input type='text' id='username' value={dataProfil.username} onChange={handleName} required/>
                                </Col>
                                <Col>
                                    <label htmlFor='password'>Mot de passe :</label>
                                    <input type='password' id='password' value={dataProfil.password} onChange={handlePassword} required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor='firstname'>Prénom :</label>
                                    <input type='text' id='firstname' value={dataProfil.firstname} onChange={handleFirstname} required/>
                                </Col>
                                <Col>
                                    <label  htmlFor='lastname'>Nom :</label>
                                    <input  type='text' id='lastname' value={dataProfil.lastname} onChange={handleLastname} required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label  htmlFor='adresse'>Ville :</label>
                                    <input  type='text' id='adresse' value={dataProfil.adresse} onChange={handleAdresse} required/>
                                </Col>
                                <Col>
                                    <label  htmlFor='mail'>Email :</label>
                                    <input  type='text' id='mail' value={dataProfil.mail} onChange={handleMail} required/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label  htmlFor='photo'>Photo :</label>
                                    <input type='text' id='photo' value={dataProfil.photo} onChange={handlePhoto}/>
                                </Col>
                                <Col>
                                    <label htmlFor='role'>Rôle :</label><br/>
                                    <select id='role' value={dataProfil.role} onChange={handleRole} required>
                                        <option value='client'>Client</option>
                                        <option value='chef'>Chef</option>
                                    </select>
                                </Col>
                            </Row>
                            {dataProfil.role === 'chef' &&
                                <>
                                    <label htmlFor='spec'>Spécialité culinaire :</label>
                                    <input type='text' id='spec' value={dataProfil.spec} onChange={handleSpec}/>
                                    <br/>
                                </>
                            }
                            <Button variant={"outline-light"} type='submit'>Enregister</Button>
                        </>
                    }
                </form>
            </div>
        )
}

export default Profil;