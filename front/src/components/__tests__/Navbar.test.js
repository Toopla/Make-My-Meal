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
