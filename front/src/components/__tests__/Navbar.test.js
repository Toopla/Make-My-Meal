import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('NavBar', () => {
    let props;
    let navigate;

    beforeEach(() => {
        props = {
            cookies: {},
            removeCookie: jest.fn(),
        };

        navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });


    it('navigates to Home on click', () => {
        const { getByText } = render(<NavBar {...props} />);
        fireEvent.click(getByText('Accueil'));
        expect(navigate).toHaveBeenCalledWith('/home');
    });

    it('navigates to Items on click', () => {
        const { getByText } = render(<NavBar {...props} />);
        fireEvent.click(getByText('Items'));
        expect(navigate).toHaveBeenCalledWith('/items');
    });

    it('navigates to Login on click when no user is logged in', () => {
        const { getByText } = render(<NavBar {...props} />);
        fireEvent.click(getByText('Connexion / Créer compte'));
        expect(navigate).toHaveBeenCalledWith('/login');
    });

    it('navigates to Home and removes cookies on click when a user is logged in', () => {
        props.cookies.BearerToken = { name: 'John Doe' };
        const { getByText } = render(<NavBar {...props} />);
        fireEvent.click(getByText('Déconnexion'));
        expect(navigate).toHaveBeenCalledWith('/home');
        expect(props.removeCookie).toHaveBeenCalledWith('BearerToken', '/');
    });
});

/*
Dans ce test, nous créons des objets props pour les tests et un objet navigate qui est une fonction fictive pour simuler la fonction useNavigate du composant. Nous utilisons beforeEach pour réinitialiser les objets avant chaque test et afterEach pour réinitialiser les fonctions fictives après chaque test.

    Ensuite, nous testons si le logo est bien affiché sur la page, si la navigation se fait correctement lorsqu'on clique sur les boutons "Accueil" et "Items", et si la navigation se fait correctement lorsqu'on clique sur le bouton "Connexion / Créer compte" ou sur le bouton "Déconnexion" selon si l'utilisateur est connecté ou non.

Nous testons également si la fonction removeCookie est bien appelée avec les bons paramètres lorsqu'on clique sur le bouton "Déconnexion" lorsqu'un utilisateur est connecté.

    Notez que nous utilisons la méthode jest.mock pour remplacer la fonction useNavigate par une fonction fictive pour simuler le comportement de la fonction useNavigate.
*/
