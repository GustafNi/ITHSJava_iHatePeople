import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './Header';

configure({ adapter: new Adapter() });

describe('Header Components', () => {

it('Should render without errors', () => {
    const component = shallow(<Header />)
    const headerElement = component.find(`[data-test='headerContentInnerGrid']`)
expect(headerElement.length).not.toBeGreaterThan(10);
    })


})
