import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import App from '../../App';

describe('<App />', () => {
    it('renders navbar component', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('NavBar')).to.have.lengthOf(1);
    });

    it('renders home component', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('Home')).to.have.lengthOf(1);
    });

    it('renders items component', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('Items')).to.have.lengthOf(1);
    });

    it('renders signup component', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('Signup')).to.have.lengthOf(1);
    });

    it('renders login component', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('Login')).to.have.lengthOf(1);
    });
});
