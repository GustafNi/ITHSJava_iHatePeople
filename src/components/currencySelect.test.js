import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import currencySelect from './currencySelect'

configure ({ adapter: new Adapter()});

describe('Header Components', () => {

    it('Should render without errors', () => {
        const component = shallow( <currencySelect />)
        const currencyElement = component.find(`[data-test='currencySelectContainer']`)
        expect(currencyElement.length).not.toBeGreaterThan(10);
    })
})