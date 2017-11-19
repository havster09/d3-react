import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cbaChart from './cbaChartReducer';
import nodes from './nodesReducer';

export default combineReducers({
  router: routerReducer,
  cbaChart,
  nodes
});
