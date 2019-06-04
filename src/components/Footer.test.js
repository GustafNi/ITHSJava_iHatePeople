import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from './Footer'

configure ({ adapter: new Adapter()});

describe('Header Components', () => {

    it('Should render without errors', () => {
        const component = shallow( <Footer />)
        const footerElement = component.find(`[data-test='footerContainer']`)
        expect(footerElement.length).not.toBeGreaterThan(10);
    })
})