import { push } from 'react-router-redux';
import { mockData } from '../mockData';

export const CHART_UPDATE_YEAR_REQUESTED = 'cbaChart/UPDATE_CHART_YEAR_PENDING';
export const CHART_UPDATE_YEAR_FULFILLED =
  'cbaChart/UPDATE_CHART_YEAR_FULFILLED';
export const CHART_UPDATE_TYPE = 'cbaChart/CHART_UPDATE_TYPE';
export const SYNCH_CHART = 'cbaChart/SYNCH_CHART';

const initialState = {
  data: mockData['2013'],
  chartYear: '2013',
  chartType: 'pn'
};

export const updateChartYear = payload => {
  return dispatch => {
    dispatch({
      type: CHART_UPDATE_YEAR_REQUESTED
    });

    return setTimeout(() => {
      dispatch(push(`/infringements/${payload}`));

      dispatch({
        type: CHART_UPDATE_YEAR_FULFILLED,
        payload
      });
    }, 500);
  };
};

export const updateChartType = payload => {
  return dispatch => {
    dispatch({
      type: CHART_UPDATE_TYPE,
      payload
    });
  };
};

export const synchChart = payload => {
  return dispatch => {
    dispatch({
      type: SYNCH_CHART,
      payload
    });
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHART_UPDATE_YEAR_FULFILLED:
      return {
        ...state,
        chartYear: action.payload,
        data: mockData[action.payload]
      };
    case CHART_UPDATE_TYPE:
      return {
        ...state,
        chartType: action.payload
      };
    case SYNCH_CHART:
      return {
        ...state,
        chartYear: action.payload,
        data: mockData[action.payload] || initialState.data
      };
    default:
      return state;
  }
};
