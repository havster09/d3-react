import React from 'react';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import CbaChart from '../CbaChart';

import { JSDOM } from 'jsdom';
const { window } = new JSDOM();
global.window = window;

const mockProps = {
  data: {
    pn: {
      'Parking offence': 91891,
      'Fare Evasion/False Information': 69705,
      'Compliance/Safety/Antisocial/Offensive behaviour': 32189,
      'Vehicle offence': 781,
      'Feet on seat': 617,
      'Smoking Offence': 450,
      'Littering Offence': 167,
      'Animal Offence': 123
    },
    face: {
      'Parking offence': 9297100,
      'Fare Evasion/False Information': 13038900,
      'Compliance/Safety/Antisocial/Offensive behaviour': 7131850,
      'Vehicle offence': 212132,
      'Feet on seat': 61700,
      'Smoking Offence': 100250,
      'Littering Offence': 29150,
      'Animal Offence': 25171,
      formatPrice: true
    }
  },
  match: {
    path: '/infringements/:chartYear?',
    url: '/infringements/2014',
    isExact: true,
    params: {
      chartYear: '2014'
    }
  },
  chartYear: '2014',
  chartType: 'face',
  onUpdateChartType: jest.fn(),
  onUpdateChartYear: jest.fn(),
  synchChart: jest.fn()
};

const component = shallow(<CbaChart {...mockProps} />);

describe(CbaChart, () => {
  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
