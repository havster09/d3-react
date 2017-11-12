import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cbaChart from './cbaChartReducer';

export default combineReducers({
  router: routerReducer,
  cbaChart
});
