import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { updateChartYear, updateChartType, synchChart } from '../../reducers/cbaChartReducer';
import CbaChart from '../../components/CbaChart';

const stylePaper = {
  padding: 20
};

const Home = props =>
  <div>
    <Paper zDepth={1} style={stylePaper}>
      <CbaChart
        data={props.cbaChart.data}
        match={props.match}
        chartYear={props.cbaChart.chartYear}
        chartType={props.cbaChart.chartType}
        onUpdateChartYear={props.updateChartYear}
        onUpdateChartType={props.updateChartType}
        synchChart={props.synchChart}
      />
      <pre>
        {JSON.stringify(props, null, 4)}
      </pre>
    </Paper>
  </div>;

const mapStateToProps = state => {
  return {
    ...state,
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateChartYear,
      updateChartType,
      synchChart
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
